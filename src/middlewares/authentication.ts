import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                code: 401,
                status: "error",
                message: "Unauthorized: No token provided"
            });
        }

        const secret = process.env.SUPABASE_JWT_SECRET as string;
        const decoded = jwt.verify(token, secret) as JwtPayload;

        (req as any).user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (err: any) {
        return res.status(401).json({
            code: 401,
            status: "error",
            message: "Unauthorized: " + err.message
        });
    }
}
