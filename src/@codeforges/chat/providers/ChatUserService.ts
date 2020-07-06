import {Injectable} from "@nestjs/common";
import {ConnectedUser} from "../dtos/ConnectedUser";
import * as _ from "lodash";

@Injectable()
export class ChatUserService {
    private users: { [clientId: string]: string } = {};

    addUser(connectedUser: ConnectedUser): ConnectedUser {
        //TODO: condition if user is connected ?
        this.users[connectedUser.clientId] = connectedUser.userName;
        return connectedUser;
    }

    getOne(clientId: string): ConnectedUser {
        return this.users ? {clientId, userName: this.users[clientId]} : null;
    }

    getAll(): ConnectedUser[] {
        return _.map(this.users, (value, key) => {
            return {
                clientId: key,
                userName: value,
            }
        })
    }

    delete(clientId: string): void {
        this.users = _.omitBy(this.users, (value, key) => key === clientId);
    }
}