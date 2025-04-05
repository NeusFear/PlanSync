import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Titlebar from "@/components/common/titlebar";
import Link from "next/link";

export default async function Dashboard() {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/signin");
    }

    return(
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={true} />
            <main className="flex-grow bg-zinc-200 px-60">
                <div className="flex flex-row w-full h-10 gap-4 my-3">
                    <div className="bg-white rounded-md border-1 border-zinc-300 flex-grow h-full text-zinc-600 pt-1.5 pl-6">Search Companies...</div>
                    <button className="bg-black rounded-md text-white px-4 h-full">Add New...</button>
                </div>
                <div className="flex flex-col">
                    <CompanyCard company="Larson Design Group" />
                </div>
            </main>
        </div>
    )
}

function CompanyCard({company}: {company: string}) {
    return (
        <Link href="/dashboard/larson-design-group" className="flex flex-row bg-white p-2 rounded-sm shadow gap-2 hover:bg-zinc-50 hover:cursor-pointer">
            <div className="bg-yellow-500 h-12 w-12 flex items-center justify-center font-bold text-white">
                LDG
            </div>
            <div>
                <h1 className="text-lg font-semibold">{company}</h1>
                <p className="text-zinc-700 text-sm">ldg#108432</p>
            </div>
            <div className="ml-10 pt-3">
                Add some other info here sometime
            </div>
        </Link>
    )
}