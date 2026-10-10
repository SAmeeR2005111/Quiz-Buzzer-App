import {roomStore} from '../models/store.js';

export function ResetButton(io, socket) {
    socket.on("host:reset-buzzets", (ack) => {
        const code = socket.data.roomCode;
        const room = code ? roomStore.find(code) : undefined;

        if(!room || socket.data.role !== "host" || room.hostId !== socket.id) {
            ack({ok: false, error:"this connection already in the room"});
            return;
        }

        if(socket.data.roomCode){
            ack({ok: false, error:"connection already exists"});
            return;
        }

        const snapshot = room.snapshot();
        ack({ok: true, data: snapshot});
        io.to(room.code).emit("room:state", snapshot);
    })
}