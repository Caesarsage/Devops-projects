import { Request, Response, NextFunction } from "express";
import { CustomError } from "./custom-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        process.env.NODE_ENV !== 'test' ? console.log('An error occurred: ', err.serializeErrors(), err.statusCode) : null;

        return res.status(err.statusCode).json({ errors: err.serializeErrors() });

    }

    // if error isnt handled in CustomError, then handle as a generic error
    return res.status(400).send({
        errors: [{ message: "Oops, Invalid data was provided!!!" }],
    });
};