"use client";

import { SocketContext } from "@/context/SocketContext";
import React, { useState, ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { Socket, io } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const socketServerURL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;
  if (!socketServerURL) {
    throw new Error("NEXT_PUBLIC_SOCKET_SERVER_URL is not defined");
  }
  useEffect(() => {
    const socketConn = io(socketServerURL, {
      transports: ["websocket"]
    });
    setSocket(socketConn);
    socketConn.on("connect", () => {
      console.log("connected with socket");
    });
    socketConn.on("connect_error", (err) => {
      console.log(err);
      toast.warn(`Couldn't establish a connection with server`);
    });
    socketConn.on("disconnect", () => {
      console.log("disconnected from socket");
    });
    // console log event data when server emits anything
    socketConn.on("notification", (data) => {
      console.log(data);
    })
    return () => {
      if (socketConn) {
        socketConn.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};