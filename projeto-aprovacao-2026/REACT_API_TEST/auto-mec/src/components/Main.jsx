import "./Main.css";
import Chevrolet from "../assets/img/Chevrolet.png";
import Toyota from "../assets/img/Toyota.png";
import Fiat from "../assets/img/Fiat.png";
import Ford from "../assets/img/Ford.png";
import Peugeot from "../assets/img/Peugeot.png";
import Nissan from "../assets/img/Nissan.png";
import Volkswagen from "../assets/img/Volkswagen.png"
const marcas = [
  { nome: "GM", logo: Chevrolet },
  { nome: "Toyota", logo: Toyota },
  { nome: "Fiat", logo: Fiat },
  { nome: "Ford", logo: Ford },
  { nome: "Nissan", logo: Nissan },
  { nome: "Volkswagen", logo: Volkswagen },
];

function Main() {
  const irParaContato = () => {
    const secao = document.getElementById("contato");
    if (secao) secao.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section id="sobre" className="cd-main">
        <div className="cd-main-texto">
          <h1>Referência quando o assunto é <span><br />mecânica automotiva.</span></h1>
          <p>
            Manutenção e revisão automotiva com quem entende do assunto.
            Agilidade, transparência e peças de qualidade para o seu carro
            voltar a rodar com segurança.
          </p>
          <div className="btn-main">
            <button className="cd-btn-contato" onClick={irParaContato}>
              Entrar em contato
            </button>
            <button className="cd-btn-contato" onClick={irParaContato}>
              Serviços
            </button>
          </div>
        </div>

        <div className="cd-main-imagem">
          <img
            src="/assets/mecanico-hero.jpg"
            alt="Mecânico realizando manutenção em um veículo"
          />
        </div>
      </section>

      <section className="cd-marcas">
        <div className="cd-marcas-esteira">
          {[...marcas, ...marcas].map((marca, index) => (
            <img
              key={`${marca.nome}-${index}`}
              src={marca.logo}
              alt={marca.nome}
              className="cd-marca-logo"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Main;
