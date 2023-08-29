import "./App.css";
import { FC, useState } from "react";
import ChatForm from "./components/ChatForm/ChatForm";
import NavBar from "./components/NavBar/NavBar";
import MessageList from "./components/MessageList/MessageList";
import LoginModal from "./components/LoginModal/LoginModal";
import StatusBar from "./components/StatusBar/Statusbar";
import useSocketConnection from "./hooks/useSocketConnection";
import useSocketMessages from "./hooks/useSocketMessages";

const App: FC = () => {
    const messages = useSocketMessages();
    const [isConnected, currentAccount] = useSocketConnection();
    const [accountModal, setAccountModal] = useState(false);

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
