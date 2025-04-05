import Titlebar from "@/components/common/titlebar";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {createCompany} from "@/lib/company/company_actions";

export default async function NewCompanyPage() {

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        redirect("/signin");
    }

    const { data: user, error } = await supabase.from("user").select("*").eq("auth_id", authData.user.id).single();

    if (error || !user) {
        redirect("/account");
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={true}  />
            <main className="flex-grow flex flex-col items-center justify-center gap-2 bg-zinc-200">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold">Add Your Company</h1>
                    <p className="text-zinc-500">
                        Let&#39;s get your company created
                    </p>
                </div>
                <form className="border-1 p-6 space-y-2">
                    <div className="flex flex-col">
                        <label className="text-zinc-700" htmlFor="name">Company Name</label>
                        <input className="bg-white border-1 rounded-md p-1"
                               id="name"
                               name="name"
                               placeholder="Some Company"
                               required
                               type="text"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-zinc-700" htmlFor="disciplines">Disciplines (separate with commas)</label>
                        <input className="bg-white border-1 rounded-md p-1"
                               id="disciplines"
                               name="disciplines"
                               placeholder="Architecture, Engineering, Construction"
                               required
                               type="text"
                        />
                    </div>
                    <button formAction={createCompany} className="w-full bg-black rounded-md py-2 px-4 text-white mt-8 hover:cursor-pointer">Confirm</button>
                </form>
            </main>
        </div>
    )
}