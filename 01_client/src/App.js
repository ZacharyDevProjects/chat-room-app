import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { ConnectionState } from "../src/components/socket/ConnectionState";
import { ConnectionManager } from "../src/components/socket/ConnectionManager";
import { Events } from "../src/components/socket/Events";
import { MyForm } from "../src/components/socket/MyForm";
import Header from "../src/components//layout/header";
import Footer from "../src/components/layout/footer";
import Chat from "../src/components/chat/chat";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="App">
        <ConnectionState isConnected={isConnected} />
        <Events events={fooEvents} />
        <ConnectionManager />
        <MyForm />
      </div>
      <Chat />
      <Footer />
    </>
  );
}
