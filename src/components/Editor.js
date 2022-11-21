import React, { useState, useEffect, useRef, useContext } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'brace/theme/monokai';
import NavBar from "./NavBar";
import Footer from "./Footer";
import WelcomeModal from "./WelcomeModal"
import axios from "axios";
import { ScreenLockLandscapeRounded } from "@mui/icons-material";
import Context from "../context/Context"


const Editor = () => {
    const selectedLanguage = useRef(0)
    const output = null;
    const baseURL = "https://judge0-ce.p.rapidapi.com/submissions"
    const [resp, setResp] = useState("")
    const [currLang, setCurrLang] = useState('')
    const easyChallenge = "https://data.mongodb-api.com/app/data-pkrpq/endpoint/getEasyChallenge"
    const {
        getQuestion, setReceived, title, 
        example, problemStatement, getInput,
        extractExample
    } = useContext(Context)



    let requestBody = {
        "source_code": "",
        "language_id": "63",
        "number_of_runs": null,
        "stdin": "Judge0",
        "expected_output": null,
        "cpu_time_limit": null,
        "cpu_extra_time": null,
        "wall_time_limit": null,
        "memory_limit": null,
        "stack_limit": null,
        "max_processes_and_or_threads": null,
        "enable_per_process_and_thread_time_limit": null,
        "enable_per_process_and_thread_memory_limit": null,
        "max_file_size": null,
        "enable_network": null
    }

    const headers = {
        // "X-RapidAPI-Key": "b7d6b6780dmshe567233982bd7a4p1096c8jsn53ce4a3b5bec"
        'X-RapidAPI-Key': 'bcc33499f9msh5f6c898ed17eea7p121b52jsn76ceee08eab4'
    }

    const awaitToken = async () => {
        return await new Promise(resolve => resolve("result"));
    };

    function sendCode(requestBody){
        axios.post(`${baseURL}`, requestBody, {
            headers
            })
            .then((res)=> {
                awaitToken().then(()=>{
                    axios.get(`${baseURL}/${res.data.token}`, {
                        headers
                    })
                    .then((res)=> {
                        !res.data.stdout ? setResp(res.data.stderr)
                            : setResp(res.data.stdout)
                    })
                    .catch((err)=> {
                        console.log('err',err)
                    })
                })
            })
    }

    function getEasyQuestion(){
        // axios.defaults.headers["Access-Control-Allow-Origin"] = "*"
        axios.get("http://localhost:5000/retrieveQuestion")
        .then((res) =>{
            getQuestion.current = res.data.challenge
            title.current = getQuestion.current[0].title;
            example.current = getQuestion.current[0].Example2.slice(3)
            problemStatement.current = getQuestion?.current[0].place
            console.log('resp', getQuestion.current)
        })
    }

    function strToArr (str) {
        const replaced = str.replace(/'/g, '"')
        const result = JSON.parse(replaced)
        return result
    }

    function runFirstTest() {
        const inputs = getInput(extractExample(example.current))
        const inputsArrClean = []
        inputs.map((inp) => {
            isFinite(inp) === true ? inputsArrClean.push(parseInt(inp))
                : inp.includes('[') ? inputsArrClean.push(strToArr(inp))
                    : inputsArrClean.push(inp)
        })

    }

    function runCode(e){
        e.preventDefault();
        requestBody.source_code = document.getElementsByClassName('ace_content')[0].innerText
        console.log('req', requestBody.source_code)
        requestBody.language_id = selectedLanguage.current
        console.log('what are we sending', requestBody)
        setResp('')
        sendCode(requestBody)
    }

    return (
        <>
        <NavBar selectedLanguage={selectedLanguage} setCurrLang={setCurrLang} />
        <WelcomeModal getEasyQuestion={getEasyQuestion} />
        <AceEditor
            mode={currLang}
            theme="monokai"
            name="editor"
            editorProps={{ $blockScrolling:true }}
            enableLiveAutocompletion={true}
            width={900}
        />
        <Footer runCode={runCode}/>
        </>
    )
}

export default Editor;