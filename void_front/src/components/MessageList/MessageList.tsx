import { FC, useEffect, useRef } from "react";
import { MessageData } from "../../types/MessageData";
import Message from "../Message/Message";
import { UserData } from "../../types/UserData";

interface MessageListProps {
    currentAccount: UserData | undefined;
    messages: MessageData[];
}

const MessageList: FC<MessageListProps> = ({ currentAccount, messages }) => {
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
