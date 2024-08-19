import { UserModel } from "../models/user.model.js";

export const userRegisterController = async (req, res, next) => {
    try {
        await UserModel.create(req.body);

        res.status(200).json({
            code: 200,
            answer: "User registered successfully!",
        });
    } catch (error) {
        next(error);
    }
};

export const userLoginController = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email, password });

        if (user) {
            res.status(200).json({
                code: 200,
                answer: "User successfully found.",
                userId: user._id,
            });
        } else {
            res.status(404).json({
                code: 404,
                answer: "User not found.",
            });
        }
    } catch (error) {
        next(error);
    }
};
