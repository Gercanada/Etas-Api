import { Request, Response } from 'express';
import Usuario from '../models/usersModel';
import bcryptjs from 'bcryptjs';
import Eta from '../models/etasModel';
import db from '../db/connection';
import  jwt  from "jsonwebtoken";
import PassportSec from '../models/passportSecModel';
import PersonalInfoSec from '../models/personalInfoSecModel';
import StatusiiSec from '../models/statusiiSecModel';
import TravelToCanada from '../models/travelToCanadaSecModel';

export const getEtas = async (req: Request, res: Response) => {
    const etas = await Eta.findAll();
    res.json({ etas });
}

export const getEta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const eta = await Eta.findByPk(id,{
        include:[{model:PersonalInfoSec,as:"personal_info",attributes: ['section', 'is_completed']},
        {model:PassportSec,as:"passport",attributes: ['section', 'is_completed']},
        {model:StatusiiSec,as:"status_ii",attributes: ['section', 'is_completed']},
        {model:TravelToCanada,as:"travel_to_canada",attributes: ['section', 'is_completed']}
    ]
    });
   

    if (eta) {
        const etaJSON = eta.toJSON();
        const sections = [
            etaJSON.personal_info,
            etaJSON.passport,
            etaJSON.status_ii,
            etaJSON.travel_to_canada
        ];
    
        const responseData = {
            ...etaJSON,
            sections  // Agregando el array transformado
        };
        delete responseData.personal_info;
        delete responseData.passport;
        delete responseData.status_ii;
        delete responseData.travel_to_canada;
        // console.log('etaetaetaeta',responseData.personalsQuestions)

        res.json(responseData);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

export const getPendingEta = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const eta = await Eta.findAll({
            where: {
                user_id: id,
                eta_completed: false
            }
        });

        if (eta) {
            res.json(eta);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({
            error: `No pending etas`
        });
    }
}

export const getCompletedEta = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const eta = await Eta.findAll({
            where: {
                user_id: id,
                is_completed: true
            }
        });

        if (eta) {
            res.json(eta);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }
}

export const getUserEtas = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('id++++',id);
    
    const eta = await Eta.findAll({ where: {
        user_id:id
    }})

    console.log("eta----",eta)
    if (eta) {
        res.json(eta);
    } else {
        console.log("errorrr")
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }
}

export const postEtas = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const existeEmail = await Eta.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.email
            });
        }
        const usuario = new Eta(body);
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

export const putEtas = async (req: Request, res: Response) => {
 const { id } = req.params;

    const { body } = req;
    try {
        const usuario = await Eta.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        // const questionsId = await PassportSec.findByPk(passportSec_id);
        // ?await usuario.update(body);
        res.json("updated");
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteEtas = async (req: Request, res: Response) => {
    const { id } = req.params;
    const eta = await Eta.findByPk(id);
    const usuario = await Usuario.findOne({
        where:{id : eta?.user_id}
    })
    console.log("etaaaaa",eta)
    const t = await db.transaction()
    const {etas_num} = usuario;
    const deleteEta= etas_num -1;
    if (!eta) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    try { 
        await Eta.destroy({
            where: {
              id: id
            },
            transaction: t
          });
 
        await PassportSec.destroy({
            where: {
                id: eta.passport_sec_id
            },
            transaction: t
        });
    
        await PersonalInfoSec.destroy({
          where: {
            id: eta.personal_info_sec_id
          },
          transaction: t
        });
    
        await StatusiiSec.destroy({
          where: {
            id: eta.status_ii_sec_id
          },
          transaction: t
        });
    
        await TravelToCanada.destroy({
          where: {
            id: eta.travel_to_canada_sec_id
          },
          transaction: t
        });
        

        const usuario = await Usuario.findOne({
          where: { id: eta.user_id }
        });

          
        const deleteEta = usuario.etas_num - 1;
        await usuario.update({ etas_num: deleteEta }, { transaction: t });
    
        await t.commit();
    
        res.json(eta);
      }catch(error){
    await t.rollback();
    console.log(error);
    res.status(500).json({
        msg: 'Hable con el administrador'
    })
}
}