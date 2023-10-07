import { Request, Response } from 'express';
import Usuario from '../models/usuario';
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
