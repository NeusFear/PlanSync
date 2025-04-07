import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {addAccount} from "@/lib/account/account_actions";
import Titlebar from "@/components/common/Titlebar";

export default async function AccountPage() {

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
        redirect("/signin");
    }

    const { data: user, error } = await supabase.from("user").select("*").eq("auth_id", authData.user.id).single();

    if (error || !user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Titlebar showAccountInfo={true} navTitle="Account Info" />
                <main className="flex-grow flex flex-col items-center justify-center gap-2 bg-zinc-200">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold">Welcome</h1>
                        <p className="text-zinc-500">
                            Thanks for confirming your email. Now Let&apos;s finish setting up your account.
                        </p>
                        <p>User ID: {authData.user.id}</p>
                    </div>
                    <form className="border-1 p-6 space-y-2">
                        <div className="flex flex-col">
                            <label className="text-zinc-700" htmlFor="first">First Name</label>
                            <input className="bg-white border-1 rounded-md p-1"
                                   id="first"
                                   name="first"
                                   placeholder="John"
                                   required
                                   type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-zinc-700" htmlFor="last">Last Name</label>
                            <input className="bg-white border-1 rounded-md p-1"
                                   id="last"
                                   name="last"
                                   placeholder="Doe"
                                   required
                                   type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-zinc-700" htmlFor="email">Email</label>
                            <input className="bg-white border-1 rounded-md p-1 cursor-not-allowed"
                                   id="email"
                                   name="email"
                                   required
                                   value={authData.user.email}
                                   type="email"
                                   disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-zinc-700" htmlFor="phone">Phone</label>
                            <input className="bg-white border-1 rounded-md p-1"
                                   id="phone"
                                   name="phone"
                                   placeholder="1234567890"
                                   type="number"
                            />
                        </div>
                        <button formAction={addAccount} className="w-full bg-black rounded-md py-2 px-4 text-white mt-8 hover:cursor-pointer">Confirm</button>
                    </form>
                </main>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col min-h-screen">
                <Titlebar showAccountInfo={true} showGoToDashboard={true} navTitle="Account Info" />
                <main className="flex flex-col flex-grow bg-zinc-200">
                    {user.id}, {user.first}, {user.last}, {user.email}, {user.phone}, {user.created_at}
                </main>
            </div>
        )
    }
}