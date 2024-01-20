import React, { useEffect, useState } from "react";
import OutputWindow from "../OutputWindow/OutputWindow";

export default function Output() {
    const [context, setContext] = useState(""); // Assuming context is a string

    useEffect(() => {
        // Establish WebSocket connection
        const ws = new WebSocket("ws://10.5.0.2:5000");

        // Set up event listeners
        ws.onopen = () => {
            console.log("WebSocket connection opened");
        };

        ws.onmessage = (event) => {
            // Update context with the received data
            const newData = event.data;
            // You may need to parse or process the data based on your use case
            // For example, if the data is a JSON string, you can parse it like JSON.parse(newData)
            // Update the context as needed
            // This is just a basic example, adjust it according to your requirements
            setContext(newData);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []); // Run this effect only once when the component mounts

    return <OutputWindow context={context} />;
}
