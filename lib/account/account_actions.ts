"use server"

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

export async function addAccount(formData: FormData) {

    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    const { error } = await supabase.from("user").insert([
        {
            first: formData.get("first") as string,
            last: formData.get("last") as string,
            email: data.user?.email,
            phone: formData.get("phone") as string,
            auth_id: data.user?.id,
        }
    ]).select();

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath("/");

}