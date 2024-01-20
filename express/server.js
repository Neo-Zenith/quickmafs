const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = require("http").createServer(app);
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const io = new Server(server, {
	cors: {
		origin: ["*"],
		credentials: true,
	},
});

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());

async function queryXLNET(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/xlnet/xlnet-base-cased",
		{
			headers: { Authorization: process.env.HUGGING_FACE_TOKEN },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

app.get("/", (req, res) => {
	return res.json("hi");
});

app.get("/xlnet", async (req, res) => {
	try {
		const response = await queryXLNET({
			inputs: "Can you please let us know more details about your ",
		});
		var ans = response[0]?.generated_text || "";
		return res.json(ans);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
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

	return res.json({ result: "success", response: codeObj });
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
