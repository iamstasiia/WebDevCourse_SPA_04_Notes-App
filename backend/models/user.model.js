import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// userSchema.pre("save", async function (next) {
//     try {
//         if (!this.isModified("password")) {
//             return next();
//         }
//         // const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, 10);
//         next();
//     } catch (error) {
//         return next(error);
//     }
// });

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

export const UserModel = model("User", userSchema, "users");
