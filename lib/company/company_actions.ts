"use server"

import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {CompanyType, UserType} from "@/lib/types";

export async function createCompany(formData: FormData) {

    const supabase = await createClient();

    const { data: authData } = await supabase.auth.getUser();

    const { data: user } = await supabase.from("user").select("*").eq("auth_id", authData.user?.id).single<UserType>();

    const { data: insertedCompany, error: companyError } = await supabase.from("company").insert([
        {
            primary_contact: user?.id,
            name: formData.get("name") as string,
            disciplines: formData.get("disciplines")?.toString().split(",").map(value => value.trim()),
        }
    ]).select().single<CompanyType>();

    if (companyError) {
        throw new Error(companyError.message);
    }

    const { error: internalUserError } = await supabase.from("internal_user").insert([
        {
            title: "Owner",
            company: insertedCompany?.id,
            user: user?.id,
        }
    ])

    if (internalUserError) {
        throw new Error(internalUserError.message);
    }

    revalidatePath("/");
    redirect("/dashboard/" + insertedCompany?.id as string);

}