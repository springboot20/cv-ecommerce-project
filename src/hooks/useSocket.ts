import { useContext } from "react";
import { SocketContext } from "../context/SocketIoContext";

export const useSocket = () => useContext(SocketContext);
