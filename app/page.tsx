import Titlebar from "@/components/common/titlebar";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Titlebar showAccountInfo={true} />
            <main className="flex-grow">
                Todo
            </main>
            <footer className="bg-black text-white">
                footer todo
            </footer>
        </div>
    );
}
