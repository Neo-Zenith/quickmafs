// import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ defaultCode }) => {
	function handleEditorChange(value, event) {
		// here is the current value
		console.log(value);
		console.log(event);
	}

	function handleEditorDidMount(editor, monaco) {
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

	return (
		<Editor
			height="90vh"
			defaultLanguage="javascript"
			defaultValue={defaultCode}
			onChange={handleEditorChange}
			onMount={handleEditorDidMount}
			beforeMount={handleEditorWillMount}
			onValidate={handleEditorValidation}
		/>
	);
};

export default CodeEditor;
