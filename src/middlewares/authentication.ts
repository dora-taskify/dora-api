import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authenticate(
    req: Request,
    res: Response,
    next: NextFunction) {
    try {
        const token = req.cookies.token
        if (!token) {
            throw Error("unauthorized")
        }

        const user = jwt.decode(token);

        (req as any).user = user
        next()

    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "register account errorr " + err.message
        });
    }
}