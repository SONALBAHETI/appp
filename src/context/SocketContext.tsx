"use client";

import { createContext } from "react";
import { Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: null,
  setSocket: (socket: Socket | null) => {},
});
