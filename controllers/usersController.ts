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

export const createUser = async (req: Request, res: Response) => {
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
        const salt = bcryptjs.genSaltSync();
        const newUser = await Usuario.create(
            body
        );
        newUser.password = bcryptjs.hashSync(body.password, salt);
        // Enviar respuesta
        res.json(newUser);
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
    console.log("body paupu", body)
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        await usuario.update(body);
        if (body.etas_num !== undefined && etas_num > 0) {
            console.log('numerico', etas_num)
            if (etas_num > 0) {
                const newEta = await Eta.create({
                    user_id: usuario.id,
                }, { transaction: t });

                const newPassportSec = await PassportSec.create({ transaction: t });
                const personalInfoSec = await PersonalInfoSec.create({ transaction: t });
                const newStatusiiSec = await StatusiiSec.create({ transaction: t });
                const newTravelToCanada = await TravelToCanada.create({ transaction: t });
                console.log("newPassportSecnewPassportSec********", newPassportSec)
                console.log("newEta11111-------------------", newEta)
                await newEta.update({
                    where: {
                        id: newEta.id
                    },
                    eta_name: body.eta_name,
                    personal_info_sec_id: personalInfoSec.id,
                    status_ii_sec_id: newStatusiiSec.id,
                    passport_sec_id: newPassportSec.id,
                    travel_to_canada_sec_id: newTravelToCanada.id
                }, { transaction: t });
                console.log("newEta222-------------------", newEta)
            }

            await t.commit();
        }

        res.json(usuario);
    } catch (error) {
        await t.rollback();
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