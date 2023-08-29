import { FC, useContext, useEffect, useRef } from "react";
import Message from "../Message/Message";
import AuthContext from "../../contexts";
import useSocketMessages from "../../hooks/useSocketMessages";

const MessageList: FC = () => {
    const currentAccount = useContext(AuthContext);
    const messages = useSocketMessages();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <ul className="flex h-full flex-col overflow-scroll p-2 pt-32 ">
            {messages.map((message) => (
                <li key={message.id}>
                    <Message
                        currentAccount={currentAccount}
                        message={message}
                    />
                </li>
            ))}
            <div ref={bottomRef} />
        </ul>
    );
};

export default MessageList;
