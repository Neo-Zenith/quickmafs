import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Editor from "@monaco-editor/react";
import CodeEditorButton from "./Button";
import MenuDropdown from "../MenuDropdown/MenuDropdown";
import "./COdeEditor.css";

const languageCommentsMap = new Map([
	["javascript", "// Paste/Enter your code here"],
	["python", "# Paste/Enter your code here"],
	["java", "// Paste/Enter your code here"],
	["html", "<!-- Paste/Enter your code here -->"],
	["css", "/* Paste/Enter your code here */"],
	["ruby", "# Paste/Enter your code here"],
	// Add more languages as needed
]);

export default function CodeEditor({ defaultCode }) {
	const editorRef = useRef(null);
	const dispatch = useDispatch();
	const [language, setLanguage] = useState("Python");
	const [code, setCode] = useState(defaultCode);

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

	function removeWordFromStart(inputString, targetWord) {
		if (inputString.startsWith(targetWord)) {
			return inputString.slice(targetWord.length).trim();
		}
		return inputString;
	}

	function sanitizeInput(inputString) {
		const cleanedString = removeWordFromStart(
			inputString,
			languageCommentsMap.get(language)
		);
		// Using the replace method with a regular expression to replace all occurrences
		const sanitizedString = cleanedString.replace(/'/g, '"');
		return sanitizedString;
	}

	// handle when user clicks on "Generate" button
	function handleGenerate() {
		let content = sanitizeInput(code);

		const url = "http://localhost:5000/openai";
		const payload = {
			language: language,
			content: content,
		};
		console.log("Payload:", payload);

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
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	function handleDropdownClick(choice) {
		console.log(`Clicked on dropdown:`, choice);
		setLanguage(choice);
		setCode(languageCommentsMap.get(choice));
	}

	return (
		<>
			<div style={{ marginBottom: "1rem" }}>
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
					]}
				/>
			</div>

			<Editor
				height="65vh"
				theme="vs-dark"
				className="container"
				language={language}
				defaultLanguage="python"
				defaultValue={defaultCode}
				value={code}
				onChange={(v, e) => setCode(v)}
				onMount={handleEditorDidMount}
				beforeMount={handleEditorWillMount}
				onValidate={handleEditorValidation}
			/>

			<CodeEditorButton handleClick={handleGenerate} />
		</>
	);
}
