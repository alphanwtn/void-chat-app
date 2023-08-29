import "./App.css";
import { FC } from "react";
import ChatForm from "./components/ChatForm/ChatForm";
import NavBar from "./components/NavBar/NavBar";
import MessageList from "./components/MessageList/MessageList";
import StatusBar from "./components/StatusBar/Statusbar";
import useSocketConnection from "./hooks/useSocketConnection";
import AuthContext from "./contexts";

const App: FC = () => {
    const [isConnected, currentAccount] = useSocketConnection();

    return (
        <AuthContext.Provider value={currentAccount}>
            <div className="App flex h-screen w-screen flex-col justify-between font-cairo tracking-wide">
                <NavBar />
                <MessageList />
                <StatusBar isConnected={isConnected} />
                <ChatForm />
            </div>
        </AuthContext.Provider>
    );
};

export default App;
