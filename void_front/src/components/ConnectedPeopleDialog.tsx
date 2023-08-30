import { FC } from "react";

interface ConnectedPeopleDialogProps {
    isOpen: boolean;
}

const ConnectedPeopleDialog: FC<ConnectedPeopleDialogProps> = ({ isOpen }) => (
    <dialog open={isOpen} className=" top-1/2 rounded-lg border bg-white p-3 text-lg">
        <p className="mb-3">People connected : </p>
    </dialog>
);

export default ConnectedPeopleDialog;
