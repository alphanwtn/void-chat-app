import { FC, useContext, useState } from "react";
import { CgProfile, CgUserList } from "react-icons/cg";
import { AuthContext, ConnectionContext } from "../contexts";
import LoginModal from "./LoginModal";
import ConnectedPeopleDialog from "./ConnectedPeopleDialog";

const NavBar: FC = () => {
    const isConnected = useContext(ConnectionContext);
    const currentAccount = useContext(AuthContext);

    const [accountModal, setAccountModal] = useState(false);
    const [connectedPeopleDialog, setConnectedPeopleDialog] = useState(false);

    const toggleAccountModal = () => {
        setAccountModal(!accountModal);
        setConnectedPeopleDialog(false);
    };
    const toggleConnectedPeopleDialog = () => {
        setConnectedPeopleDialog(!connectedPeopleDialog);
        setAccountModal(false);
    };

    return (
        <>
            <header className="body-font fixed flex w-screen flex-col text-gray-600">
                <div className="grid grid-cols-4 items-center justify-between border-y bg-white bg-opacity-90 p-5 backdrop-blur ">
                    <img src="void_logo_1.png" alt="logo" className="w-6 drop-shadow" />
                    <span className="col-span-2 text-center text-lg">V o i d .</span>

                    <div className="flex  justify-end">
                        <button
                            type="button"
                            className={`${connectedPeopleDialog && "bg-gray-200"} inline-flex items-center 
                            rounded-l border border-zinc-400 px-2 py-2 text-xl hover:bg-gray-200 focus:outline-none`}
                            onClick={toggleConnectedPeopleDialog}
                        >
                            <CgUserList className="text-zinc-500" />
                        </button>
                        <button
                            type="button"
                            className={`${accountModal && "bg-gray-200"} inline-flex items-center 
                            rounded-r border border-zinc-400 px-2 py-2 text-xl hover:bg-gray-200 focus:outline-none`}
                            onClick={toggleAccountModal}
                        >
                            <CgProfile className="text-zinc-500" />
                        </button>
                    </div>
                </div>
                <div className="bg-white py-2 text-center font-bold text-zinc-700 drop-shadow-md">
                    {!isConnected && <span>You are disconnected from the server... 🥲</span>}
                    {isConnected && currentAccount && <span>Welcome {currentAccount.pseudo} ! 🔥</span>}
                    {isConnected && !currentAccount && <span>Enter a username to chat !</span>}
                </div>
            </header>

            <LoginModal isOpen={accountModal} closeAccountModal={() => setAccountModal(false)} />
            <ConnectedPeopleDialog isOpen={connectedPeopleDialog} />
        </>
    );
};

export default NavBar;
