import { Request, Response } from 'express';
import Usuario from '../models/usersModel';
import bcryptjs from 'bcryptjs';
import Eta from '../models/etasModel';
import db from '../db/connection';
import jwt from "jsonwebtoken";
import TravelToCanada from '../models/travelToCanadaSecModel';


export const getTravelToCanadaSec = async (req: Request, res: Response) => {
    const travelCanada = await TravelToCanada.findAll();
    res.json({ travelCanada });
}

export const getTravelToCanadaSecs = async (req: Request, res: Response) => {
    const { id } = req.params;
    const travelSec = await TravelToCanada.findByPk(id);
    try {
    if (travelSec) {
        res.json(travelSec);
    } else {
        res.status(404).json({
            msg: `No existe un travelSec con el id ${id}`
        });
    }
}catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Hable con el administrador'
    })
}
}

export const postTravelToCanadaSec = async (req: Request, res: Response) => { }

export const putTravelToCanadaSec = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const travelCanada = await TravelToCanada.findByPk(id);
        if (!travelCanada) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await travelCanada.update({
            ...body,
        });

        const allFieldsFilled = (
            travelCanada.travel_hour !== (null||"")  &&
            travelCanada.crime_any_country !== (null||"") &&
            travelCanada.travel_propouse !== (null||"") &&
            travelCanada.more_info !== (null||"") &&
            travelCanada.denied_enter_country !== (null||"") &&
            travelCanada.had_tuberculosis !== (null||"") &&
            travelCanada.other !== (null||"")  &&
            travelCanada.other_reason !== (null||"") &&
            travelCanada.how_contact_us_id !== (null||"") &&
            travelCanada.is_completed !== (null||"") ?true :false 
        );

        const isCompleted = allFieldsFilled ? true : false;
        await travelCanada.update({
            is_completed: isCompleted
        });

        res.json(travelCanada);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteTravelToCanadaSec = async (req: Request, res: Response) => { }