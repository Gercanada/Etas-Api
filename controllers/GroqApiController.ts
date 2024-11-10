import Groq from "groq-sdk";
import { Request, Response } from "express";
// import yf from 'yfinance';
// import { SystemMessage, HumanMessage, ToolMessage } from 'langchain';
// import { RunnableLambda } from "@langchain/core/runnables";
// import { awaitAllCallbacks } from "@langchain/core/callbacks/promises";
// import * as plotly from 'plotly';
// import * as pd from 'pandas-js';
// import { writeFileSync } from 'fs';
// import YahooFinance from 'yfinance-api-package';
const { YahooFinance } = require('yfinance-api-package');
import AssistantHistory from '../models/AssistantHistoryModel';

/* interface StockInfo {
    [key: string]: any;
} */
// Memory to store conversation history
interface Memory {
    chatHistory: string[];
}
const model = 'llama3-8b-8192';

const conversationalMemoryLength = 10;



const memory: Memory = {
    chatHistory: []
};


const yahooFinance = new YahooFinance();
const defaultApiKey = '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';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || defaultApiKey });



export async function getGroqChatCompletion(req: Request, res: Response) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                // Set an optional system message. This sets the behavior of the
                // assistant and can be used to provide specific instructions for
                // how it should behave throughout the conversation.
                {
                    role: "system",
                    content: "Estamos en fondo de bikini . Soy calamardo y tu bob.",
                },
                // Set a user message for the assistant to respond to.
                {
                    role: "user",
                    content: req.body.message || "Si tengo 3 churros, y me fumo 7 , cuantas manzanas me quedan para cada unicornio?",
                },
            ],

            // The language model which will generate the completion.
            model: "llama3-8b-8192",

            //
            // Optional parameters
            //

            // Controls randomness: lowering results in less random completions.
            // As the temperature approaches zero, the model will become deterministic
            // and repetitive.
            temperature: 0.5,

            // The maximum number of tokens to generate. Requests can use up to
            // 2048 tokens shared between prompt and completion.
            max_tokens: 1024,

            // Controls diversity via nucleus sampling: 0.5 means half of all
            // likelihood-weighted options are considered.
            top_p: 1,

            // A stop sequence is a predefined or user-specified text string that
            // signals an AI to stop generating content, ensuring its responses
            // remain focused and concise. Examples include punctuation marks and
            // markers like "[end]".
            stop: null,

            // If set, partial message deltas will be sent.
            stream: false,
        });
        console.log({ completion })

        res.json(completion);
    } catch (error) {
        console.log({ error });
        res.status(500).json(error);
    }
}

export async function getModels(req: Request, res: Response) {
    try {
        const models = await groq.models.list();
        res.json(models);
    } catch (error) {
        console.log({ error });
        res.status(500).json(error);
    }
}


export async function getStockInfo(symbol: string) {

    try {
        const dataForToday = await yahooFinance.downloadDataForToday(symbol);
        return dataForToday;
        if (dataForToday) {
            const formattedDate = new Date().toISOString().slice(0, 10);
            res.json(dataForToday);
        } else {
            console.log(`No data available for today`);
        }

    } catch (error) {
        console.log({ error });
        res.status(500).json(error);
    }
}

export async function getHistoricalPrice(/* symbol: string, startDate: Date, endDate: Date, */req: Request, res: Response) {
    const { symbol, startDate, endDate } = req.body;
    const dataBetweenDate = await yahooFinance.fetchStockData(symbol, startDate, endDate);
    res.json(dataBetweenDate);
}


export async function tellMeAboutStock(req: Request, res: Response) {
    // f" The JSON object must use the schema: {json.dumps(Recipe.model_json_schema(), indent=2)}",
    // res.json('here');
    const symbol = 'TSLA';
    const stockInfo = await getStockInfo('TSLA');
    // res.json(stockInfo);

    const systemPrompt = `Soy un asistente financiero útil que analiza acciones y precios de acciones. Hoy es ${new Date().toISOString().split('T')[0]}. 
    La información actual del símbolo ${symbol} es: ${JSON.stringify(stockInfo)} muestra y explica todo en base a los resultados de ${JSON.stringify(stockInfo)}`;
    const userMessage = req.body.message || "Da ideas al usuario";
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            // Set a user message for the assistant to respond to.
            {
                role: "user",
                content: userMessage,
            },

        ],
        // The language model which will generate the completion.
        model: "llama3-8b-8192",
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        stream: false,
    });
    console.log({ completion })


    // const assistantHistory = new AssistantHistory({
    //     message: userMessage,
    //     assistant_id: 1
    // });
    // const assistantHistory = new AssistantHistory({
    //     message: completion.choices[0].message.content,
    //     assistant_id: 1
    // });

    // Save the assistantHistory to the database
    // await assistantHistory.save();

    res.json({
        completion: completion.choices[0].message.content,
        stockInfo
    });
}


