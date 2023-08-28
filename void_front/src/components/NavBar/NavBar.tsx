import { FC } from "react";
import { CgProfile } from "react-icons/cg";
import { UserData } from "../../types/UserData";

interface NavBarProps {
    currentAccount: UserData | undefined;
    toggleAccountModal: () => void;
}

const NavBar: FC<NavBarProps> = ({ toggleAccountModal, currentAccount }) => (
    <header className="body-font fixed flex w-screen flex-col text-gray-600">
        <div className="grid grid-cols-4 items-center justify-between border-y bg-white bg-opacity-90 p-5 backdrop-blur">
            <img src="void_logo_1.png" alt="logo" className="w-6 drop-shadow" />
            <span className="col-span-2 text-center text-lg">V o i d .</span>
            <button
                type="button"
                className="ml-auto inline-flex items-center justify-end rounded border border-zinc-300 bg-white py-2 px-2 text-xl hover:bg-gray-200 focus:outline-none"
                onClick={toggleAccountModal}
            >
                <CgProfile className="text-zinc-400" />
            </button>
        </div>
        <span className="bg-white py-2 text-center font-bold text-zinc-700 drop-shadow-md">
            {currentAccount ? (
                <>Welcome {currentAccount.pseudo} ! 🔥</>
            ) : (
                <>Enter a username to connect !</>
            )}
        </span>
    </header>
);

export default NavBar;
