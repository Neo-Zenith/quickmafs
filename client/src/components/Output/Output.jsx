import { useEffect, useState } from "react";
import OutputWindow from "../OutputWindow/OutputWindow";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Output() {
  // const [context, setContext] = useState({
  // 	code: "",
  // 	language: "",
  // 	showLineNumbers: true,
  // });
  const codeOutput = useSelector((state) => state.codeOutput);
  const dispatch = useDispatch();
  console.log("Code output:", codeOutput);

  // Establish WebSocket connection
  const socket = io("http://127.0.0.1:5000");

  // // client-side
  socket.on("connect", () => {
    console.log(socket.id);
  });

  // socket.on("disconnect", () => {
  //   console.log(socket.id); // undefined
  // });

  socket.on("new-openai-output", (data) => {
    console.log("getting new output");
    // setContext((prev) => prev + data);
    dispatch({
      type: "DISPLAY_CODE_OUTPUT",
      payload: {
        code: data,
        language: "c",
      },
    });
    console.log(data);
  });

  // useEffect(() => {}, []); // Run this effect only once when the component mounts

  return <OutputWindow context={codeOutput} />;
}
