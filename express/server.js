const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = require("http").createServer(app);
const cors = require("cors");
const OpenAI = require("openai");

const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:3000"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("hi");
});

app.get("/output", (req, res) => {
  io.emit("new-output", "hello");
  return res.json("successs");
});

const schema = {
  type: "object",
  properties: {
    code: {
      type: "string",
      description: "Generated C code",
    },
  },
  required: ["code"],
};

// openai
const openai = new OpenAI({
  apiKey: "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",
});

app.post("/openai", async (req, res) => {
  const { language, content } = req.body;
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Context: You are an engineer working on convex optimization problem with applications from finance to 
        healthcare and control systems. Your job is to convert mathematical expression with convex objectives into efficient C code for
        embedded devices. If possible, include the cvxopt.h library
        Make sure the C code generated is correct and with zero error. This task is very important, you will get fired if you fail it.
        The team relies on you.`,
      },
      {
        role: "user",
        content,
      },
    ],
    // stream: true,
    max_tokens: 1024,
    // top_p: 1,
    functions: [{ name: "format_response", parameters: schema }],
    function_call: { name: "format_response" },
  });

  const response = await stream.choices[0].message.function_call.arguments;

  const codeObj = JSON.parse(response);
  // for await (const chunk of stream) {
  //   console.log(chunk.choices[0]?.delta?.content || "");
  //   // io.emit("new-openai-output", chunk.choices[0]?.delta?.content);
  // }

  return res.json({ result: "success", code: codeObj });
});

// io.use(wrap(sessionMiddleware));
// io.use(authorizeUser);
io.on("connect", (socket) => {
  //   console.log(socket);
  //   initializeUser(socket);
  //   socket.on("add-friend", (friendName, cb) => {
  //     addFriend(socket, friendName, cb);
  //   });
  //   socket.on("disconnecting", () => onDisconnect(socket));
});

server.listen(5000, () => {
  console.log("Listening at port 5000");
});
