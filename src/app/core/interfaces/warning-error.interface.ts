export class WarningError extends Error {
    constructor(m: string) {
        super(m);
        
        Object.setPrototypeOf(this, WarningError.prototype);
    }
}
