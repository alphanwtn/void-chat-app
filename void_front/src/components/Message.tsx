import { FC } from "react";
import { MessageData } from "../types/MessageData";
import { UserData } from "../types/UserData";

interface MessageProps {
    message: MessageData;
    currentAccount: UserData | undefined;
}

const Message: FC<MessageProps> = ({ message, currentAccount }) => {
    const messageSide = message.author.id === currentAccount?.id ? "sender" : "receiver";

    const handleSideClass =
        messageSide === "sender" ? "message-sender self-end bg-red-700" : "message-receiver self-start bg-zinc-600";

    return (
        <div className="mb-3 flex flex-col">
            {messageSide === "receiver" && (
                <p className="text-sm text-slate-800">
                    <span>{message.author.pseudo} </span>
                    <span className="text-slate-500">[{message.author.id.slice(0, 4)}]</span>
                </p>
            )}
            <p className={`${handleSideClass} max-w-[75%] rounded-lg border bg-opacity-90 p-2 text-zinc-100 shadow`}>
                {message.content}
            </p>
        </div>
    );
};

export default Message;
