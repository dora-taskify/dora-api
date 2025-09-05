import { NextFunction, Request, Response } from "express";
import { handleLoginAuth, handleRegisterAuth } from "@/services/auth";
import { loginSchema, registerSchema } from "@/utils/validation";

export async function registerAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password, username } = req.body
        const { error } = registerSchema.validate(req.body)
        if (error) {
            throw {
                code: 400,
                message: error.message
            }
        }
        const result = await handleRegisterAuth(email, password, username)
        const { data, registerErr } = result
        if (!data || registerErr) {
            throw {
                code: 400,
                message: registerErr?.message || "failed to register"
            }
        }
        res.cookie("token", data.session?.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "register account success",
            data: data.user
        })
    } catch (err: any) {
        next(err)
    }
}

export async function loginAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body
        const { error } = loginSchema.validate(req.body)
        if (error) {
            throw {
                code: 400,
                message: "wrong email or password"
            }
        }
        const result = await handleLoginAuth(email, password)
        const { data, loginErr } = result;
        if (!data || loginErr) {
            throw {
                code: 401,
                message: loginErr?.message || "invalid credentials"
            }
        }
        res.cookie("token", data.session?.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            code: 200,
            status: "success",
            message: "login account success",
            data: data.user
        });
    } catch (err: any) {
        next(err)
    }
}