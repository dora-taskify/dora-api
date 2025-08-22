import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function handleRegisterAuth(email: string, password: string, username: string) {
    const { data, error: registerErr } = await supabase.auth.signUp({
        email,
        password,
    })

    const profile = await prisma.profile.create({
        data: {
            email,
            username,
        }
    })

    return { data, registerErr, profile }
}

export async function handleLoginAuth(email: string, password: string) {
    const { data, error: loginErr } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    return { data, loginErr }
}