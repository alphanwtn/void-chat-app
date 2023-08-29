import { useEffect, useState } from "react";
import { socket } from "../socket";
import { MessageData } from "../types/MessageData";
import messagesDb from "../mocks/messagesDb";

const useSocketMessages = (): MessageData[] => {
    const [messages, setMessages] = useState<MessageData[]>(messagesDb);

    const onNewMessage = (newMessage: MessageData) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    useEffect(() => {
        socket.on("message-to-client", onNewMessage);

        return () => {
            socket.off("message-to-client", onNewMessage);
        };
    }, []);

    return messages;
};

export default useSocketMessages;
