import { createContext } from "react";
import { UserData } from "./types/UserData";

export const AuthContext = createContext<UserData | undefined>(undefined);

export const ConnectionContext = createContext<boolean>(false);
