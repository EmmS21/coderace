import React, { createContext, useState, useRef } from 'react';
import axios from 'axios';

const Context = createContext();

export default Context;

export const ContextProvider = ({ children }) => {
    const getQuestion = useRef({})
    const title = useRef([])
    const problemStatement = useRef([]);
    const exampleOneInput = useRef([]);
    const exampleOneOutput = useRef([]);
    const exampleTwoInput = useRef([]);
    const exampleTwoOutput = useRef([]);
    const expectedOutput = useRef([])
    const [received, setReceived] = useState(false)
    const [loading, setLoading] = useState(true);
    const resp = useRef([])
    const passedTest = useRef(0)
    const currentScore = useRef(0)


    function extractExample(challenge) {
        const constraintsIdx = challenge.indexOf("Constraints")
        const cleanExample = challenge.slice(0,constraintsIdx)
        const exampleArr = cleanExample.slice(3).split(/\S+(?=: )/g) 
        exampleArr.shift()
        console.log('example',exampleArr)
        return exampleArr[0]
    }

    function getInput(exampleInput){
        const exampleArr = exampleInput.split(', ')
        const examples = []
        exampleArr.map((eachEx) => {
            examples.push(eachEx.match(/= (.+)/)[1])
        })
        return examples
    }

    let contextData = {
        getQuestion:getQuestion,
        extractExample:extractExample,
        getInput:getInput,
        setReceived:setReceived,
        received: received,
        title: title,
        exampleOneInput: exampleOneInput,
        exampleOneOutput: exampleOneOutput,
        exampleTwoInput: exampleTwoInput,
        exampleTwoOutput: exampleTwoOutput, 
        problemStatement: problemStatement,
        loading: loading,
        setLoading: setLoading,
        resp: resp,
        expectedOutput: expectedOutput,
        passedTest:passedTest,
        currentScore: currentScore
    }

    return(
        <Context.Provider value={contextData} >
            { children }
        </Context.Provider>
    )

}