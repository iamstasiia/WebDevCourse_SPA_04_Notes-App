import { Router } from "express";
import {
    noteCreationController,
    noteDeleteController,
    notePrintController,
    noteMoveToTrashController,
    noteEditController,
} from "../controllers/note.controllers.js";

export const NoteRouter = Router();

NoteRouter.post("/notes", noteCreationController);
NoteRouter.get("/notes/:userId", notePrintController);
NoteRouter.delete("/notes/:id", noteDeleteController);
NoteRouter.patch("/notes/:id/moveToTrash", noteMoveToTrashController);
NoteRouter.put("/notes/:id", noteEditController);
