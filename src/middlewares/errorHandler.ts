import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const code = Number(err.code) || 500;
    const message = err.message || "Internal Server Error";

    res.status(code).json({
        code: code,
        status: "error",
        message,
    });
}