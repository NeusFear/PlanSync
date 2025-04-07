import { createClient } from "@/utils/supabase/server";
import { CompanyType } from "@/lib/types";
import TitlebarUI from "@/components/common/TitlebarUI"; // Import the client component

export default async function Titlebar({showAccountInfo = false, showGoToDashboard = false, company, navTitle}: {
    showAccountInfo: boolean,
    showGoToDashboard?: boolean,
    company?: CompanyType,
    navTitle?: string,
}) {
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        return null; // Or render something like a loading state or redirect
    }

    const { data: user } = await supabase.from("user").select("*").eq("auth_id", authData?.user?.id).single();

    // Now pass the necessary data to the client component
    return <TitlebarUI
        showAccountInfo={showAccountInfo}
        company={company}
        navTitle={navTitle}
        authData={authData}
        user={user}
        showGoToDashboard={showGoToDashboard}
    />;
}