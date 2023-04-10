import { CustomError } from "./custom-error";

export class Unauthorized extends CustomError {
    statusCode = 401;
    reason = "Please sign in to proceed";
    constructor() {
        super('Please sign in to proceed.');
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}