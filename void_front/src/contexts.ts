import { createContext } from "react";
import { UserData } from "./types/UserData";

const AuthContext = createContext<UserData | undefined>(undefined);

export default AuthContext;
