import React, { useState, useEffect, useRef, useContext, CSSProperties } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'brace/theme/monokai';
import NavBar from "./NavBar";
import Footer from "./Footer";
import WelcomeModal from "./WelcomeModal";
import axios from "axios";
import Context from "../context/Context";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
}

const Editor = () => {
    const output = null;
    const baseURL = "https://judge0-ce.p.rapidapi.com/submissions";
    // const [resp, setResp] = useState("");
    const {
        getQuestion, setReceived, title, 
        problemStatement, getInput, extractExample, 
        loading, setLoading, exampleTwoOutput,
        exampleOneInput, exampleOneOutput, exampleTwoInput 
    } = useContext(Context);
    const [color, setColor] = useState("#ffffff");
    const [clickRun, setClickRun] = useState(false);
    const expectedOutput = useRef([])
    const resp = useRef([])


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

    function evaluateFirstExample(response){
        return response === exampleOneOutput.current ? 'Pass' : `Test failed, expected ${exampleOneOutput.current}`
    }

    function updateState(res){
        resp.current = res.data.stdout
        console.log('output', resp)
        expectedOutput.current = res.data.status.description
        console.log('expected', expectedOutput.current)
    }

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
                        console.log(res.data)
                        !res.data.stdout ? resp.current = res.data.stderr
                            : updateState(res)
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
            title.current = getQuestion.current[0].Title;
            problemStatement.current = getQuestion?.current[0].Problem
            exampleOneInput.current = getQuestion.current[0]["Example One Input"]
            exampleOneOutput.current = getQuestion.current[0]["Example One Output"]
            exampleTwoInput.current = getQuestion.current[0]["Example Two Input"]
            exampleTwoOutput.current = getQuestion.current[0]["Example Two Output"]
            setLoading(false)
        })
    }

    function splitExampleInputByComma(exampleInput){
        return exampleInput.split(/,(?![^\(\[]*[\]\)])/);
    }
    
    function inputArgs(exampleInput){
        const splitByCommaArr = splitExampleInputByComma(exampleInput)
        const resultArr = [];
        for(const elem of splitByCommaArr){
            resultArr.push(elem.match(/(=).*/)[0].replace("=","").replaceAll(" ", ""))
        }
        return resultArr
    }
    
    function varNames(exampleInput){
        const splitByCommaArr = splitExampleInputByComma(exampleInput)
        const resultArr = []
        for(const elem of splitByCommaArr){
            resultArr.push(elem.match(/[^=]*/)[0].replaceAll(" ",""))
        }
        return resultArr
    }
    
    function setFunctionArgs(exampleInput){
        const varArr = varNames(exampleInput)
        const inputArr = inputArgs(exampleInput)
        const scope = {}
        for (let i = 0; i < varArr.length; i++) {
            scope[varArr[i]] = inputArr[i]
        }
        return `const args = ${JSON.stringify(scope)}\n`
    }

    function runCode(e){
        e.preventDefault();
        requestBody.source_code = document.getElementsByClassName('ace_content')[0].innerText
        console.log('req', requestBody.source_code)
        requestBody.language_id = "63"
        requestBody.expected_output = exampleOneOutput.current
        console.log('what are we sending', requestBody)
        resp.current = ''
        sendCode(requestBody)
        setClickRun(true)        
    }
    
    return (
        <>
        {
            loading ? 
            <div className ="sweet-loading">
                <RingLoader
                    color="blue"
                    loading={loading}
                    cssOverride={override}
                    size={800}
                    aria-label="Loading Game"
                    data-testid="loader"
                />
            <WelcomeModal getEasyQuestion={getEasyQuestion} />
            </div> :
            <>
            <NavBar />
            <AceEditor
                defaultValue={setFunctionArgs(exampleOneInput.current)}
                mode="javascript"
                theme="monokai"
                name="editor"
                editorProps={{ $blockScrolling:true }}
                enableLiveAutocompletion={true}
                width={900}
            />
            <Footer runCode={runCode}/>
            </>
        }
        </>
    )
}

export default Editor;