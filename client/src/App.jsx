import OutputWindow from "./components/OutputWindow/OutputWindow";

function App() {
    // testing OutputWindow.jsx on main page
    return (
        <>
            <OutputWindow
                context={{
                    code: "const add = 1 + 2;\nvar i = add;",
                    language: "javascript",
                    showLineNumbers: true,
                }}
            />
        </>
    );
}

export default App;
