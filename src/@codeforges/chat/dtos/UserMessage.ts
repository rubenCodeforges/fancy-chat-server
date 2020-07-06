export class UserMessage {
    name: string;
    text: string;
    sendAt: Date;

    constructor(payload: {userName: string, text: string}, public clientId: string) {
        this.name = payload.userName;
        this.text = payload.text;
        this.sendAt = new Date();
    }
}