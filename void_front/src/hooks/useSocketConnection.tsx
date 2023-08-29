import { useEffect, useState } from "react";
import { socket } from "../socket";

const useSocketConnection = (): boolean => {
    const [isConnected, setIsConnected] = useState(false);

    const onConnect = () => {
        const accountDataRaw = localStorage.getItem("account-data");

        if (accountDataRaw) {
            socket.emit("auth-request", JSON.parse(accountDataRaw));
        }

        setIsConnected(true);
    };

    const onDisconnect = () => {
        setIsConnected(false);
    };

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return isConnected;
};

export default useSocketConnection;
