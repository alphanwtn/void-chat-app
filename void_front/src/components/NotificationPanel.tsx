import { FC, useContext, useEffect, useState } from "react";
import Notification, { NotificationProps } from "./Notification";
import { UserData } from "../types/UserData";
import { socket } from "../socket";
import { AuthContext } from "../contexts";

const NotificationPanel: FC = () => {
    const currentAccount = useContext(AuthContext);
    const [notificationList, setNotificationList] = useState<NotificationProps[]>([]);

    const onConnectNotif = (response: UserData) => {
        if (currentAccount && currentAccount.id !== response.id) {
            setNotificationList((prev) => [...prev, { account: response, notificationType: "connection" }]);
        }
    };

    const onDisconnectNotif = (response: UserData) => {
        if (currentAccount && currentAccount.id !== response.id) {
            setNotificationList((prev) => [...prev, { account: response, notificationType: "disconnection" }]);
        }
    };

    useEffect(() => {
        socket.on("connect-notification", onConnectNotif);
        socket.on("disconnect-notification", onDisconnectNotif);

        return () => {
            socket.off("connect-notification", onConnectNotif);
            socket.off("disconnect-notification", onDisconnectNotif);
        };
    }, [currentAccount]);

    useEffect(() => {
        let timer: number;

        if (notificationList.length) {
            timer = setTimeout(() => setNotificationList([]), 5000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [notificationList]);

    return (
        <div className="fixed right-8 top-32">
            {notificationList.map((notif) => (
                <Notification {...notif} />
            ))}
        </div>
    );
};

export default NotificationPanel;
