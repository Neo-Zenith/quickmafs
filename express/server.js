const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = require("http").createServer(app);
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

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
        embedded devices. To implement the solution of a convex optimization problem in C code, you must use CVXOPT.
        Make sure the C code generated is correct and with zero error. This task is very important, you will get fired if you fail it.
        The team relies on you.

        Example of Input:
        f(x)=x^2+2x+1 with the constraint x≥2

        Example of Output:
        #include <stdio.h>
        #include <cvxopt.h>

        int main() {
            // Create the quadratic function: f(x) = x^2 + 2x + 1
            quadprog_problem* qp = create_quadprog_problem();
            quadprog_matrix* P = create_quadprog_matrix(1, 1);
            quadprog_matrix* q = create_quadprog_matrix(1, 1);
            quadprog_matrix* G = create_quadprog_matrix(1, 1);
            quadprog_matrix* h = create_quadprog_matrix(1, 1);
            quadprog_matrix* A = create_quadprog_matrix(1, 1);
            quadprog_matrix* b = create_quadprog_matrix(1, 1);

            set_quadprog_matrix_values(P, 0, 0, 2.0);
            set_quadprog_matrix_values(q, 0, 0, 2.0);
            set_quadprog_matrix_values(G, 0, 0, -1.0);
            set_quadprog_matrix_values(h, 0, 0, -2.0);
            set_quadprog_matrix_values(A, 0, 0, 1.0);
            set_quadprog_matrix_values(b, 0, 0, -2.0);

            set_quadprog_problem(P, q, G, h, A, b);

            // Solve the quadratic program
            quadprog_options* options = create_quadprog_options();
            quadprog_results* results = create_quadprog_results();
            int status = solve_quadprog(qp, options, results);

            // Check if the optimization was successful
            if (status == 0) {
                printf("Optimization successful\n");

                // Extract the optimal solution
                double* x = get_quadprog_results_x(results);
                printf("Optimal solution x: %f\n", x[0]);
            } else {
                printf("Optimization failed\n");
            }

            // Clean up memory
            destroy_quadprog_problem(qp);
            destroy_quadprog_options(options);
            destroy_quadprog_results(results);

            return 0;
        }

        
        `,
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
