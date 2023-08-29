import { FC, useContext } from "react";
import AuthContext from "../../contexts";

interface StatusBarProps {
    isConnected: boolean;
}

const StatusBar: FC<StatusBarProps> = ({ isConnected }) => {
    const currentAccount = useContext(AuthContext);

    return (
        <div className="border- flex justify-center gap-4  bg-slate-200 text-slate-800">
            {isConnected ? <p>Connected : 🟢 </p> : <p> Connected : 🔴</p>}
            {currentAccount ? <p>Auth : 🟢 </p> : <p> Auth : 🔴</p>}
        </div>
    );
};

export default StatusBar;
