import "./LoginUser.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginSvg from "../assets/img/login.svg";
import "./SweetAlert.css";

const LoginUser = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (login === "Admin" && password === "Adm5858@") {
      //Alerta de sucesso com sweetalert com timer e vai para a página de configurações
      Swal.fire({
        title: "Login bem-sucedido",
        text: "Você será redirecionado para a página de configurações.",
        icon: "success",
        iconColor: "#2563eb",
        timer: 2000,
        showConfirmButton: false,

        customClass: {
          popup: "meu-swal",
          title: "meu-swal-title",
          htmlContainer: "meu-swal-text",
        },
      }).then(() => {
        navigate("/admin-config");
      });
      return;
    }
    if (login === "" || password === "") {
      Swal.fire({
        title: "Preencha todos os campos.",
        text: "Por favor, insira seu login e senha.",
        icon: "error",
        iconColor: "#ef4444",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#2563eb",

        customClass: {
          popup: "meu-swal",
          title: "meu-swal-title",
          htmlContainer: "meu-swal-text",
        },
      }).then(() => {
        window.location.reload();
      });
    } else {
      //Recarregar página após clicar em Ok no alerta
      Swal.fire({
        title: "Login ou senha incorretos",
        text: "Por favor, verifique suas credenciais e tente novamente.",
        icon: "error",
        iconColor: "#ef4444",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#2563eb",

        customClass: {
          popup: "meu-swal",
          title: "meu-swal-title",
          htmlContainer: "meu-swal-text",
        },
      }).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>
          Sistema de configuração<br></br> <span>de usuários</span>
        </h2>
        <img src={LoginSvg} alt="Login" className="login-svg" />
      </div>
      <form action="" className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="login">Usuário</label>
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
