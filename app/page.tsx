import Titlebar from "@/components/common/Titlebar";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={true} showGoToDashboard={true} />
            <main className="flex-grow bg-zinc-200">
                Todo
            </main>
            <footer className="bg-black text-white">
                footer todo
            </footer>
        </div>
    );
}
