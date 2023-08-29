import { useEffect, useState } from "react";
import { UserData } from "../types/UserData";
import { socket } from "../socket";

const useSocketAuth = (): UserData | undefined => {
    const [currentAccount, setCurrentAccount] = useState<UserData | undefined>(undefined);

    const onAuthent = (response: UserData | undefined) => {
        setCurrentAccount(response);
        localStorage.setItem("account-data", JSON.stringify(response));
    };

    useEffect(() => {
        socket.on("auth-response", onAuthent);

        return () => {
            socket.off("auth-response", onAuthent);
        };
    }, []);

    return currentAccount;
};

export default useSocketAuth;
