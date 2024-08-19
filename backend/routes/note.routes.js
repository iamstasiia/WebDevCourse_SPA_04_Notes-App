import { Router } from "express";
import {
    noteCreationController,
    notePrintController,
} from "../controllers/note.controllers.js";

export const NoteRouter = Router();

NoteRouter.post("/notes", noteCreationController);
NoteRouter.get("/notes/:userId", notePrintController);
