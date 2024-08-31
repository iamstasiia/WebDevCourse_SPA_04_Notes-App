import { NoteModel } from "../models/note.model.js";

export const noteInTrashPrintController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const trashedNotes = await NoteModel.find({ userId, isInTrash: true });

        res.status(200).json({
            code: 200,
            answer: trashedNotes,
        });
    } catch (error) {
        next(error);
    }
};

export const noteRestoreController = async (req, res, next) => {
    const { noteId } = req.params;
    try {
        const note = await NoteModel.findByIdAndUpdate(
            noteId,
            { isInTrash: false, movedToTrashAt: null },
            { new: true },
        );
        res.status(200).json({
            code: 200,
            answer: note,
        });
    } catch (error) {
        next(error);
    }
};
