import { body } from 'express-validator';

export const postCreateValidtion = [
    body('title').isLength({ min:5 }).isString(),
    body('text').isLength({ min:10 }).isString(),
    body('tags').optional().isString(),
    body('imageUrl').optional().isString(),
];