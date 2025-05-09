import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction, response } from 'express';

// Middleware para validar parámetros en la URL
export const validateId = [
    param('id')
        .isUUID()
        .withMessage('El ID debe ser un UUID válido'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

/* Middleware para validar el cuerpo de una solicitud de contacto */
export const validateContactMiddleware = [
    body('email').isEmail().withMessage('Correo invalido'),
    body('name').isString().notEmpty().isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastname').isString().notEmpty().isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('comment').isString().notEmpty().isLength({ min: 10, max:500 }).withMessage('El comentario debe tener entre 10 y 500 caracteres'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({ succes: false, errors: errors.array() });
        }
        next()
      },
    ];   

// Middleware para validar el cuerpo de una solicitud de traducción
export const validateTranslationRequest = [
    body('text')
        .isString()
        .isLength({ min: 5 })
        .withMessage('El texto debe contener al menos 5 caracteres'),
    body('language')
        .isString()
        .isIn(['es', 'en', 'fr', 'de'])
        .withMessage('El idioma debe ser uno de: es, en, fr, de'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];