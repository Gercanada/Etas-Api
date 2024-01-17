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
import Genders from '../models/gendersModel';


export const getPersonalInfoSec = async (req: Request, res: Response) => {
    const personalInfo = await PersonalInfoSec.findAll();
    res.json({ personalInfo });
}

export const getPersonalInfoSecs = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {    
        const personalSec = await PersonalInfoSec.findByPk(id, {
            include: [{
                model: Genders,
                as: 'gender',
            }]
        });
        

        if (personalSec) {
            const responseData = {
                ...personalSec.toJSON(), 
            };
            if(responseData.gender_id){
            responseData.gender_id = {
                id: responseData.gender.id,
                value: responseData.gender.value
            };
        }
            res.json(responseData);
        
        } else {
            res.status(404).json({
                msg: `No existe un PersonalInfoSec con el id ${id}`
            });
        }
    }  catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

export const postPersonalInfoSec = async (req: Request, res: Response) => { }

export const putPersonalInfoSec = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const personalInfo = await PersonalInfoSec.findByPk(id);
        if (!personalInfo) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        await personalInfo.update({
            ...body,
        });
        const fieldsToCheck = [
            'full_name',
            'birthday',
            'city_of_birth',
            'country_of_birth',
            'phone',
            'gender_id',
            'email'
          ];
          
          const isFieldFilled = (field:any) => {
            const value = personalInfo.get()[field];
            return value !== null && value !== "";
          };
        const allFieldsFilled = fieldsToCheck.every(isFieldFilled);
     
        console.log("allFieldsFilled",allFieldsFilled)
        const isCompleted = allFieldsFilled ? true : false;
        console.log("isCompletisCompleteded",isCompleted)
        await personalInfo.update({
            is_completed: isCompleted
        });

        res.json(personalInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deletePersonalInfoSec = async (req: Request, res: Response) => { }