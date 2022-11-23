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
import { fireEvent } from "@testing-library/react";
import { NumbersRounded, NumbersSharp } from "@mui/icons-material";

const override = {
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
    const [isComplete, setIsComplete] = useState(false)
    const [clickSubmit, setClickSubmit] = useState(false)
    const [isPass, setIsPass] = useState(true)
    const passedTest = useRef(0)
    const [passTest, setPassTest] = useState(false)
    const currentScore = useRef(0)

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
        "X-RapidAPI-Key": "b7d6b6780dmshe567233982bd7a4p1096c8jsn53ce4a3b5bec"
        // 'X-RapidAPI-Key': 'bcc33499f9msh5f6c898ed17eea7p121b52jsn76ceee08eab4'
    }

    const awaitToken = async () => {
        return await new Promise(resolve => resolve("result"));
    };

    useEffect(() => {
        if(passedTest === 2){
            setPassTest('You have passed the question')
            currentScore.current += 1
            setIsPass(0)
        }
    },[isPass])

    function updateState(res){
        resp.current = res.data.stdout
        console.log('!!!OUTPUT!!!', resp)
        expectedOutput.current = res.data.status.description
        if(expectedOutput.current === 'Accepted') {
            setIsPass(true)
            passedTest.current += 1
        } else{
            setIsPass(false)
        }
        console.log('!!!EXPECTED!!!', expectedOutput.current)
    }
    function handleError(res){
        resp.current = res.data.stderr
        setIsPass(false)
    }
    async function sendCode(requestBody, one){
        await axios.post(`${baseURL}`, requestBody, {
            headers
            })
            .then((res)=> {
                awaitToken().then(()=>{
                    axios.get(`${baseURL}/${res.data.token}`, {
                        headers
                    })
                    .then((res)=> {
                        console.log(res.data)
                        return !res.data.stdout ?  handleError(res)
                            : updateState(res)
                    })
                    .catch((err)=> {
                        console.log('err',err)
                    })
                })
            })
    }

    function getEasyQuestion(){
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
        const commaChecker = /,(?![^\(\[]*[\]\)])/
        return commaChecker.test(exampleInput) ? exampleInput.split(/,(?![^\(\[]*[\]\)])/) : [exampleInput];
    }
    
    function inputArgs(exampleInput){
        const splitByCommaArr = splitExampleInputByComma(exampleInput)
        const resultArr = [];
        for(const elem of splitByCommaArr){
            const matchedVals = elem.match(/(=).*/)[0].replace("=","").replaceAll(" ", "")
            resultArr.push(matchedVals)
        }
        return resultArr
    }
    
    function varNames(exampleInput){
        const splitByCommaArr = splitExampleInputByComma(exampleInput)
        const resultArr = []
        for(const elem of splitByCommaArr){
            const matchedVals = elem.match(/[^=]*/)[0].replaceAll(" ","")
            console.log(`matchedVal in varNames ${matchedVals}`) 
            resultArr.push(matchedVals)
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
        return `//Do not delete. You will need to use the object keys to access their values as your function arguments\n//You may have to convert some object values to strings, integers or arrays.\n//Have a look at the example in the question and check the type of the expected output \n const args = ${JSON.stringify(scope).replaceAll('\n','').replace(/\\/g, '')}
        \nfunction test (){\n//enter your code here \n\n\n}
        \n//pass your arguments here \nconsole.log(test())`
    }

    function evalRun(one){
        const exampleInputs = [exampleOneInput.current, exampleTwoInput.current]
        const exampleOutputs = [exampleOneOutput.current, exampleTwoOutput.current]
        const scope = {}
        const prevScope = {}
        const varArr = varNames(exampleInputs[one])
        const inputArr = inputArgs(exampleInputs[one])
        for (let i = 0; i < varArr.length; i++) {
            scope[varArr[i]] = inputArr[i]
        }
        const varArrOne = varNames(exampleInputs[one-1])
        const inputArrTwo = inputArgs(exampleInputs[one-1])
        for (let i = 0; i < varArrOne.length; i++) {
            prevScope[varArr[i]] = inputArrTwo[i]
        }   
        requestBody.source_code = document.getElementsByClassName('ace_content')[0].innerText.replace(/\\/g, '').replace(`const args = ${JSON.stringify(prevScope).replaceAll('\n','').replace(/\\/g, '')}`,`\nconst args = ${JSON.stringify(scope).replaceAll('\n','').replace(/\\/g, '')}`)
        requestBody.expected_output = exampleOutputs[one]
        resp.current = ''  
        sendCode(requestBody)
    }
 
    function runSubmit(e){
        e.preventDefault();
        setClickSubmit(true)
        evalRun(1)
        // while(numRuns.current < 2 && isPass === true){
        //     evalRun(numRuns)

        // // }
        // if(numRuns.current < 2){
        //     evalRun(numRuns.current)
        // }
        // if(numRuns === 2 && isComplete === true){
        //     numRuns.current = 0
        //     return
        //     // return getEasyQuestion()
        // }
    }

    // function testFun(currCode){
    //     console.log('TESTFUN', currCode)
    //     console.log('TESTFUN TYPEOF', typeof(currCode))
    //     // const newStr = currCode.replace('one', 'fifteen')
    //     return `//comment\n function(test){\n return}`
    // }


    function runCode(e){
        e.preventDefault();
        requestBody.source_code = document.getElementsByClassName('ace_content')[0].innerText
        console.log('req', requestBody.source_code)
        const output = exampleOneOutput.current === 'FALSE' || exampleOneOutput.current === 'TRUE'  ? exampleOneOutput.current.toLowerCase() : exampleOneOutput.current
        requestBody.expected_output = output
        console.log('what are we sending', requestBody)
        resp.current = ''
        passedTest.current = 0
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
            <NavBar setIsComplete={setIsComplete} />
            <AceEditor
                defaultValue={setFunctionArgs(exampleOneInput.current)}
                mode="javascript"
                theme="monokai"
                name="editor"
                editorProps={{ $blockScrolling:true }}
                enableLiveAutocompletion={true}
                width={900}
            />
            <Footer runCode={runCode} disableRun={setClickRun} runSubmit={runSubmit} passedTest={passedTest}/>
            </>
        }
        </>
    )
}

export default Editor;