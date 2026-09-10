import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginUser from "./components/LoginUser";
import AdminConfig from "./components/AdminConfig";
import MenuForm from "./components/MenuForm";
import FichaAprovacao from "./components/FichaAprovacao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuForm />} />
        <Route path="/LoginUser" element={<LoginUser />} />
        <Route path="/admin-config" element={<AdminConfig />} />
        <Route path="/aprovacao/:equipamentoId" element={<FichaAprovacao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
