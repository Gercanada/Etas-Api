
import { Request, Response } from 'express';
import expressListRoutes from 'express-list-routes';

export const listRoutes = (req: Request, res: Response) => {
    console.log({ routelist: expressListRoutes(req.app) });
    res.json({ data: expressListRoutes(req.app) });
}