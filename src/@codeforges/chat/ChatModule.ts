import {Module} from "@nestjs/common";
import {ChatGateway} from "./gateway/ChatGateway";
import {ChatUserService} from "./providers/ChatUserService";
import {MessageService} from "./providers/MessageService";

const providers = [
    ChatGateway,
    ChatUserService,
    MessageService
];

@Module({
    providers: [...providers],
    exports: [...providers]
})
export class ChatModule {

}
