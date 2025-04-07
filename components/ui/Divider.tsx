type DividerTypes = "vertical" | "horizontal";

export default function Divider({type}: {type: DividerTypes}) {

    if (type === "horizontal") {
        return(
            <div className="w-0 border-l-1 border-zinc-400 h-full"></div>
        );
    }

    if (type === "vertical") {
        return(
            <div className="h-0 border-t-1 border-zinc-400 w-full"></div>
        );
    }
}