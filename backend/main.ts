import express, { Express, Request, Response } from "express";
import { db } from "./database/db";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
const port = 8000;

const app: Express = express();

app.use(cookieParser());
app.use(express.json());

app.post("/users/init", (req: Request, res: Response) => {
    let accountID = req.cookies.accountID;
    if (!accountID) {
        accountID = uuidv4();
        res.cookie("accountID", accountID, { httpOnly: true, sameSite: "lax"})
        return res.json({ accountID, username_set: false });
    }
    res.json({ accountID, username_set: false });
});

app.listen(port, () => {
    console.log(`App now listening on port ${port}.`);
});