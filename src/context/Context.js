import React, { createContext, useState, useRef } from 'react';
import axios from 'axios';

const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
    const getQuestion = useRef({})
    const title = useRef([])
    const example =  useRef([]);
    const problemStatement = useRef([]);

    const [received, setReceived] = useState(false)

    function extractExample(challenge) {
        const constraintsIdx = challenge.indexOf("Constraints")
        const cleanExample = challenge.slice(0,constraintsIdx)
        const exampleArr = cleanExample.slice(3).split(/\S+(?=: )/g) 
        exampleArr.shift()
        return exampleArr[0]
    }

    function getInput(exampleInput){
        const input = exampleInput.match(/= (.+)/)[1]
        return input
    }

    let contextData = {
        getQuestion:getQuestion,
        extractExample:extractExample,
        getInput:getInput,
        setReceived:setReceived,
        received: received,
        title: title,
        example: example,
        problemStatement: problemStatement
    }

    return(
        <Context.Provider value={contextData} >
            { children }
        </Context.Provider>
    )

}