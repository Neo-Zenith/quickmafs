import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Editor from "@monaco-editor/react";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import "./CodeEditor.css";
import QueryButtons from "../QueryButtons/QueryButtons";
import { Typography } from "@mui/material";

const languageCommentsMap = new Map([
  [
    "javascript",
    `const math = require('mathjs');

// Define the objective function
const objectiveFunction = (variables) => {
  const [x, y] = variables;
  return 0.5 * Math.pow(x, 2) + 2 * x * y + 3 * Math.pow(y, 2) + x + y + Math.pow(x, 2);
};

// Define the constraints
const constraints = [
  { type: 'ineq', fun: (variables) => variables[0] + variables[1] - 10 },
  { type: 'ineq', fun: (variables) => 5 - 2 * variables[0] + variables[1] }
];

// Initial guess
const initialGuess = [0, 0];

// Minimize the objective function with the given constraints
const result = math.optimize(objectiveFunction, initialGuess, { constraints: constraints });

// Display the result
console.log('Optimal variables:', result.solution);
console.log('Optimal value of the objective function:', result.f);
  `,
  ],
  [
    "python",
    `import numpy as np
from scipy.optimize import minimize

# Define the objective function
def objective_function(variables):
    x, y = variables
    return 0.5 * x*2 + 2*x*y + 3*y2 + x + y + x*2

# Define the constraints
constraints = [
    {'type': 'ineq', 'fun': lambda variables: variables[0] + variables[1] - 10},
    {'type': 'ineq', 'fun': lambda variables: 5 - 2*variables[0] + variables[1]}
]

# Initial guess
initial_guess = [0, 0]

# Minimize the objective function with the given constraints
result = minimize(objective_function, initial_guess, constraints=constraints)

# Display the result
print("Optimal variables:", result.x)
print("Optimal value of the objective function:", result.fun)`,
  ],
  [
    "java",
    `import org.apache.commons.math3.optim.InitialGuess;
import org.apache.commons.math3.optim.nonlinear.scalar.GoalType;
import org.apache.commons.math3.optim.nonlinear.scalar.ObjectiveFunction;
import org.apache.commons.math3.optim.nonlinear.scalar.noderiv.NelderMeadSimplex;
import org.apache.commons.math3.optim.nonlinear.scalar.noderiv.SimplexOptimizer;

public class OptimizationExample {

    public static void main(String[] args) {
        // Define the objective function
        ObjectiveFunction objective = new ObjectiveFunction(v -> 0.5 * Math.pow(v[0], 2) + 2 * v[0] * v[1] + 3 * Math.pow(v[1], 2) + v[0] + v[1] + Math.pow(v[0], 2));

        // Define the constraints
        double[] lowerBounds = { Double.NEGATIVE_INFINITY, Double.NEGATIVE_INFINITY };
        double[] upperBounds = { Double.POSITIVE_INFINITY, Double.POSITIVE_INFINITY };

        // Set up the optimizer
        SimplexOptimizer optimizer = new SimplexOptimizer(1e-9, 1e-9);

        // Initial guess
        double[] initialGuess = { 0, 0 };

        // Minimize the objective function with the given constraints
        NelderMeadSimplex simplex = new NelderMeadSimplex();
        double[] result = optimizer.optimize(
            new InitialGuess(initialGuess),
            new ObjectiveFunction(v -> objective.getValue(v)),
            simplex,
            GoalType.MINIMIZE,
            new org.apache.commons.math3.optim.linear.InequalityConstraint(constraints[0], lowerBounds, upperBounds),
            new org.apache.commons.math3.optim.linear.InequalityConstraint(constraints[1], lowerBounds, upperBounds)
        ).getPoint();

        // Display the result
        System.out.println("Optimal variables: [" + result[0] + ", " + result[1] + "]");
        System.out.println("Optimal value of the objective function: " + objective.getValue(result));
    }
}
`,
  ],
  [
    "c++",
    `#include <iostream>
#include <Eigen/Dense>
#include <unsupported/Eigen/Optimization>

using namespace Eigen;

// Define the objective function
struct ObjectiveFunction {
    double operator()(const VectorXd& variables) const {
        double x = variables[0];
        double y = variables[1];
        return 0.5 * pow(x, 2) + 2 * x * y + 3 * pow(y, 2) + x + y + pow(x, 2);
    }
};

// Define the constraints
struct Constraint1 {
    double operator()(const VectorXd& variables) const {
        return variables[0] + variables[1] - 10;
    }
};

struct Constraint2 {
    double operator()(const VectorXd& variables) const {
        return 5 - 2 * variables[0] + variables[1];
    }
};

int main() {
    // Initial guess
    VectorXd initialGuess(2);
    initialGuess << 0, 0;

    // Minimize the objective function with the given constraints
    Optimization::NelsonMeadSimplex<VectorXd> optimizer;
    VectorXd result = optimizer.minimize(ObjectiveFunction{}, initialGuess, Constraint1{}, Constraint2{});

    // Display the result
    std::cout << "Optimal variables: " << result.transpose() << std::endl;
    std::cout << "Optimal value of the objective function: " << ObjectiveFunction{}(result) << std::endl;

    return 0;
  }
  `,
  ],
  [
    "ruby",
    `require 'numo/narray'
require 'sciruby'

# Define the objective function
def objective_function(variables)
  x, y = variables
  0.5 * x**2 + 2 * x * y + 3 * y**2 + x + y + x**2
end

# Define the constraints
constraint1 = Proc.new { |variables| variables[0] + variables[1] - 10 }
constraint2 = Proc.new { |variables| 5 - 2 * variables[0] + variables[1] }

# Initial guess
initial_guess = Numo::DFloat[0, 0]

# Minimize the objective function with the given constraints
result = SciRuby::Optimiser.nelder_mead_minimize(objective_function, initial_guess, [constraint1, constraint2])

# Display the result
puts "Optimal variables: #{result[:x]}"
puts "Optimal value of the objective function: #{result[:fun]}"
`,
  ],
  [
    "matlab",
    `% Define the objective function
function f = objective_function(variables)
    x = variables(1);
    y = variables(2);
    f = 0.5 * x^2 + 2 * x * y + 3 * y^2 + x + y + x^2;
end

% Define the constraints
function c = constraints(variables)
    c = [
        variables(1) + variables(2) - 10;
        5 - 2 * variables(1) + variables(2)
    ];
end

% Initial guess
initial_guess = [0; 0];

% Minimize the objective function with the given constraints
options = optimset('Display', 'iter');
result = fmincon(@objective_function, initial_guess, [], [], [], [], [], [], @constraints, options);

% Display the result
fprintf('Optimal variables: [%f, %f]\n', result(1), result(2));
fprintf('Optimal value of the objective function: %f\n', objective_function(result));
  `,
  ],
]);

