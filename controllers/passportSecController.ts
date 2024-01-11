import { Request, Response } from 'express';
import Usuario from '../models/usersModel';
import bcryptjs from 'bcryptjs';
import Eta from '../models/etasModel';
import db from '../db/connection';
import jwt from "jsonwebtoken";
import PassportSec from '../models/passportSecModel';
import PersonalInfoSec from '../models/personalInfoSecModel';
import StatusiiSec from '../models/statusiiSecModel';
import TravelToCanada from '../models/travelToCanadaSecModel';


export const getPassportsSecs = async (req: Request, res: Response) => {
    const passportSec = await PassportSec.findAll();
    res.json({ passportSec });
}

export const getPassportSec = async (req: Request, res: Response) => {
    const { id } = req.params;
    const passportSec = await PassportSec.findByPk(id);
    try {
    if (passportSec) {
        res.json(passportSec);
    } else {
        res.status(404).json({
            msg: `No existe un passportSec con el id ${id}`
        });
    }
}catch (error) {
    console.log(error);
    res.status(500).json({
        msg: 'Hable con el administrador'
    })
}
}

export const getUserPassportSec = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('id++++', id);
    try {
        const passportSec = await PassportSec.findAll({
            where: {
                user_id: id
            }
        })

        if (passportSec) {
            res.json(passportSec);
        } else {
            console.log("errorrr")
            res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const postUserPassportSec = async (req: Request, res: Response) => { }

export const putUserPassportSec = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const passportSec = await PassportSec.findByPk(id);
        if (!passportSec) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        await passportSec.update({
            ...body,
        });

        const allFieldsFilled = (
            passportSec.passport_no !== (null || "") &&
                passportSec.valid_from !== (null || "") &&
                passportSec.due_date !== (null || "") &&
                passportSec.cityOfBirth !== (null || "") &&
                passportSec.citizen_another_country_id !== (null || "") &&
                passportSec.marital_situation_id !== (null || "") &&
                passportSec.has_green_card_id !== (null || "") &&
                passportSec.passport_country !== (null || "") ? true : false
        );

        const isCompleted = allFieldsFilled ? true : false;
        await passportSec.update({
            is_completed: isCompleted
        });

        res.json(passportSec);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteEtas = async (req: Request, res: Response) => { }