import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { MessageData } from "../types/MessageData";

const useSocketMessages = (isConnected: boolean): MessageData[] => {
    const servUrl = import.meta.env.VITE_BACK_URL;
    const [messages, setMessages] = useState<MessageData[]>([]);

    const onNewMessage = (allDbMessages: MessageData[]) => {
        setMessages(allDbMessages);
    };

    useEffect(() => {
        axios.get(`${servUrl}/get-messages`).then((response) => {
            setMessages(response.data);
        });
    }, [isConnected]);

    useEffect(() => {
        socket.on("message-to-client", onNewMessage);

        return () => {
            socket.off("message-to-client", onNewMessage);
        };
    }, []);

    return messages;
};

export default useSocketMessages;
