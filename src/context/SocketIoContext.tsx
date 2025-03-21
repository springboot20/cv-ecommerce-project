import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { SocketContextInterface } from "../types/socket";
import socketio from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../hooks/redux/redux.hooks";
import { Token } from "../types/redux/auth";
import { SocketEvent } from "../types/enums/socket-event";
import { setNotification } from "../features/notifications/notification.slice";
import { addItemToCart, removeItemFromCart } from "../features/cart/cart.reducer";

export const SocketContext = createContext<SocketContextInterface>({} as SocketContextInterface);

const getSocket = (tokens: Token | null) => {
  const env = import.meta.env;
  const url =
    env.MODE === "production" ? env.VITE_API_SOCKET_URL_PROD : env.VITE_API_SOCKET_URL_DEV;

  return socketio(url, {
    auth: { tokens },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
  });
};

export const SocketIoProvider: React.FC<{
  children: Readonly<React.ReactNode>;
}> = ({ children }) => {
  const { tokens } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<ReturnType<typeof socketio> | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  // const [reconnecting, setReconnecting] = useState<boolean>(false);

  const onConnected = useCallback(() => {
    setConnected(true);
    // setReconnecting(false);
  }, []);

  const onDisconnected = () => {
    // setReconnecting(false);
    setConnected(false);
  };

  // const onReconnecting = useCallback((attempt: number) => {
  //   console.log(`Socket reconnecting: attempt ${attempt}`);
  //   setReconnecting(true);
  // }, []);

  // const onReconnectFailed = useCallback(() => {
  //   console.log("Socket reconnection failed");
  //   setReconnecting(false);
  //   // Could show a user message here
  // }, []);

  // const onReconnectError = useCallback((error: Error) => {
  //   console.error("Socket reconnection error:", error);
  // }, []);

  useEffect(() => {
    let currentSocket: ReturnType<typeof socketio> | null = null;

    if (tokens) {
      currentSocket = getSocket(tokens);
      setSocket(currentSocket);
    } else {
      // Disconnect and clean up if no tokens
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setConnected(false);
      }
    }

    return () => {
      if (currentSocket) {
        currentSocket.disconnect();
      }
    };
  }, [tokens]);

  const handleNotification = useCallback(
    (data: any) => {
      // Ensure data has correct format before dispatching
      if (data && typeof data === "object") {
        // Convert to expected notification format if needed
        const notification = {
          ...data,
        };

        console.log(notification);

        dispatch(setNotification(notification));

        console.log(data);
      }
    },
    [dispatch]
  );

  const addProductToCart = (data: any) => {
    dispatch(addItemToCart(data));
  };

  const removeProductFromCart = (data: any) => {
    dispatch(removeItemFromCart(data));
  };

  useEffect(() => {
    if (!socket) return;

    socket?.on(SocketEvent.CONNECTED_EVENT, onConnected);
    socket?.on(SocketEvent.DISCONNECTED_EVENT, onDisconnected);

    socket?.on(SocketEvent.NEW_PRODUCT_ADDED_EVENT, handleNotification);
    socket?.on(SocketEvent.PRODUCT_DELETED, handleNotification);

    socket?.on(SocketEvent.ADD_ITEM_TO_CART_EVENT, addProductToCart);
    socket?.on(SocketEvent.REMOVE_ITEM_TO_CART_EVENT, removeProductFromCart);

    return () => {
      socket?.off(SocketEvent.CONNECTED_EVENT, onConnected);
      socket?.off(SocketEvent.DISCONNECTED_EVENT, onDisconnected);

      socket?.off(SocketEvent.NEW_PRODUCT_ADDED_EVENT, handleNotification);
      socket?.off(SocketEvent.PRODUCT_DELETED, handleNotification);

      socket?.off(SocketEvent.ADD_ITEM_TO_CART_EVENT, addProductToCart);
      socket?.off(SocketEvent.REMOVE_ITEM_TO_CART_EVENT, removeProductFromCart);
    };
  }, [socket, socket, onConnected, onDisconnected, handleNotification, dispatch]);

  const value = useMemo(
    () => ({
      socket,
      onConnected: () => socket?.connect(),
      onDisconnected: () => socket?.disconnect(),
      connected,
    }),
    [socket, onConnected, onDisconnected, connected]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
