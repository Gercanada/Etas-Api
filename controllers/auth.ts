import { Request, Response } from 'express';
import Usuario from '../models/usersModel';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt';

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const { body } = req;

    try {
        // return res.json(body.email);
        // Verificar si el email existe
        const usuario = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

console.log("usuariooopapu",usuario)
        // SI el usuario está activo
        if (!usuario.status) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // return res.json('ok')

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log({ error })
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

export const renovarToken = async (req: Request, res: Response) => {
    const { usuario } = req;
    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
        usuario,
        token,
    });
};




export const token = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.header('Authorization');
        let token;

        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            token = authorizationHeader.substring(7); // Para eliminar "Bearer " del encabezado
        }
        // console.log({ token })

        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición',
            });
        }
        return res.json(token);
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido',
        });
    }

};
