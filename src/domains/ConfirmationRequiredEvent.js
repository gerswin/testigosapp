export class ConfirmationRequiredEvent {
    constructor({ email = String() }) {
        this.email = email || undefined
    }

    static create({ email = String() }) {
        return new ConfirmationRequiredEvent({ email })
    }
}
