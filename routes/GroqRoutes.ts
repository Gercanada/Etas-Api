
import { Router } from 'express';
import { check } from 'express-validator';

import {
    getGroqChatCompletion, getModels, getStockInfo, getHistoricalPrice,
    tellMeAboutStock, chatWithMemory, getChatHistory
} from '../controllers/GroqApiController';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

/**
 * @swagger
 * /api/groq:
 *   post:
 *     summary: Get Groq chat completion
 *     description: Retrieves a chat completion response from the Groq API. Requires authentication.
 *     tags: [Groq]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chat completion retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 choices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: object
 *                         properties:
 *                           content:
 *                             type: string
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.post('/', [validarJWT], getGroqChatCompletion);

/**
 * @swagger
 * /api/groq/models:
 *   get:
 *     summary: Get available Groq models
 *     description: Retrieves a list of available models from the Groq API. Requires authentication.
 *     tags: [Groq]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Models retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       object:
 *                         type: string
 *                       owned_by:
 *                         type: string
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.get('/models', [validarJWT], getModels);

/**
 * @swagger
 * /api/groq/stock-info:
 *   post:
 *     summary: Get current stock information
 *     description: Retrieves current stock information for a given symbol. Requires authentication.
 *     tags: [Groq]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 description: Stock symbol (e.g. 'SBIN.NS')
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date for data range
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date for data range
 *               key:
 *                 type: string
 *                 description: Optional API key
 *     responses:
 *       200:
 *         description: Stock information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 price:
 *                   type: number
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.post('/stock-info', [validarJWT], getStockInfo);

/**
 * @swagger
 * /api/groq/historical-price:
 *   post:
 *     summary: Get historical stock prices
 *     description: Retrieves historical stock price data for a given symbol and date range. Requires authentication.
 *     tags: [Groq]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 description: Stock symbol
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date for historical data
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date for historical data
 *     responses:
 *       200:
 *         description: Historical price data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                       price:
 *                         type: number
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.post('/historical-price', [validarJWT], getHistoricalPrice);

/**
 * @swagger
 * /api/groq/tell-me-about-stock:
 *   post:
 *     summary: Get stock information and tell me about it
 *     description: Retrieves current stock information and tells me about it. Requires authentication.
 *     tags: [Groq]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stock information and analysis retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.post('/tell-me-about-stock', [validarJWT], tellMeAboutStock);

/**
 * @swagger
 * /api/groq/memory:
 *   post:
 *     summary: Get Groq chat completion with memory
 *     description: Retrieves a chat completion response from the Groq API with memory. Requires authentication.
 *     tags: [Groq]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               message:
 *                 type: string
 *     responses:   
 *       200:
 *         description: Chat completion retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:   
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.post('/memory', [validarJWT], chatWithMemory);

/**
 * @swagger
 * /api/groq/memory:
 *   get:
 *     summary: Get chat history
 *     description: Retrieves the chat history. Requires authentication.
 *     tags: [Groq]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chatHistory:
 *                   type: array  
 *       401:       
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */
router.get('/memory', [validarJWT], getChatHistory);

export default router;
