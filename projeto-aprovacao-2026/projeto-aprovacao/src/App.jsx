import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginUser from "./components/LoginUser";
import AdminConfig from "./components/AdminConfig";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/admin-config" element={<AdminConfig />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
