import { Request, Response } from 'express';
import Usuario from '../models/usersModel';
import bcryptjs from 'bcryptjs';
import Eta from '../models/etasModel';


export const getEtas = async (req: Request, res: Response) => {
    const etas = await Eta.findAll();
    res.json({ etas });
}

export const getEta = async (req: Request, res: Response) => {
    const { id } = req.params;
    const eta = await Eta.findByPk(id);
    if (eta) {
        res.json(eta);
    } else {
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
        await usuario.update(body);
        res.json(usuario);
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
    if (!eta) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }
    //await usuario.update({ status: false });.
     await Eta.destroy({ where: {
        id: eta.id
    }});
    res.json(eta);
}

