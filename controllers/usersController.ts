import { Request, Response } from 'express';
import Usuario from '../models/usersModel';
import bcryptjs from 'bcryptjs';
import Eta from '../models/etasModel';
import PassportSec from '../models/passportSecModel';
import PersonalInfoSec from '../models/personalInfoSecModel';
import TravelToCanada from '../models/travelToCanadaSecModel';
import StatusiiSec from '../models/statusiiSecModel';
import db from '../db/connection';

export const getUsuarios = async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll();
    res.json({ usuarios });
}

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const usuario = new Usuario(body);
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(body.password, salt);
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async (req: Request, res: Response) => {
 const { id } = req.params;
    const { body } = req;
    const { etas_num } = body;
    const t = await db.transaction()
    console.log("body paupu",body)
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        await usuario.update(body);
    if (body.etas_num !== undefined && etas_num > 0) {
        console.log('numerico',etas_num)
        if(etas_num > 0){
            const newEta =await Eta.create({
                user_id: usuario.id,
              }, { transaction: t });
              console.log('newEta',newEta)
              const newPassportSec = await PassportSec.create({
                eta_id: newEta.id,
              }, { transaction: t });
              const personalInfoSec = await PersonalInfoSec.create({
                eta_id: newEta.id,
              }, { transaction: t });
              const newStatusiiSec = await StatusiiSec.create({
                eta_id: newEta.id,
              }, { transaction: t });
              const newTravelToCanada = await TravelToCanada.create({
                eta_id: newEta.id,
              }, { transaction: t });
            //   await newEta.update({ passportSec_id: newPassportSec.id,
            //     personalInfoSec_id: personalInfoSec.id,
            //     statusIISec_id: newStatusiiSec.id,
            //     travelToCanadaSec_id: newTravelToCanada.id,
            // }, { transaction: t });

            console.log("newEtavvvv=====================================",newEta.id)

            await newEta.update({
                where: {
                    id: newEta.id
                },
                travelToCanadaSec_id: newTravelToCanada.id,
                statusIISec_id:newStatusiiSec.id,
                passportSec_id:newPassportSec.id,
                personalInfoSec_id:personalInfoSec.id
            }, { transaction: t });

        }
       // for( let i = 0; i<= etas_num; i++ ){
      //  }
      await t.commit(); // Confirma la transacción
      }

   
      res.json(usuario);
    } catch (error) {
        await t.rollback(); // Revierte la transacción en caso de error
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    await usuario.update({ status: false });
    // await usuario.destroy();
    res.json(usuario);
}

