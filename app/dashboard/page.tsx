import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";
import {CompanyType} from "@/lib/types";
import Titlebar from "@/components/common/Titlebar";

export default async function Dashboard() {

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        redirect("/signin");
    }

    const { data: user, error } = await supabase.from("user").select("*").eq("auth_id", authData.user.id).single();

    if (error || !user) {
        redirect("/account");
    }

    const { data: internalUsers } = await supabase.from("internal_user").select("*, company(*)").eq("user", user.id);

    return(
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={true} navTitle="Dashboard" />
            <main className="flex-grow bg-zinc-200 px-60">
                <div className="flex flex-row w-full h-10 gap-4 my-3">
                    <div className="bg-white rounded-md border-1 border-zinc-300 flex-grow h-full text-zinc-600 pt-1.5 pl-6">Search Companies...</div>
                    <Link href="/dashboard/new-company" className="bg-black hover:bg-zinc-900 rounded-md text-white px-4 h-full hover:cursor-pointer flex items-center justify-center">Add New...</Link>
                </div>
                <div className="flex flex-col gap-2">
                    {internalUsers?.map((internalUser) => (
                        internalUser.company && <CompanyCard key={internalUser.company.id} company={internalUser.company as CompanyType} />
                    ))}
                </div>
            </main>
        </div>
    )
}

function CompanyCard({company}: {company: CompanyType}) {
    return (
        <Link href={"/dashboard/" + company.id} className="flex flex-row bg-white p-2 rounded-sm shadow gap-2 hover:bg-zinc-50 hover:cursor-pointer">
            <div className="bg-yellow-500 h-12 w-12 flex items-center justify-center font-bold text-white">
                {company.name.split(" ").map(value => value.charAt(0).toUpperCase()).join("")}
            </div>
            <div>
                <h1 className="text-lg font-semibold">{company.name}</h1>
                <p className="text-zinc-600 text-sm -translate-y-1">Company ID: {company.id}</p>
            </div>
            <div className="ml-10 pt-3">
                Add some other info here sometime
            </div>
        </Link>
    )
}