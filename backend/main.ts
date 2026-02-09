import express, { Express, Request, Response } from "express";
import { db } from "./database/db";
const port = 8000;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`App now listening on port ${port}.`);
});