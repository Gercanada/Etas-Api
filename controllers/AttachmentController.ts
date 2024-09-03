

import { Request, Response } from "express";
import Attachment from "../models/AttachmentModel";
import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import * as AWS from "@aws-sdk/client-s3";


const accessKey: string | any = process.env.S3_ACCESS_KEY ?? '8XCSIKA2UUQ0QG75GPN1';
const secretKey: string | any = process.env.S3_SECRET_KEY ?? 'sGyCpLYBLnT805JPYZBukpfiKnbtyGuBqHrYmAMX';
const region: string | any = process.env.S3_REGION ?? 'us-east-1';
const host: string | any = process.env.S3_HOST_NAME ?? 'https://sjc1.vultrobjects.com';

const client = new AWS.S3({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    },
    endpoint: host, // URL del servicio compatible con S3
    forcePathStyle: false,
    region: region
});



export const index = async (req: Request, res: Response) => {
    const data = await Attachment.findAll();
    res.json({ data });
}


export const store = async (req: Request, res: Response) => {
    try {
        //create 
    } catch (error) {
        res.status(500).json({
            error: `No pending etas`
        });
    }
}

export const show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const record = await Attachment.findByPk(id);
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        });
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const eta = await Attachment.findAll({
            where: {
                id: id,
            }
        });


        res.status(204).json('Success');
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }
}

export const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;


    try {
        const eta = await Attachment.findAll({ where: { id: id } });
        // Delete record 
        res.status(204).json('Success');
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }
}


/**
 * Upload file to s3 bucket
 * @param req attachment
 * @param res success | error
 */
export const uploadFile = async (req: Request, res: Response) => {
    try {
        console.log('Try to up a file')
        const file = req?.file;
        const params: any = {
            Bucket: process.env.S3_BUCKET_NAME ?? 'etas-portal',
            Key: 'files/' + file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const command = new PutObjectCommand(params);
        await client.send(command);
        res.status(200).json('File uploaded')
    } catch (error) {
        console.log({ error })
        res.send(error)
    }

};


/**
 * List content of s3 selected bucket
 * @param req null
 * @param res bucket content
 */
export const listBucketContent = async (req: Request, res: Response) => {
    try {
        const params: any = {
            Bucket: process.env.S3_BUCKET_NAME ?? 'etas-portal',
        };
        const command = new ListObjectsCommand(params);
        const data = await client.send(command);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);

    }
}



export const getObject = async (req: Request, res: Response) => {
    try {
        const params: any = {
            Bucket: process.env.S3_BUCKET_NAME ?? 'etas-portal',
            Key: '2120.webp'
        };
        const command = new GetObjectCommand(params);
        const data = await client.send(command);
        /*     console.log({ data })
            res.status(200).json(data); */
    } catch (error) {
        console.log({ error })
        res.status(500).json(error);
    }
}


/**
 * Delete file from object storage using location path
 * @param req 
 * @query req path/to/deletefile.ext 
 * @param res 
 */
export const deleteObject = async (req: Request, res: Response) => {
    try {
        if (req.query.path) {
            const obj_path = req.query.path;
            const params: any = {
                Bucket: process.env.S3_BUCKET_NAME ?? 'etas-portal',
                Key: obj_path
            };
            const command = new DeleteObjectCommand(params);
            const result = await client.send(command);
            res.status(200).json(result);

        }

    } catch (error) {
        console.log({ error })
        res.status(500).json(error);
    }
}


export const previewObject = async (req: Request, res: Response) => {
    try {

        if (req.query.path) {
            const obj_path = req.query.path;

            console.log({obj_path})
            const params = {
                Bucket: process.env.S3_BUCKET_NAME ?? 'etas-portal',
                Key: obj_path, // Aquí deberías obtener la clave (Key) del objeto de manera dinámica
            };
            const command = new GetObjectCommand(params);
            const { Body, ContentType } = await client.send(command);
            if (Body) {
                // Establecer el tipo de contenido correcto
                res.setHeader('Content-Type', ContentType);
                // Body es un stream. Reenviar este stream directamente a la respuesta.
                Body.pipe(res);
            } else {
                res.status(404).send('No se encontró el archivo');
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
