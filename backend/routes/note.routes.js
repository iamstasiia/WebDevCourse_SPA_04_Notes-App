import { Router } from "express";
import {
    noteCreationController,
    noteDeleteController,
    notePrintController,
} from "../controllers/note.controllers.js";

export const NoteRouter = Router();

NoteRouter.post("/notes", noteCreationController);
NoteRouter.get("/notes/:userId", notePrintController);
NoteRouter.delete("/notes/:id", noteDeleteController);
