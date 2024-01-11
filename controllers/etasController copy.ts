
export const index = async (req: Request, res: Response) => {
    const data = await { [CLASS_NAME]}.findAll();
    res.json({ data });
}


export const store = async (req: Request, res: Response) => {
    try {
        //create 
    } catch (error) {
        res.status(500).json({
            error: `No pending etas`
        });
    }
}

export const show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const record = await [CLASS_NAME].findByPk(id);
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({
            msg: `No existe un registro con el id ${id}`
        });
    }
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const eta = await [CLASS_NAME].findAll({
            where: {
                id: id,
            }
        });


        res.status(204).json('Success');
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
    }
}

export const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;


    try {
        const eta = await [CLASS_NAME].findAll({ where: { id: id } });

        // Delete record 
        res.status(204).json('Success');
    } catch (error) {
        res.status(500).json({
            error: `No completed etas`
        });
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
        const questionsId = await PassportSec.findByPk(passportSec_id);


        await usuario.update(body);
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}
