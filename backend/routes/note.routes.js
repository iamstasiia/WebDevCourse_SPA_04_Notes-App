import { Router } from "express";
import {
    noteCreationController,
    noteDeleteController,
    notePrintController,
    noteMoveToTrashController,
    noteEditController,
} from "../controllers/note.controllers.js";
import {
    noteInTrashPrintController,
    noteRestoreController,
} from "../controllers/trash.controller.js";

export const NoteRouter = Router();

// NOTES
NoteRouter.post("/notes", noteCreationController);
NoteRouter.get("/notes/:userId", notePrintController);
NoteRouter.delete("/notes/:id", noteDeleteController);
NoteRouter.patch("/notes/:id/moveToTrash", noteMoveToTrashController);
NoteRouter.put("/notes/:id", noteEditController);

// TRASH
NoteRouter.get("/notes/trash/:userId", noteInTrashPrintController);
NoteRouter.patch("/notes/:noteId/restore", noteRestoreController);
