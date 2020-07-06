import {Injectable} from "@nestjs/common";
import {UserMessage} from "../dtos/UserMessage";
import * as _ from "lodash";

@Injectable()
export class MessageService {
    private messages: UserMessage[] = [];
    private readonly MAX_MESSAGE = 100;
    private readonly DROP_COUNT_ON_LIMIT = 1;

    addMessage(message: UserMessage): UserMessage[] {
        if (this.messages.length >= this.MAX_MESSAGE) {
            _.drop(this.messages, this.DROP_COUNT_ON_LIMIT);
        }
        this.messages.push(message);
        return this.messages;
    }

    getMessages() {
        return _.orderBy(this.messages, ['sendAt']);
    }
}