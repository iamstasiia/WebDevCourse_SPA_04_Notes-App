import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import {
    mongoConnection,
    mongoDCListener,
    mongoErrorListener,
} from "./db/connection.db.js";
import { UserRouter } from "./routes/user.routes.js";
import { NoteRouter } from "./routes/note.routes.js";
config();

const server = express();
server.use(cors());
server.use(json());

// DB Connection
await mongoConnection();
mongoErrorListener();
mongoDCListener();

// Routes
server.use("/", UserRouter);
server.use("/", NoteRouter);

// Error Middleware
server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        code: err.status || 500,
        answer: err.message,
    });
});

// 404-Handler
server.all("*", (req, res) => {
    res.status(404).json({
        code: 404,
        answer: "Page not found.",
    });
});

server.listen(process.env.PORT, () => {
    console.log("Server is running");
});
