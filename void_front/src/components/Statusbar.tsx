import { FC, useContext } from "react";
import { ConnectionContext, AuthContext } from "../contexts";

const StatusBar: FC = () => {
    const isConnected = useContext(ConnectionContext);
    const currentAccount = useContext(AuthContext);

    return (
        <div className="border- flex justify-center gap-4  bg-slate-200 text-slate-800">
            {isConnected ? <p>Connected : 🟢 </p> : <p> Connected : 🔴</p>}
            {currentAccount && isConnected && <p>Authenticated : 🟢 </p>}
            {currentAccount && !isConnected && <p>Authenticated : 🟠 </p>}
            {!currentAccount && <p>Authenticated : 🔴 </p>}
        </div>
    );
};

export default StatusBar;
