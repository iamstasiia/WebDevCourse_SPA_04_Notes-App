import mongoose from "mongoose";

export async function mongoConnection() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            dbName: "notes-app",
        });
        console.log("Connection to MongoDB is successful");
    } catch (error) {
        console.log(error);
    }
}

export function mongoErrorListener() {
    mongoose.connection.on("error", (err) => {
        console.log(err);
    });
}

export function mongoDCListener() {
    mongoose.connection.on("disconnected", (err) => {
        console.log(err);
    });
}
