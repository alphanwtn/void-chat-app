import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { FC, useContext, useState } from "react";
import { socket } from "../socket";
import { ConnectionContext, AuthContext } from "../contexts";

const ChatForm: FC = () => {
    const currentAccount = useContext(AuthContext);
    const isConnected = useContext(ConnectionContext);

    const [formMessage, setFormMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormMessage(e.target.value);
    };

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (formMessage && currentAccount) {
            socket.emit("message-to-serv", {
                id: uuidv4(),
                content: formMessage,
                author: currentAccount,
            });
            setFormMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <form className="bottom-0 flex h-24 w-screen gap-2 bg-white p-2" onSubmit={handleSubmit}>
            <input
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-1 text-base text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-red-500 focus:ring-2 focus:ring-red-200"
                value={formMessage}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={!currentAccount || !isConnected}
            />
            <button
                className="aria-hidden: rounded-lg border-0 bg-red-700 bg-opacity-90 px-3 text-lg text-zinc-100 disabled:bg-gray-500"
                type="submit"
                disabled={!currentAccount || !isConnected}
            >
                <AiOutlineSend />
            </button>
        </form>
    );
};

export default ChatForm;
