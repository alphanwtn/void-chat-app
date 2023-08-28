import { FC } from "react";
import { UserData } from "../../types/UserData";

interface StatusBarProps {
    isConnected: boolean;
    currentAccount: UserData | undefined;
}

const StatusBar: FC<StatusBarProps> = ({ isConnected, currentAccount }) => (
    <div className="border- flex justify-center gap-4  bg-slate-200 text-slate-800">
        {isConnected ? <p>Connected : 🟢 </p> : <p> Connected : 🔴</p>}
        {currentAccount ? <p>Auth : 🟢 </p> : <p> Auth : 🔴</p>}
    </div>
);

export default StatusBar;
