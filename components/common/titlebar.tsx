import Divider from "@/components/ui/divider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {createClient} from "@/utils/supabase/server";
import Link from "next/link";
import {User} from "@supabase/auth-js";
import {signout} from "@/lib/auth/auth_actions";

export default async function Titlebar({showAccountInfo}: {showAccountInfo: boolean}) {

    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (!showAccountInfo) {
        return (
            <header className="bg-white h-12 border-b-1 border-stone-400 flex flex-row">
                <div className="flex-grow font-bold text-3xl font-mono ml-4 mt-1 text-stone-900">
                    Welcome to PlanSync
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white h-12 border-b-1 border-stone-400 flex flex-row">
            <div className="flex-grow font-bold text-3xl font-mono ml-4 mt-1 text-stone-900">
                Welcome to PlanSync
            </div>
            {(error || !data?.user) ?
                <div className="flex flex-row">
                    <div className="flex-grow-0 flex-row flex duration-50 transition-all">
                        <Link href="/signin" className="underline m-0.5 px-5 hover:cursor-pointer hover:bg-stone-100 flex items-center justify-center">
                            Login
                        </Link>
                        <Link href="/signup" className="bg-black m-0.5 text-white px-6 hover:cursor-pointer hover:bg-stone-900 duration-50 transition-all flex items-center justify-center">
                            Sign Up
                        </Link>
                    </div>
                </div>
                :
                <div className="flex flex-row">
                    <div className="text-stone-900">
                        <FontAwesomeIcon className="w-6 h-6 text-stone-400 hover:text-stone-500 hover:cursor-pointer m-3" icon={faGear} />
                    </div>
                    <Divider type="horizontal" />
                    <AccountInfoButton user={data.user} />
                </div>
            }

        </header>
    );
}

function AccountInfoButton({user}: { user: User }   ) {

    return(
        <div className="group">
            <div>
                <div className="flex-grow-0 flex-row flex group hover:cursor-pointer group-hover:bg-stone-200 p-2 pl-4 duration-50 transition-all">
                    <div className="bg-blue-300 rounded-full h-8 w-8 mr-2 flex justify-center items-center font-bold text-white p-0 group-hover:outline-3 duration-50 group-hover:outline-blue-400 transition-colors outline-white outline-offset-1">
                        BD
                    </div>
                    <div className="h-8 flex justify-center items-center font-bold text-stone-800 group-hover:text-black pr-2">
                        &#9660;
                    </div>
                </div>
            </div>
            <div className="hidden group-hover:block bg-stone-100 absolute top-0 right-0 mt-12 border-1 border-t-0 border-stone-400">
                <div className="flex flex-col p-2">
                    <div className="pb-4">
                        <p className="text-stone-500 text-xs m-0">Email</p>
                        <p className="text-black">{user.email}</p>
                    </div>
                    <button className="w-fit bg-black hover:bg-stone-900 rounded-md text-white font-semibold pb-0.5 px-2 hover:cursor-pointer" onClick={signout}>Sign Out</button>
                </div>
            </div>
        </div>
    );

}