import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import Usuario from '../models/usersModel';

export const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
  //const token = req.header('x-token');
let token;
if (req?.headers?.authorization && req?.headers?.authorization?.startsWith('Bearer ')) {
  token = req?.headers?.authorization?.substring(7);
}else{
  token=req?.headers?.authorization
}

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify(token,'Fi3r0@l0om1ed0331106') as { uid: string }; //aliase

    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findByPk(uid);
    console.log('usuarip',usuario)

    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe DB',
      });
    }

    // Verificar si el uid tiene estado true
    if (!usuario?.status) {
      return res.status(401).json({
        msg: 'Token no válido - usuario con estado: false',
      });
    }

    req.usuario = usuario; // Cambio aquí, asignando a req.usuario
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};
