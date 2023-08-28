/* eslint-disable import/prefer-default-export */
import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const servUrl = import.meta.env.VITE_BACK_URL ?? "undefined";

export const socket = io(servUrl);
