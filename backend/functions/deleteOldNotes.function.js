import { NoteModel } from "../models/note.model.js";

const deleteOldTrashedNotes = async () => {
    const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    try {
        await NoteModel.deleteMany({
            isInTrash: true,
            movedToTrashAt: { $lte: THIRTY_DAYS_AGO },
        });

        console.log("Old trashed notes deleted successfully");
    } catch (error) {
        console.error("Error deleting old trashed notes:", error);
    }
};

setInterval(deleteOldTrashedNotes, 24 * 60 * 60 * 1000);
