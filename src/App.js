import React from "react";
import Editor from "./components/Editor";
import { ContextProvider } from './context/Context';
import './App.css';

function App() {
  return (
    <ContextProvider>
      <Editor/>
    </ContextProvider>
  );
}

export default App;
