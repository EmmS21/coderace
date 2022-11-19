import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const Editor = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const output = null;

    const languageMap ={
        70: "python",
        63: "javascript",
        62: "java",
    }
    return (
        <AceEditor
            mode={selectedLanguage}
            theme="monokai"
            name="editor"
            editorProps={{ $blockScrolling:true }}
            enableLiveAutocompletion={true}
            width={900}
        />
    )
}

export default Editor;