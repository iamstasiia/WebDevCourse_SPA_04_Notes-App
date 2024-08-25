import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    isInTrash: {
        type: Boolean,
        default: false,
    },
    movedToTrashAt: {
        type: Date,
    },
});

export const NoteModel = model("Note", noteSchema, "notes");
