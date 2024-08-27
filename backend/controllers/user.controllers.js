import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

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
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                code: 404,
                answer: "User not found.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                code: 401,
                answer: "Invalid password.",
            });
        }

        res.status(200).json({
            code: 200,
            answer: "User successfully found.",
            userId: user._id,
            username: user.username,
        });
    } catch (error) {
        next(error);
    }
};
