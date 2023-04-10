import { Request, Response, NextFunction } from "express";

import { validationResult } from "express-validator";
import { ReqValidationError } from "./req-validation-error";

export const reqValidatorResult = (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ReqValidationError(errors.array()));
    }
    return next();
};
 