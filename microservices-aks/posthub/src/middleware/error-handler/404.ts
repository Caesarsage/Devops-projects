import { CustomError } from "./custom-error";

export class PageNotFound extends CustomError {
    statusCode = 404;
    reason = "Page Not Found";
    constructor() {
        super('This page does not exist.');

        Object.setPrototypeOf(this, PageNotFound.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}