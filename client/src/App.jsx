import CodeEditor from "./components/CodeEditor";

function App() {
	return (
		<div>
			<h1>Monaco Editor Example</h1>
			<CodeEditor
				defaultCode={"/// some long ass comment so i can see whats happening"}
			/>
		</div>
	);
}

export default App;
