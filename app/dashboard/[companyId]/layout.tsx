import {createClient} from "@/utils/supabase/server";
import {CompanyType} from "@/lib/types";
import Divider from "@/components/ui/Divider";
import Titlebar from "@/components/common/Titlebar";
import {DashboardNavigation} from "@/components/dashboard/navigation/DashboardNavigation";

export default async function DashboardLayout({
    children, params
}: {
    children: React.ReactNode
    params: { companyId: string }
}) {

    const supabase = await createClient();

    const { companyId } = await params;

    const { data: company, error } = await supabase.from("company").select("*").eq("id", companyId).single<CompanyType>();

    if (error || !company) {
        throw new Error(error?.message)
    }

    return(
        <section className="flex flex-col h-screen w-full">
            <Titlebar showAccountInfo={true} company={company} />
            <main className="flex-grow bg-zinc-200 h-full w-full">
                <div className="flex flex-row h-full w-full">
                    <DashboardNavigation company={company} />
                    <Divider type="horizontal" />
                    <div className="bg-zinc-100 flex-grow">
                        {children}
                    </div>
                </div>
            </main>
        </section>
    )
}