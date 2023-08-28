import { UserData } from "./UserData";

export type MessageData = {
    id: string;
    content: string;
    author: UserData;
};
