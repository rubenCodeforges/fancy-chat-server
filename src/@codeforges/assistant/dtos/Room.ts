import {Client, Master} from "./Users";

export class Room {
    id: number;
    uuid: string;
    name: string;
    isOccupied: boolean;
    master: Master;
    client: Client;
    domain: string;

    constructor(name: string, master: Master, domain: string) {
        this.name = name;
        this.addMaster(master, domain);
        this.uuid = btoa(this.name);
    }

    addMaster(master: Master, domain: string) {
        this.master = master;
        this.domain = domain;
    }

    addClient(client: Client, domain: string) {
        this.checkSameDomain(domain);
        this.client = client;
        this.isOccupied = true;
    }

    removeClient() {
        this.client = undefined;
        this.isOccupied = false;
    }

    checkSameDomain(domain: string) {
        if (domain !== this.domain) {
            throw new Error(`Domain ${domain} is not part of ${this.domain}`);
        }
    }
}
