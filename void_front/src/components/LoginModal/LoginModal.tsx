import { FC, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserData } from "../../types/UserData";
import { socket } from "../../socket";

interface LoginModalProps {
    isOpen: boolean;
    closeAccountModal: () => void;
    currentAccount: UserData | undefined;
}

const LoginModal: FC<LoginModalProps> = ({
    isOpen,
    closeAccountModal,
    currentAccount,
}) => {
    const [formPseudo, setFormPseudo] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormPseudo(e.target.value);
    };

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        closeAccountModal();

        // create authentication
        if (formPseudo && !currentAccount) {
            socket.emit("auth-request", { id: uuidv4(), pseudo: formPseudo });
        }

        // change account pseudo when authenticated (but not the id)
        if (formPseudo && currentAccount) {
            socket.emit("auth-request", {
                id: currentAccount.id,
                pseudo: formPseudo,
            });
        }

        // disconnect action
        if (!formPseudo && currentAccount) {
            socket.emit("auth-request", undefined);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }

        if (e.key === "Escape") {
            closeAccountModal();
        }
    };

    return (
        <dialog
            open={isOpen}
            className=" top-1/2 rounded-lg border bg-white text-lg"
        >
            <p className="mb-3">Entrez un pseudo</p>
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white py-1 px-3 text-base text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    value={formPseudo}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                />
            </form>
        </dialog>
    );
};

export default LoginModal;
