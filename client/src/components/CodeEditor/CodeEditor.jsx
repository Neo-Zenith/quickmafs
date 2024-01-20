import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import CodeEditorDropdown from "./Dropdown";
import CodeEditorButton from "./Button";
import MenuDropdown from "../MenuDropdown/MenuDropdown";

const languageCommentsMap = new Map([
    ["javascript", "// Paste/Enter your code here"],
    ["python", "# Paste/Enter your code here"],
    ["java", "// Paste/Enter your code here"],
    ["html", "<!-- Paste/Enter your code here -->"],
    ["css", "/* Paste/Enter your code here */"],
    ["ruby", "# Paste/Enter your code here"],
    // Add more languages as needed
]);

const CodeEditor = ({ defaultCode }) => {
    const editorRef = useRef(null);
    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState(defaultCode);

    function handleEditorChange(value, event) {
        // here is the current value
        console.log(value);
        console.log(event);
    }

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

    // for submit later
    function showValue() {
        alert(editorRef.current.getValue());
    }

    function handleDropdownClick(choice) {
        console.log(`Clicked on dropdown:`, choice);
        setLanguage(choice);
        setCode(languageCommentsMap.get(choice));
    }

    return (
        <>
            <CodeEditorDropdown
                handleClick={handleDropdownClick}
                activeLanguage={language}
            />

            <MenuDropdown
                title={"Language"}
                replaceTitle={true}
                items={[
                    { label: "JavaScript", action: () => {} },
                    { label: "Python", action: () => {} },
                    { label: "CPP", action: () => {} },
                ]}
            />

            <Editor
                height="60vh"
                theme="vs-dark"
                language={language}
                defaultLanguage="python"
                defaultValue={defaultCode}
                value={code}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                beforeMount={handleEditorWillMount}
                onValidate={handleEditorValidation}
            />

            <CodeEditorButton />
        </>
    );
};

export default CodeEditor;
