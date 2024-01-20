import OutputWindow from "./components/OutputWindow/OutputWindow";
import CodeEditor from "./components/CodeEditor";

function App() {
    // testing OutputWindow.jsx on main page
    return (
        <>
			<h1>Monaco Editor Example</h1>
			<CodeEditor
				defaultCode={"/// some long ass comment so i can see whats happening"}
			/>
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
