import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signin } from "@/lib/auth/auth_actions";
import Titlebar from "@/components/common/Titlebar";

export default async function SignInPage() {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.getUser();

    if (error) {
        console.error(error);
    }

    if (data?.user) {
        redirect("/");
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={false} />
            <main className="flex-grow flex flex-col items-center justify-center gap-2 bg-zinc-200">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-zinc-500">
                        Enter your credentials below to login.
                    </p>
                </div>
                <form className="border-1 p-6 space-y-2">
                    <div className="flex flex-col">
                        <label className="text-zinc-700" htmlFor="email">Email</label>
                        <input className="bg-white border-1 rounded-md p-1"
                               id="email"
                               name="email"
                               placeholder="someone@example.com"
                               required
                               type="email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-zinc-700" htmlFor="password">Password</label>
                        <input className="bg-white border-1 rounded-md p-1" id="password" name="password" required type="password" />
                    </div>
                    <button formAction={signin} className="w-full bg-black rounded-md py-2 px-4 text-white mt-8 hover:cursor-pointer">Sign in</button>
                </form>
                <Link className="text-sm underline" href="/signup">
                    Don&apos;t have an account? Sign up here
                </Link>
            </main>
        </div>
    );
}