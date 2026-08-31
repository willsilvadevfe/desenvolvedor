import "./LoginUser.css";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (login === "Admin" && password === "Adm5858@") {
      navigate("/admin-config");
    } else {
      alert("Login ou senha incorretos, tente novamente.");
      window.location.reload();
    }
  };
  return (
    <div className="login-container">
      <form action="" className="login-form" onSubmit={handleSubmit}>
        <h1>Configurações</h1>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input type="text" id="login" name="login" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginUser;
