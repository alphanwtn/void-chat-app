import { FC } from "react";
import { UserData } from "../types/UserData";

export interface NotificationProps {
    account: UserData;
    notificationType: "connection" | "disconnection";
}

const Notification: FC<NotificationProps> = ({ account, notificationType }) => (
    <div className="mb-3">
        {notificationType === "connection" && (
            <p className="rounded-lg border bg-green-500 p-2 text-zinc-50 shadow">🎉 {account.pseudo} connected !</p>
        )}
        {notificationType === "disconnection" && (
            <p className="rounded-lg border bg-red-500 p-2 text-zinc-50 shadow">😭 {account.pseudo} left the chat !</p>
        )}
    </div>
);

export default Notification;
