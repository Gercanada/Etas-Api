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

    const travelCanada = await TravelToCanada.findAll({
        where: {
            user_id: id
        }
    })

    if (travelCanada) {
        res.json(travelCanada);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
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
            travelCanada.passport_no !== (null||"")  &&
            travelCanada.validFrom !== (null||"") &&
            travelCanada.dueDate !== (null||"") &&
            travelCanada.cityOfBirth !== (null||"") &&
            travelCanada.passportCountry !== (null||"") ?true :false 
        );

        const isCompleted = allFieldsFilled ? true : false;
        await travelCanada.update({
            isCompleted: isCompleted
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