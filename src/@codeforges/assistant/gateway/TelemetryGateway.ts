import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import {Logger} from "@nestjs/common";
import {Dimension, MousePosition, Scroll, TelemetryUrl} from "../dtos/Telemetry";
import {TelemetryService} from "../providers/TelemetryService";

@WebSocketGateway()

export class TelemetryGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    constructor(private service: TelemetryService) {
    }

    @SubscribeMessage('mouse-position')
    handleMousePosition(client: Socket, payload: MousePosition): void {
        this.server.emit('mouse-position', payload);
    }

    @SubscribeMessage('mouse-down')
    handleMouseDown(client: Socket, payload: MousePosition): void {
        this.server.emit('mouse-down', payload);
    }

    @SubscribeMessage('mouse-up')
    handleMouseUp(client: Socket, payload: MousePosition): void {
        this.server.emit('mouse-up', payload);
    }

    @SubscribeMessage('scroll')
    handleScroll(client: Socket, payload: Scroll): void {

    }

    @SubscribeMessage('resize')
    handleResize(client: Socket, payload: Dimension): void {

    }

    @SubscribeMessage('url')
    handleUrl(client: Socket, payload: TelemetryUrl): void {

    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
    }

    handleConnection(client: Socket, ...args: any[]) {
    }
}
