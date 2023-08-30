import { useEffect, useState } from "react";
import { socket } from "../socket";
import { UserData } from "../types/UserData";

const useSocketOnlineUsers = (): UserData[] => {
    const [onlineUsers, setOnlineUsers] = useState<UserData[]>([]);

    const onUserUpdate = (updatedUsers: UserData[]) => {
        setOnlineUsers(updatedUsers);
    };

    useEffect(() => {
        socket.on("user-list-update", onUserUpdate);

        return () => {
            socket.off("user-list-update", onUserUpdate);
        };
    }, []);

    return onlineUsers;
};

export default useSocketOnlineUsers;