export default function CodeEditor({ defaultLanguage }) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("Python");
  const [code, setCode] = useState(languageCommentsMap.get(defaultLanguage));

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco);
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  function sanitizeInput(inputString) {
    // Using the replace method with a regular expression to replace all occurrences
    const sanitizedString = inputString.replace(/'/g, '"');
    return sanitizedString;
  }

  // handle when user clicks on "Generate" button
  function handleGenerate() {
    let content = sanitizeInput(code);

    const url = "http://localhost:5000/openai";
    const payload = {
      language: language,
      content: content,
      type: "code",
    };
    console.log("Payload:", payload);

    dispatch({ type: "SET_LOADING", payload: true });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Convert the data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        console.log("Query success:", data);
        dispatch({
          type: "DISPLAY_CODE_OUTPUT",
          payload: {
            code: data.response.code,
            language: "c",
          },
        });
        dispatch({ type: "SET_LOADING", payload: false });
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  }

  function handleDropdownClick(choice) {
    console.log(`Clicked on dropdown:`, choice);
    setLanguage(choice);
    setCode(languageCommentsMap.get(choice));
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
          Code Input
        </Typography>
        <MenuDropdown
          title={language}
          replaceTitle={true}
          items={[
            {
              label: "JavaScript",
              action: () => handleDropdownClick("javascript"),
            },
            {
              label: "Python",
              action: () => handleDropdownClick("python"),
            },
            {
              label: "C++",
              action: () => handleDropdownClick("c++"),
            },
            {
              label: "Java",
              action: () => handleDropdownClick("java"),
            },
            {
              label: "Ruby",
              action: () => handleDropdownClick("ruby"),
            },
            {
              label: "MATLAB",
              action: () => handleDropdownClick("matlab"),
            },
          ]}
        />
      </div>

      <Editor
        height="60vh"
        theme="vs-dark"
        className="container"
        language={language}
        defaultLanguage={defaultLanguage}
        defaultValue={languageCommentsMap.get(defaultLanguage)}
        value={code}
        onChange={(v, e) => setCode(v)}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        onValidate={handleEditorValidation}
      />

      <QueryButtons handleClick={handleGenerate} />
    </>
  );
}
