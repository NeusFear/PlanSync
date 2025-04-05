import Titlebar from "@/components/common/titlebar";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function ConfirmPage() {

    const supabase = await createClient();
    const { error, data } = await supabase.auth.getUser();

    if (error) {
        console.error(error);
    }

    if (data?.user?.confirmed_at) {
        redirect("/signin");
    }

    return(
        <div className="flex flex-col h-screen">
            <Titlebar showAccountInfo={false} />
            <main className="h-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Please Confirm Your Email</h1>
                <p>An confirmation link has been sent to your email, click on that link to proceed. {data.user?.email}</p>
                <Link href={"/signin"} className="bg-black rounded-md px-4 text-white p-1 mt-6">Refresh</Link>
            </main>
        </div>
    );
}