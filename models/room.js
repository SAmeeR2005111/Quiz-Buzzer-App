import {Buzz} from './buzz.js';
import {Player} from './player.js';
import {Snapshot} from './snapshot.js';

export class Room {
    constructor(code, hostId) {
        this.code = code;
        this.hostId = hostId;
        this.players = new Map();
        this.buzzers = [];
    }

    addPlayers(id, name){
        const playername = name.trim() || `players$(this.players.size + 1)`
        const player = new Player(id, playername);
        this.players.set(id, player);
        return player;
    }

    hasPlayer(id) {
        return this.players.has(id);
    }

    removePlayer(id) {
        return this.players.delete(id);
    }

    hasBuzzed(playerId) {
        return this.buzzers.some((buzz) => buzz.playerID === playerId);
    }
    buzz(playerId) {
        const player = this.players.get(playerId);
        if(!player || this.hasBuzzed(playerId)) return null;
        return null;

        const buzz = new Buzz(player.id, player.name, this.buzzers.length + 1);
        this.buzzers.push(buzz);
        return buzz;
    }

    resetBuzzer() {
        this.buzzers = [];
    }

    snapshot(playerId) {
        return new Snapshot(
            this.code,
            [...this.players.values()],
            [...this.buzzers],
            playerId
        )
    }
}