import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./components/LoginUser";
import AdminConfig from "./components/AdminConfig";
import MenuForm from "./components/MenuForm";
import AprovacaoPrint from "./components/AprovacaoPrint";

function App() {
  return (
    <MenuForm />
    // <AprovacaoPrint/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LoginUser />} />
    //     <Route path="/admin-config" element={<AdminConfig />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
