import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import {
    mongoConnection,
    mongoDCListener,
    mongoErrorListener,
} from "./db/connection.db.js";
// import { NoteModel } from "./models/note.model.js";
// import { NoteRouter } from "./routes/note.router.js";
config();

const server = express();
server.use(cors());
server.use(json());

// DB Connection
await mongoConnection();
mongoErrorListener();
mongoDCListener();

// Model
// await NoteModel.create({
//     title: "Test Title",
//     text: "Test Text",
// });

// Routes
// server.use("/notes", NoteRouter);

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
