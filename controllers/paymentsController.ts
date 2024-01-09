import { Request, Response } from "express";

export const list = (req: Request, res: Response) => {

    res.json({ 'here': 'go' });

}
export const store = () => {

}
export const update = () => {

}
export const destroy = () => {

}



export const newPrice = () => {
    return 'new price';
}