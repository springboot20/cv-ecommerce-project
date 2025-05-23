import socketio from "socket.io-client";

export interface SocketContextInterface {
  socket: ReturnType<typeof socketio> | null;
  connected: boolean;
  onConnected: () => void;
  onDisconnected: () => void;
}
