import React from "react";
import Editor from "./components/Editor";
import { ContextProvider } from './context/Context';

function App() {
  return (
    <ContextProvider>
      <Editor/>
    </ContextProvider>
  );
}

export default App;
