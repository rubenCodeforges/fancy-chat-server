import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Socket, Server} from 'socket.io';
import {Logger} from "@nestjs/common";
import {UserMessage} from "../dtos/UserMessage";
import {ChatUserService} from "../providers/ChatUserService";
import {MessageService} from "../providers/MessageService";

@WebSocketGateway()

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    constructor(private chatUserService: ChatUserService,
                private messageService: MessageService) {
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: {userName: string, text: string}): void {
        this.server.emit('msgToClient', this.messageService.addMessage(new UserMessage(payload, client.id)));
    }

    @SubscribeMessage('registerUser')
    registerUser(client: Socket, payload: {userName: string}): void {
        this.chatUserService.addUser({userName: payload.userName, clientId: client.id});
        this.server.emit('registered', {status: 'ok'});
        this.server.emit('connectedUsers', this.chatUserService.getAll());
        this.server.emit('msgToClient', this.messageService.getMessages());

    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.chatUserService.delete(client.id);
        this.server.emit('connectedUsers', this.chatUserService.getAll());
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.server.emit('msgToClient', this.messageService.getMessages());
        this.server.emit('connectedUsers', this.chatUserService.getAll());
    }
}
