import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import {CreateRoom} from './controllers/createroom.js';
import {ResetButton} from './controllers/resetbutton.js';
import {CloseHostRoom} from './controllers/closeroom.js';

dotenv.config();

const port = process.env.PORT || 3000;
const allowedOrigins = process.env.CORS_ORIGIN || "http://localhost:5173";

const app = express();
app.use(helmet());
app.use(cors({origin: allowedOrigins}));

app.get("/ping", (req, res) => {
    res.status(200).json({ok: "ping"})
});

const start = async () => {
    try {
        const httpServer = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        const io = new Server(httpServer, { cors: { origin: allowedOrigins } });

        io.on("connection", (socket) => {
            CreateRoom(io, socket);
            ResetButton(io, socket);
            socket.on("disconnect", () => {
                CloseHostRoom(io, socket);
            });
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

start();