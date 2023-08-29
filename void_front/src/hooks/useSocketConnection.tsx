import { useEffect, useState } from "react";
import { UserData } from "../types/UserData";
import { socket } from "../socket";

const useSocketConnection = (): [boolean, UserData | undefined] => {
    const [isConnected, setIsConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState<UserData | undefined>(
        undefined
    );

    const onConnect = () => {
        const accountDataRaw = localStorage.getItem("account-data");

        if (accountDataRaw) {
            socket.emit("auth-request", JSON.parse(accountDataRaw));
        }

        setIsConnected(true);
    };

    const onDisconnect = () => {
        setIsConnected(false);
        setCurrentAccount(undefined);
    };

    const onAuthent = (response: UserData | undefined) => {
        setCurrentAccount(response);
        localStorage.setItem("account-data", JSON.stringify(response));
    };

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("auth-response", onAuthent);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("auth-response", onAuthent);
        };
    }, []);

    return [isConnected, currentAccount];
};

export default useSocketConnection;
