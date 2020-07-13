import {Injectable} from "@nestjs/common";
import {Room} from "../dtos/Room";
import * as _ from "lodash";
import {Client, Master} from "../dtos/Users";
import {Subscription, timer} from "rxjs";

@Injectable()
export class TelemetryService {
    private rooms: Room[] = [];
    private readonly ROOM_TTL = 1000 * 60 * 2;
    private roomTTLSubs: { [roomUUID: string]: Subscription } = {};

    public getFirstFreeRoomByDomain(domain: string): Room {
        return _.head(_.filter(this.rooms, (r) => !r.isOccupied && !!r.master && r.domain === domain));
    }

    /**
     * Add master to a free room, or create a new room
     * If connected to old room , remove TTL sub
     * @param master
     * @param domain
     */
    public connectMaster(master: Master, domain: string) {
        let room = this.getFirstFreeRoomByDomain(domain);
        if (room) {
            room.addMaster(master, domain);
            this.roomTTLSubs[room.uuid].unsubscribe();
        } else {
            // TODO: btoa is temp solution , move to db
            room = new Room(`room_${btoa(master.name)}`, master, domain);
            this.rooms.push(room);
        }
    }

    /**
     * Removes master from room and starts a TTL subscription to destroy the room at TTL
     * @param master
     */
    public disconnectMaster(master: Master) {
        const roomIndex = _.findIndex(this.rooms, (room) => room.master.uuid == master.uuid);
        this.rooms[roomIndex].master = undefined;
        this.roomTTLSubs[this.rooms[roomIndex].uuid] = timer(this.ROOM_TTL)
            .subscribe(() => this.rooms.slice(roomIndex, 1));
    }

    public connectClient(client: Client, domain: string) {
        const room = this.getFirstFreeRoomByDomain(domain);
        room.addClient(client, domain);
    }

    public disconnectClient(client: Client) {
        const room = _.find(this.rooms, (room) => room.client.uuid === client.uuid);
        room.removeClient();
    }
}
