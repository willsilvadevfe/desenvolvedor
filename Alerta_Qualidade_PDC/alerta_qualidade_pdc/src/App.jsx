import { useState } from "react";
import "./App.css";
import Form from "../frontend/src/Form";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Form />
    </>
  );
}

export default App;
