import { FC, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts";
import { MessageData } from "../types/MessageData";
import Message from "./Message";

interface MessageListProps {
    messages: MessageData[];
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
    const currentAccount = useContext(AuthContext);

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <ul className="flex h-full flex-col overflow-y-scroll p-2 pt-32">
            {messages.map((message) => (
                <li key={message.id}>
                    <Message currentAccount={currentAccount} message={message} />
                </li>
            ))}
            <div ref={bottomRef} />
        </ul>
    );
};

export default MessageList;
