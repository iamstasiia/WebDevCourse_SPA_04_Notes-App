import { NoteModel } from "../models/note.model.js";

export const noteCreationController = async (req, res, next) => {
    try {
        await NoteModel.create(req.body);

        res.status(201).json({
            code: 201,
            answer: "The note was created successfully!",
        });
    } catch (error) {
        next(error);
    }
};

export const notePrintController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const notes = await NoteModel.find({ userId, isInTrash: false });

        res.status(200).json({
            code: 200,
            answer: notes,
        });
    } catch (error) {
        next(error);
    }
};

export const noteDeleteController = async (req, res, next) => {
    const { id } = req.params;
    try {
        await NoteModel.findByIdAndDelete(id);

        res.status(200).json({
            code: 200,
            answer: "Note deleted successfully!",
        });
    } catch (error) {
        next(error);
    }
};

export const noteMoveToTrashController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const note = await NoteModel.findById(id);
        if (note) {
            note.isInTrash = true;
            note.movedToTrashAt = new Date();
            await note.save();

            res.status(200).json({
                code: 200,
                answer: "Note moved to Trash successfully!",
            });
        } else {
            res.status(404).json({
                code: 404,
                answer: "Note not found.",
            });
        }
    } catch (error) {
        next(error);
    }
};

// export const userLoginController = async (req, res, next) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email, password });

//         if (user) {
//             res.status(200).json({
//                 code: 200,
//                 answer: "User successfully found.",
//                 userId: user._id,
//             });
//         } else {
//             res.status(404).json({
//                 code: 404,
//                 answer: "User not found.",
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// };