// Function to handle chat interaction
export async function chatWithMemory(req: Request, res: Response) {
    try {
        const systemPrompt = 'You are a friendly conversational chatbot';
        const userQuestion = req.body.message;

        // Get chat history from database, paginated
        const dbHistory = await AssistantHistory.findAll({
            // where: {
            //     assistant_id: 1
            // },
            order: [['id', 'DESC']],
            limit: conversationalMemoryLength,
            attributes: ['id', 'message', 'message_type', 'assistant_id', 'created_at', 'updated_at']
        });

        // Format database history to match memory format
        const formattedHistory = dbHistory.map(h => {
            return `${h.message_type === 'user' ? 'User' : 'Chatbot'}: ${h.message}`;
        }).reverse();

        // Merge with in-memory history
        memory.chatHistory = [...formattedHistory];

        if (userQuestion) {
            // Add user question to chat history
            const userMessage = `User: ${userQuestion}`;
            memory.chatHistory.push(userMessage);

            // Keep only the last 'conversationalMemoryLength' messages
            if (memory.chatHistory.length > conversationalMemoryLength) {
                memory.chatHistory.shift();
            }

            // Construct the prompt
            const prompt = [
                { role: "system", content: systemPrompt },
                ...memory.chatHistory.map(msg => ({ role: "user", content: msg })),
                { role: "user", content: userQuestion }
            ];

            // Generate response from Groq
            const completion = await groq.chat.completions.create({
                messages: prompt,
                model,
                temperature: 0.5,
                max_tokens: 1024,
                top_p: 1,
                stop: null,
                stream: false,
            });

            // Add chatbot response to chat history

            const botMessage = `Chatbot: ${completion.choices[0].message.content}`;
            memory.chatHistory.push(botMessage);
            // Save user message to history
            await AssistantHistory.create({
                message: userQuestion,
                // assistant_id: 1,
                message_type: 'user'
            });

            // Save bot message to history 
            await AssistantHistory.create({
                message: completion.choices[0].message.content,
                // assistant_id: 1,
                message_type: 'bot'
            });

            // const history = memory.chatHistory.join('\n');

            /*    const assistantHistory = new AssistantHistory({
                   message: completion.choices[0].message.content,
                   assistant_id: 1,
                   message_type
               }); */

            // Send response back to user
            res.json({ response: completion.choices[0].message.content });
        } else {
            res.status(400).json({ error: "No message provided" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// Function to get chat history
export async function getChatHistory(req: Request, res: Response) {
    try {
        const dbHistory = await AssistantHistory.findAll({
            order: [['id', 'DESC']],
            limit: conversationalMemoryLength,
            attributes: ['id', 'message', 'message_type', 'assistant_id', 'created_at', 'updated_at']
        });

        // Format database history to match memory format
        const formattedHistory = dbHistory.map(h => {
            return `${h.message_type === 'user' ? 'User' : 'Chatbot'}: ${h.message}`;
        }).reverse();

        res.json({ chatHistory: formattedHistory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



/* async function plotPriceOverTime(historicalPriceDfs: any[]) {
    let fullDf = pd.DataFrame({ columns: ['Date'] });

    for (const df of historicalPriceDfs) {
        fullDf = fullDf.merge(df, { on: 'Date', how: 'outer' });
    }

    const fig = plotly.Figure();

    // Add trace for each stock symbol
    for (const column of fullDf.columns.slice(1)) {
        fig.add_trace({
            x: fullDf['Date'],
            y: fullDf[column],
            mode: 'lines+markers',
            name: column
        });
    }

    // Update layout
    fig.update_layout({
        title: `Stock Price Over Time: ${fullDf.columns.slice(1).join(', ')}`,
        xaxis: {
            title: 'Date',
            tickangle: -45,
            nticks: 20,
            tickfont: { size: 10 }
        },
        yaxis: {
            title: 'Stock Price (USD)',
            tickprefix: '$',
            tickformat: ',.2f',
            showgrid: true,
            gridcolor: 'lightgrey'
        },
        legend_title_text: 'Stock Symbol',
        plot_bgcolor: 'gray',
        paper_bgcolor: 'gray',
        legend: {
            bgcolor: 'gray',
            bordercolor: 'black'
        }
    });

    await fig.write_image("plot.png");
    console.log("![Plot](plot.png)");
} */
/*
async function callFunctions(llmWithTools: any, userPrompt: string) {
    const systemPrompt = `You are a helpful finance assistant that analyzes stocks and stock prices. Today is ${new Date().toISOString().split('T')[0]}`;

    const messages = [
        new SystemMessage(systemPrompt),
        new HumanMessage(userPrompt)
    ];

    const aiMsg = await llmWithTools.invoke(messages);
    messages.push(aiMsg);

    const historicalPriceDfs: any[] = [];
    const symbols: string[] = [];

    for (const toolCall of aiMsg.tool_calls) {
        const selectedTool = {
            get_stock_info: getStockInfo,
            get_historical_price: getHistoricalPrice
        }[toolCall.name.toLowerCase() as 'get_stock_info' | 'get_historical_price'];
        const toolOutput = await selectedTool(...Object.values(toolCall.args));

        if (toolCall.name === 'get_historical_price') {
            historicalPriceDfs.push(toolOutput);
            symbols.push(toolOutput.columns[1]);
        } else {
            messages.push(new ToolMessage(toolOutput, toolCall.id));
        }
    }

    if (historicalPriceDfs.length > 0) {
        await plotPriceOverTime(historicalPriceDfs);
        const symbolsStr = symbols.join(' and ');
        messages.push(new ToolMessage(
            `Tell the user that a historical stock price chart for ${symbolsStr} been generated.`,
            '0'
        ));
    }

    return (await llmWithTools.invoke(messages)).content;
} */

/* const llm = new Groq({
  groqApiKey: process.env.GROQ_API_KEY,
  model: 'llama3-70b-8192'
}); */

// const tools = [getStockInfo, getHistoricalPrice];
/* const llmWithTools = groq.chat.completions.create({
    messages: [],
    model: 'llama3-70b-8192',
    tools: tools
});

export async function handleUserInput(req: Request, res: Response) {
    try {
        const { userInput } = req.body;
        const response = await callFunctions(llmWithTools, userInput);
        res.json({ response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
} */