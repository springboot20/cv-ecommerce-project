import React, { createContext, useEffect, useMemo, useState } from "react";
import { SocketContextInterface } from "../types/socket";
import socketio from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../hooks/redux/redux.hooks";
import { Token } from "../types/redux/auth";
import { SocketEvent } from "../types/enums/socket-event";
import { setNotification } from "../features/notifications/notification.slice";

export const SocketContext = createContext<SocketContextInterface>({} as SocketContextInterface);

const getSocket = (tokens: Token | null) => {
  const env = import.meta.env;
  const url =
    env.MODE === "production" ? env.VITE_API_SOCKET_URL_PROD : env.VITE_API_SOCKET_URL_DEV;
  console.log(tokens);

  console.log(url);

  return socketio(url, {
    auth: { tokens },
    // withCredentials: true,
  });
};

export const SocketIoProvider: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  const { tokens } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [newNotification, setNewNotification] = useState(false);

  const onConnected = () => {
    setConnected(true);

    console.log(connected);
  };

  const onDisconnected = () => {
    setConnected(false);
  };

  useEffect(() => {
    setSocket(getSocket(tokens));
  }, [tokens, setSocket]);

  const onProductRecieved = (data: any) => {
    console.log(data);
    setNewNotification(true);
    dispatch(setNotification(data));
  };

  const onProductDeleted = (data: any) => {
    console.log(data);

    setNewNotification(false);
    dispatch(setNotification(data));
  };

  useEffect(() => {
    if (!socket) return;

    socket?.on(SocketEvent.CONNECTED_EVENT, onConnected);
    socket?.on(SocketEvent.DISCONNECTED_EVENT, onDisconnected);

    socket?.on(SocketEvent.NEW_PRODUCT_ADDED_EVENT, onProductRecieved);
    socket?.on(SocketEvent.PRODUCT_DELETED, onProductDeleted);

    return () => {
      socket?.off(SocketEvent.CONNECTED_EVENT, onConnected);
      socket?.off(SocketEvent.DISCONNECTED_EVENT, onDisconnected);
      socket?.off(SocketEvent.NEW_PRODUCT_ADDED_EVENT, onProductRecieved);
      socket?.off(SocketEvent.PRODUCT_DELETED, onProductDeleted);
    };
  }, [socket, connected]);

  const value = useMemo(
    () => ({
      socket,
      onConnected,
      onDisconnected,
      newNotification,
      connected,
    }),
    [socket, onConnected, onDisconnected, connected, newNotification]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
