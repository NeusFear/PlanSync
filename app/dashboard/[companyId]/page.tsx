import Titlebar from "@/components/common/titlebar";
import {createClient} from "@/utils/supabase/server";
import {CompanyType} from "@/lib/types";

export default async function CompanyDashboardPage({params}: {params: { companyId: string }}) {

    const supabase = await createClient();

    const { companyId } = await params;

    const { data: company, error } = await supabase.from("company").select("*").eq("id", companyId).single<CompanyType>();

    if (error || !company) {
        throw new Error(error?.message)
    }

    return(
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={true} company={company} />
            <main className="flex-grow bg-zinc-200">
                {company.id} {company.name} {company.disciplines} {company.primary_contact}
            </main>
        </div>
    )
}