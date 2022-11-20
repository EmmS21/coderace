import React, { useState, useEffect, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'brace/theme/monokai';
import NavBar from "./NavBar";
import Footer from "./Footer";
import WelcomeModal from "./WelcomeModal"
import axios from "axios";


const Editor = () => {
    const selectedLanguage = useRef(0)
    const output = null;
    const baseURL = "https://judge0-ce.p.rapidapi.com/submissions"

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

    // X-RapidAPI-Key = "b7d6b6780dmshe567233982bd7a4p1096c8jsn53ce4a3b5bec"

    // function sendCode(requestBody){
    //     axios.post(`${baseURL}`, requestBody, {
    //         headers
    //         })
    //         .then((res)=> {
    //             threeSecondWait().then(()=>{
    //                 axios.get(`${baseURL}/${res.data.token}`, {
    //                     headers
    //                 })
    //                 .then((res)=> {
    //                     setSpinnerOn(false)
    //                     !res.data.stdout ? setResp(res.data.stderr)
    //                         : setResp(res.data.stdout)
    //                 })
    //                 .catch((err)=> {
    //                     console.log('err',err)
    //                 })
    //             })
    //         })
    // }

    return (
        <>
        <NavBar selectedLanguage={selectedLanguage}/>
        <WelcomeModal />
        <AceEditor
            mode={selectedLanguage}
            theme="monokai"
            name="editor"
            editorProps={{ $blockScrolling:true }}
            enableLiveAutocompletion={true}
            width={900}
        />
        <Footer />
        </>
    )
}

export default Editor;