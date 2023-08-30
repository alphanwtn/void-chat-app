import { FC } from "react";
import { UserData } from "../types/UserData";

interface OnlineUsersDialogProps {
    isOpen: boolean;
    onlineUsers: UserData[];
}

const OnlineUsersDialog: FC<OnlineUsersDialogProps> = ({ isOpen, onlineUsers }) => (
    <dialog open={isOpen} className=" top-1/2 rounded-lg border bg-white p-3 text-lg">
        <p className="mb-3">Online : </p>
        <ul>
            {onlineUsers?.map((user) => (
                <li key={user.id}>🟢 {user.pseudo}</li>
            ))}
        </ul>
    </dialog>
);

export default OnlineUsersDialog;
