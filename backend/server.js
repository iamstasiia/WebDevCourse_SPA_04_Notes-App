import express from "express";

const server = express();
const port = process.env.PORT || 3000;

server.get("/", (req, res) => {
    res.send("Hallo Welt");
});

server.listen(port, () => {
    console.log(`Up at: http://localhost:${port}`);
});
