// src/WebSocketContext.js

import { h, createContext } from "preact"; 
import { useState, useEffect } from "preact/hooks"; 
import { Entity} from "aframe-react"; 

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  return <WebSocketContext.Provider value={socket}>{children}</WebSocketContext.Provider>;
};

export default WebSocketContext;
