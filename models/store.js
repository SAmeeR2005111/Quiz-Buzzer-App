import {customAlphabet} from 'nanoid';
import {Room} from './room.js';

const CreateRoomCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

class RoomStore {
    constructor() {
        this.rooms = new Map();
    }


    create(hostId) {
        let code = CreateRoomCode();

        const room = new Room(code, hostId);
        this.rooms.set(code, room);
        return room;
    }

    join(code, playerId, name){
        const room = this.rooms.get(code);
        if(!room) return null;

        room.addPlayers(playerId, name);
        return room.snapshot();
    }

    removePlayer(code, playerId){
        const room = this.rooms.get(code);
        if(!room) return null;

        return room.snapshot();
    }

    find(code){
        return this.rooms.get(code);
    }

    close(code){
        return this.rooms.delete(code);
    }
}

export const roomStore = new RoomStore();