import Titlebar from "@/components/common/titlebar";

export default async function CompanyDashboardPage({params}: {params: Promise<{ company: string }>}) {

    const { company } = await params;

    return(
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={true} />
            <main className="flex-grow bg-zinc-200">
                {company}
            </main>
        </div>
    )
}