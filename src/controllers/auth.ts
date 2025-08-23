import { Request, Response } from "express";
import { handleLoginAuth, handleRegisterAuth } from "@/services/auth";
import { loginSchema, registerSchema } from "@/utils/validation";

export async function registerAuth(req: Request, res: Response) {
    try {
        const { email, password, username } = req.body;
        const { error } = registerSchema.validate(req.body);
        if (error) {
            throw Error(error.message)
        }
        const result = await handleRegisterAuth(email, password, username);
        const { data, registerErr, profile } = result;
        if (!data || registerErr) {
            throw Error(registerErr?.message)
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
        });
    } catch (err: any) {
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "register account errorr " + err.message
        });
    }
}

export async function loginAuth(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const { error } = loginSchema.validate(req.body)
        if (error) {
            throw Error(error.message)
        }
        const result = await handleLoginAuth(email, password)
        const { data, loginErr } = result;
        if (!data || loginErr) {
            throw Error(loginErr?.message)
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
        return res.status(500).json({
            code: 500,
            status: "error",
            message: "login account error " + err.message
        });
    }
}