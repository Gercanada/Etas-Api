import { Request, Response } from 'express';
import Usuario from '../models/usersModel';
import bcryptjs from 'bcryptjs';
import Eta from '../models/etasModel';
import db from '../db/connection';
import jwt from "jsonwebtoken";
import TravelToCanada from '../models/travelToCanadaSecModel';
import StatusiiSec from '../models/statusiiSecModel';


export const getStatusSec = async (req: Request, res: Response) => {
    const statusII = await TravelToCanada.findAll();
    res.json({ statusII });
}

export const getStatusSecs = async (req: Request, res: Response) => {
    const { id } = req.params;
    const statusSec = await StatusiiSec.findByPk(id);
    try {
    if (statusSec) {
        res.json(statusSec);
    } else {
        res.status(404).json({
            msg: `No existe un statusSec con el id ${id}`
        });
    }
}catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Hable con el administrador'
    })
}
}


export const postStatusSec = async (req: Request, res: Response) => { }

export const putStatusSec = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const statusII = await StatusiiSec.findByPk(id);
        if (!statusII) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await statusII.update({
            ...body,
        });

        const allFieldsFilled = (
            statusII.country_residence !== (null||"")  &&
            statusII.address !== (null||"") &&
            statusII.zip_code !== (null||"") &&
            statusII.cityOfBirth !== (null||"") &&
            statusII.occupation_id !== (null||"") &&
            statusII.job_location !== (null||"") &&
            statusII.company_name !== (null||"") &&
            statusII.worked_time !== (null||"") &&
            statusII.permit_for_canada !== (null||"") &&
            statusII.state !== (null||"") ?true :false 
        );

        const isCompleted = allFieldsFilled ? true : false;
        await statusII.update({
            is_completed: isCompleted
        });

        res.json(statusII);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteStatusSec = async (req: Request, res: Response) => { }