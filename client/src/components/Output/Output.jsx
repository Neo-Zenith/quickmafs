import React, { useEffect, useState } from "react";
import OutputWindow from "../OutputWindow/OutputWindow";
import { io } from "socket.io-client";

export default function Output() {
  const [context, setContext] = useState(""); // Assuming context is a string

  // Establish WebSocket connection
  const socket = io("http://127.0.0.1:5000");

  // client-side
  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  socket.on("new-output", (data) => {
    console.log("getting new output");
    console.log(data);
    // setContext((prev) => prev + data);
  });

  useEffect(() => {}, []); // Run this effect only once when the component mounts

  return <OutputWindow context={context} />;
}
