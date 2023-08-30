import "./App.css";
import { FC } from "react";
import ChatForm from "./components/ChatForm";
import NavBar from "./components/NavBar";
import MessageList from "./components/MessageList";
import StatusBar from "./components/Statusbar";
import useSocketAuth from "./hooks/useSocketAuth";
import useSocketConnection from "./hooks/useSocketConnection";
import { AuthContext, ConnectionContext } from "./contexts";
import useSocketMessages from "./hooks/useSocketMessages";

const App: FC = () => {
    const isConnected = useSocketConnection();
    const currentAccount = useSocketAuth();
    const messages = useSocketMessages(isConnected);

    return (
        <ConnectionContext.Provider value={isConnected}>
            <AuthContext.Provider value={currentAccount}>
                <div className="App flex h-screen w-screen flex-col justify-between font-cairo tracking-wide">
                    <NavBar />
                    <MessageList messages={messages} />
                    <StatusBar />
                    <ChatForm />
                </div>
            </AuthContext.Provider>
        </ConnectionContext.Provider>
    );
};

export default App;
