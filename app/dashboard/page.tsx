import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Titlebar from "@/components/common/titlebar";

export default async function Dashboard() {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/signin");
    }

    return(
        <div>
            <Titlebar showAccountInfo={true} />
            Success, you are looking at a protected web page!
        </div>
    )
}