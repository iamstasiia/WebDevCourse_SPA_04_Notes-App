import { Router } from "express";
import { noteCreationController } from "../controllers/note.controllers.js";

export const NoteRouter = Router();

NoteRouter.post("/notes", noteCreationController);
