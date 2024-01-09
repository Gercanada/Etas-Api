
import { validationResult } from 'express-validator';

// const { validationResult } = require('express-validator');

import { NextFunction, Request, Response } from 'express';


export const validarCampos = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}
