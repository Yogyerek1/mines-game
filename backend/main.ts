import express, { Express, Request, Response } from "express";
import { db } from "./database/db";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import { UpdateRequestBodyType } from "./types/types";

const port = 8000;
const app: Express = express();

app.use(cookieParser());
app.use(express.json());

app.post("/users/init", (req: Request, res: Response) => {
    let accountID = req.cookies.accountID;
    const setCookieAndRespond = (id: string) => {
        res.cookie("accountID", id, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        return res.json({ username_set: false });
    };

    if (!accountID) {
        accountID = uuidv4();
        db.execute(
            "INSERT INTO users (accountID) VALUES (?)",
            [accountID],
            (err) => {
                if (err) {
                    console.error("DB error:", err);
                    return res.status(500).json({ error: "DB error" });
                }
                setCookieAndRespond(accountID);
            }
        );
        return;
    }

    db.execute(
        "SELECT accountID FROM users WHERE accountID = ?",
        [accountID],
        (err, results: any) => {
            if (err) {
                console.error("DB error:", err);
                return res.status(500).json({ error: "DB error" });
            }
            if (!results || results.length === 0) {
                const newID = uuidv4();
                db.execute(
                    "INSERT INTO users (accountID) VALUES (?)",
                    [newID],
                    (err2) => {
                        if (err2) {
                            console.error("DB error:", err2);
                            return res.status(500).json({ error: "DB error" });
                        }
                        setCookieAndRespond(newID);
                    }
                );
            } else {
                setCookieAndRespond(accountID);
            }
        }
    );
});

app.post("/users/update", (req: Request, res: Response) => {
    const accountID = req.cookies.accountID;
    if (!accountID) {
        return res.json({ success: false, message: "Dont have account." });
    }

    const allowedFields = ["username", "score", "profileURL"];
    const updates: Record<string, any> = {};

    allowedFields.forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(req.body, field)) {
            const value = req.body[field];
            if (value !== undefined && value !== null && value !== "") {
                updates[field] = value;
            }
        }
    });

    if (Object.keys(updates).length === 0) {
        return res.json({ success: false, message: "No valid fields to update." });
    }

    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(", ");
    const values = Object.values(updates);

    db.execute(
        `UPDATE users SET ${setClause} WHERE accountID = ?`,
        [...values, accountID],
        (err: any) => {
            if (err) {
                console.error("DB error: ", err);
                return res.status(500).json({ success: false, error: "DB error" });
            }
            res.json({ success: true, updated: updates });
        }
    );
});

app.listen(port, () => {
    console.log(`App now listening on port ${port}.`);
});