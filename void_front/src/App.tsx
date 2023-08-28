import "./App.css";
import { FC, useEffect, useState } from "react";
import messagesDb from "./mocks/messagesDb";
import ChatForm from "./components/ChatForm/ChatForm";
import NavBar from "./components/NavBar/NavBar";
import MessageList from "./components/MessageList/MessageList";
import { MessageData } from "./types/MessageData";
import LoginModal from "./components/LoginModal/LoginModal";
import { UserData } from "./types/UserData";
import { socket } from "./socket";
import StatusBar from "./components/StatusBar/Statusbar";

const App: FC = () => {
    const [messages, setMessages] = useState<MessageData[]>(messagesDb);
    const [isConnected, setIsConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState<UserData | undefined>(
        undefined
    );
    const [accountModal, setAccountModal] = useState(false);

    const onConnect = () => {
        setIsConnected(true);
    };

    const onDisconnect = () => {
        setIsConnected(false);
        setCurrentAccount(undefined);
    };

    const onAuthent = (res: any) => {
        setCurrentAccount(res);
    };

    const onNewMessage = (newMessage: MessageData) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("auth-response", onAuthent);
        socket.on("message-to-client", onNewMessage);

        return () => {
            socket.off("connect");
            socket.off("disconnect", onDisconnect);
            socket.off("auth-response", onAuthent);
            socket.off("message-to-client", onNewMessage);
        };
    }, []);

    return (
        <div className="App flex h-screen w-screen flex-col justify-between font-cairo tracking-wide">
            <NavBar
                toggleAccountModal={() => setAccountModal(!accountModal)}
                currentAccount={currentAccount}
            />
            <MessageList currentAccount={currentAccount} messages={messages} />
            <StatusBar
                isConnected={isConnected}
                currentAccount={currentAccount}
            />
            <ChatForm currentAccount={currentAccount} />
            <LoginModal
                isOpen={accountModal}
                closeAccountModal={() => setAccountModal(false)}
                currentAccount={currentAccount}
            />
        </div>
    );
};

export default App;
