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
        <div className="exit-icon">
          <a className="exit-icon" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#000000"
            >
              <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
            </svg>
          </a>
        </div>
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
