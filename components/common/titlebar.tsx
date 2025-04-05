import Divider from "@/components/ui/divider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {createClient} from "@/utils/supabase/server";
import Link from "next/link";
import {User} from "@supabase/auth-js";
import {signout} from "@/lib/auth/auth_actions";
import {UserType} from "@/lib/types";

export default async function Titlebar({showAccountInfo = false, showGoToDashboard = false}: {
    showAccountInfo: boolean,
    showGoToDashboard?: boolean
}) {

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.getUser();

    const { data: user } = await supabase.from("user").select("*").eq("auth_id", authData?.user?.id).single();

    if (!showAccountInfo) {
        return (
            <header className="bg-white h-12 border-b-1 border-zinc-400 flex flex-row">
                <div className="flex-grow font-bold text-3xl font-mono ml-4 mt-1 text-zinc-900">
                    Welcome to PlanSync
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white h-12 border-b-1 border-zinc-400 flex flex-row">
            <Link href="/" className="flex-grow font-bold text-3xl font-mono ml-4 mt-1 text-zinc-900 hover:cursor-pointer">
                Welcome to PlanSync
            </Link>
            {(authError || !authData?.user) ?
                <div className="flex flex-row">
                    <div className="flex-grow-0 flex-row flex duration-50 transition-all">
                        <Link href="/signin" className="underline m-0.5 px-5 hover:cursor-pointer hover:bg-zinc-100 flex items-center justify-center">
                            Login
                        </Link>
                        <Link href="/signup" className="bg-black m-0.5 text-white px-6 hover:cursor-pointer hover:bg-zinc-900 duration-50 transition-all flex items-center justify-center">
                            Sign Up
                        </Link>
                    </div>
                </div>
                :
                <div className="flex flex-row">
                    {showGoToDashboard && <Link className="bg-blue-400 m-1.5 pt-0.5 px-3 border-2 rounded-sm text-white font-bold hover:cursor-pointer hover:bg-blue-300" href="/dashboard" >Go to Dashboard</Link>}
                    <div className="text-zinc-900">
                        <FontAwesomeIcon className="w-6 h-6 text-zinc-400 hover:text-zinc-500 hover:cursor-pointer m-3" icon={faGear} />
                    </div>
                    <Divider type="horizontal" />
                    <AccountInfoButton authUser={authData.user} user={user} />
                </div>
            }

        </header>
    );
}

function AccountInfoButton({authUser, user}: { authUser: User, user: UserType | null }   ) {

    return(
        <div className="group">
            <Link href="/account">
                <div className="flex-grow-0 flex-row flex group hover:cursor-pointer group-hover:bg-zinc-200 p-2 pl-4 duration-50 transition-all">
                    <div className="bg-blue-300 rounded-full h-8 w-8 mr-2 flex justify-center items-center font-bold text-white p-0 group-hover:outline-3 duration-50 group-hover:outline-blue-400 transition-colors outline-white outline-offset-1">
                        {user ? user.first.charAt(0).toUpperCase() + user.last.charAt(0).toUpperCase() : "!"}
                    </div>
                    <div className="h-8 flex justify-center items-center font-bold text-zinc-800 group-hover:text-black pr-2">
                        &#9660;
                    </div>
                </div>
            </Link>
            <div className="hidden group-hover:block bg-zinc-100 absolute top-0 right-0 mt-12 border-1 border-t-0 border-zinc-400">
                <div className="flex flex-col p-2">
                    {
                        user ?
                        <div className="pb-4">
                            <p className="font-bold text-lg">{user.first} {user.last}</p>
                            <p className="text-zinc-700 -translate-y-2">{authUser.email}</p>
                        </div>
                        :
                        <div className="pb-4">
                            <p className="bg-red-300 border-red-700 rounded-md p-2 text-black text-xs m-0">Finish Setting up Your Account!</p>
                        </div>
                    }
                    <div className="flex flex-row gap-2">
                        <Link href="/account" className="w-fit border-2 border-black hover:bg-zinc-200 rounded-md text-black font-semibold pb-0.5 px-2 hover:cursor-pointer">Go to Account</Link>
                        <button className="w-fit bg-black hover:bg-zinc-900 rounded-md text-white font-semibold pb-0.5 px-2 hover:cursor-pointer" onClick={signout}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );

}