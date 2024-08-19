import { NoteModel } from "../models/note.model.js";

export const noteCreationController = async (req, res, next) => {
    try {
        await NoteModel.create(req.body);

        res.status(200).json({
            code: 200,
            answer: "The note was created successfully!",
        });
    } catch (error) {
        next(error);
    }
};

export const notePrintController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const notes = await NoteModel.find({ userId });

        res.status(200).json({
            code: 200,
            answer: notes,
        });
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
