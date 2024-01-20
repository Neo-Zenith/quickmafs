import express from "express";

const app = express();
import { Server } from "socket.io";
import http from "http";
const server = http.createServer(app);
import cors from "cors";
import OpenAI from "openai";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

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

const get_family_schema = {
  type: "object",
  properties: {
    family: {
      type: "string",
      description:
        "either Linear Programming, Quadratic Programming and Semidefinite Programming",
    },
  },
  required: ["family"],
};

app.post("/get-family", async (req, res) => {
  // just for testing
  const { content } = req.body;
  const familyObj = await get_family(content);
  return res.json({ success: true, familyObj });
});

const get_family = async (content) => {
  const openai_res = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Context: You are an engineer working on convex optimization problem. 
        Your job is to classfiy mathematical expression or code with convex objectives into three problem family: Linear Programming, Quadratic Programming and Semidefinite Programming.
        
        Example of linear programming Input:
        f(x)=x^2+2x+1 with the constraint x≥2
  
        Example of Quadratic Programming Input:
        Minimize: 1/2x^2 + 2xy +3y^2 +x +y
        Subject to: x+y >= 10, 2x-y<=5
  
        Example of Semidefinite Programming Input:
        Minimize: Tr(C⋅X)
        Subject to: Tr(Ai⋅X)=bi, i=1,...,m and X⪰0
  
        Output your answer in either Linear Programming, Quadratic Programming and Semidefinite Programming
        `,
      },
      {
        role: "user",
        content,
      },
    ],
    // stream: true,
    max_tokens: 128,
    // top_p: 1,
    functions: [{ name: "format_response", parameters: get_family_schema }],
    function_call: { name: "format_response" },
  });

  const response = openai_res.choices[0].message.function_call.arguments;
  const familyObj = JSON.parse(response);
  return familyObj;
};

const linearPrompt = `
    Example of linear programming Input:
        f(x)=x^2+2x+1 with the constraint x≥2

        Example of linear programming Output:
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
`;

const quadraticPrompt = `
    Example of Quadratic Programming Input:
        Minimize: 1/2x^2 + 2xy +3y^2 +x +y
        Subject to: x+y >= 10, 2x-y<=5

        Example of Quadratic Programming Output:
        #include <stdio.h>
        #include <quadprog.h>

        int main() {
            // Quadratic part of the objective function (Hessian matrix)
            double H[2][2] = {{1.0, 2.0}, {2.0, 6.0}};

            // Linear part of the objective function (linear coefficients)
            double f[2] = {1.0, 1.0};

            // Linear inequality constraint matrix (A matrix)
            double A[2][2] = {{-1.0, -1.0}, {2.0, -1.0}};

            // Right-hand side of the inequality constraints
            double b[2] = {-10.0, 5.0};

            // Result variables
            double x_opt[2];

            // Solve the quadratic programming problem
            int status = solve_quadprog(H, f, A, b, NULL, NULL, x_opt);

            // Output the results
            if (status == 0) {
                printf("Optimal objective value: %.2f\n", 0.5 * (x_opt[0] * H[0][0] * x_opt[0] + x_opt[1] * H[1][1] * x_opt[1]) + f[0] * x_opt[0] + f[1] * x_opt[1]);
                printf("Optimal solution x: %.2f\n", x_opt[0]);
                printf("Optimal solution y: %.2f\n", x_opt[1]);
            } else {
                printf("Optimization failed\n");
            }
            return 0;
        }
`;

const semidefinitePrompt = `
    Example of Semidefinite Programming Input:
        Minimize: Tr(C⋅X)
        Subject to: Tr(Ai⋅X)=bi, i=1,...,m and X⪰0

        Example of Semidefinite Programming Output:
        #include <stdio.h>
        #include <cvxopt.h>

        int main() {
            // Objective matrix (C)
            quadprog_matrix* C = create_quadprog_matrix(2, 2);
            set_quadprog_matrix_values(C, 0, 0, 1.0);
            set_quadprog_matrix_values(C, 1, 1, 1.0);

            // Constraint matrices (A_i)
            quadprog_matrix* A1 = create_quadprog_matrix(2, 2);
            set_quadprog_matrix_values(A1, 0, 0, 1.0);
            set_quadprog_matrix_values(A1, 1, 1, -1.0);

            // Right-hand side values (b_i)
            double b1 = 5.0;

            // Result variables
            quadprog_matrix* X = create_quadprog_matrix(2, 2);

            // Solve the semidefinite programming problem
            int status = solve_quadprog_sdpa(C, 1, (const quadprog_matrix* const*)&A1, &b1, X);

            // Output the results
            if (status == 0) {
                printf("Optimal objective value: %.2f\n", get_quadprog_matrix_values(X, 0, 0) + get_quadprog_matrix_values(X, 1, 1));
                printf("Optimal solution matrix X:\n");
                printf("[ %.2f %.2f ]\n", get_quadprog_matrix_values(X, 0, 0), get_quadprog_matrix_values(X, 0, 1));
                printf("[ %.2f %.2f ]\n", get_quadprog_matrix_values(X, 1, 0), get_quadprog_matrix_values(X, 1, 1));
            } else {
                printf("Optimization failed\n");
            }

            // Clean up memory
            destroy_quadprog_matrix(C);
            destroy_quadprog_matrix(A1);
            destroy_quadprog_matrix(X);

            return 0;
      }
`;

// Image to expressions
app.get("/image-to-expression", async (req, res) => {
  const filename = "./img/upload.png";
  const data = fs.readFileSync(filename);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/trocr-small-printed",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: data,
    }
  );
  const result = await response.json();
  return res.json({ success: true, result });
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
  // type - exp or code
  const { type, content, language } = req.body;

  // get family first
  const { family } = await get_family(content);
  console.log("PREDICTED FAMILY: " + family);

  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `Context: You are an engineer working on convex optimization problem with applications from finance to 
        healthcare and control systems. Your job is to convert ${
          type === "exp" ? "mathematical expression" : `${language} code`
        } with convex objectives into efficient C code for
        embedded devices. You must focus on ${family}.
        Since the family is ${family}, you must use ${
          family === "Linear Programming"
            ? "<glpk.h>"
            : family === "Quadratic Programming"
            ? "<quadprog.h>"
            : "<cvxopt.h>"
        }.
        Make sure the C code generated is correct and with zero error. This task is very important, you will get fired if you fail it.
        The team relies on you.

        ${
          family === "Linear Programming"
            ? linearPrompt
            : family === "Quadratic Programming"
            ? quadraticPrompt
            : semidefinitePrompt
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

  const response = stream.choices[0].message.function_call.arguments;

  const codeObj = JSON.parse(response);
  // for await (const chunk of stream) {
  //   console.log(chunk.choices[0]?.delta?.content || "");
  //   // io.emit("new-openai-output", chunk.choices[0]?.delta?.content);
  // }

  return res.json({ result: "success", response: codeObj });
});

io.on("connect", (socket) => {});

server.listen(5000, () => {
  console.log("Listening at port 5000");
});
