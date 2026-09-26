import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Main.css";
import Chevrolet from "../assets/img/Chevrolet.png";
import Toyota from "../assets/img/Toyota.png";
import Fiat from "../assets/img/Fiat.png";
import Ford from "../assets/img/Ford.png";
import Peugeot from "../assets/img/Peugeot.png";
import Nissan from "../assets/img/Nissan.png";
import Volkswagen from "../assets/img/Volkswagen.png";
import Mecanico from "../assets/img/img-mec.svg";

gsap.registerPlugin(ScrollTrigger);

const marcas = [
  { nome: "GM", logo: Chevrolet },
  { nome: "Toyota", logo: Toyota },
  { nome: "Fiat", logo: Fiat },
  { nome: "Ford", logo: Ford },
  { nome: "Nissan", logo: Nissan },
  { nome: "Volkswagen", logo: Volkswagen },
  { nome: "Peugeot", logo: Peugeot },
];

const criterios = [
  {
    titulo: "Diagnóstico preciso",
    texto: "Identificamos a causa real antes de qualquer troca.",
    cor: "var(--success)",
    icone: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <line x1="20" y1="20" x2="15.5" y2="15.5" />
      </svg>
    ),
  },
  {
    titulo: "Peças de procedência",
    texto: "Só usamos peças confiáveis, sem atalho.",
    cor: "var(--secondary)",
    icone: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    titulo: "Garantia no serviço",
    texto: "Todo reparo sai daqui com garantia por escrito.",
    cor: "var(--accent)",
    icone: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" />
        <path d="M8.5 14 7 21l5-2.5L17 21l-1.5-7" />
      </svg>
    ),
  },
  {
    titulo: "Prazo cumprido",
    texto: "O prazo combinado é o prazo entregue.",
    cor: "var(--warning)",
    icone: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    titulo: "Atendimento transparente",
    texto: "Você acompanha cada etapa, sem letra miúda.",
    cor: "var(--secondary)",
    icone: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v11H8l-4 4V5z" />
      </svg>
    ),
  },
  {
    titulo: "Preço justo",
    texto: "Orçamento fechado antes de começar, sem surpresa depois.",
    cor: "var(--success)",
    icone: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3h7v7L8 21l-7-7L12 3z" />
        <circle cx="15.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function Main() {
  const rootRef = useRef(null);
  const mainRef = useRef(null);
  const imagemWrapRef = useRef(null);
  const marcasRef = useRef(null);
  const motorRef = useRef(null);
  const bancadaRef = useRef(null);

  const irParaContato = () => {
    const secao = document.getElementById("contato");
    if (secao) secao.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const prefereMenosMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefereMenosMovimento) return;

      // --- Entrada do hero (uma única sequência ao carregar) ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".cd-main-texto h1", { opacity: 0, y: 28, duration: 0.7 })
        .from(".cd-main-texto p", { opacity: 0, y: 22, duration: 0.6 }, "-=0.4")
        .from(".cd-main-texto button", { opacity: 0, y: 18, duration: 0.5 }, "-=0.35")
        .from(".cd-main-imagem", { opacity: 0, x: 36, duration: 0.8 }, "-=0.6");

      // --- Parallax suave da imagem do hero, seguindo o mouse ---
      const imagemEl = imagemWrapRef.current;
      if (imagemEl) {
        const aoMoverMouse = (e) => {
          const bounds = mainRef.current.getBoundingClientRect();
          const relX = (e.clientX - bounds.left) / bounds.width - 0.5;
          const relY = (e.clientY - bounds.top) / bounds.height - 0.5;
          gsap.to(imagemEl, {
            x: relX * 18,
            y: relY * 14,
            duration: 0.6,
            ease: "power3.out",
          });
        };
        const aoSairMouse = () => {
          gsap.to(imagemEl, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
        };
        mainRef.current.addEventListener("mousemove", aoMoverMouse);
        mainRef.current.addEventListener("mouseleave", aoSairMouse);
      }

      // --- Esteira de marcas: revela ao entrar na tela ---
      gsap.from(marcasRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: marcasRef.current,
          start: "top 88%",
          once: true,
        },
      });

      // --- Cilindros: disparam em sequência quando a bancada entra na tela ---
      const cilindros = gsap.utils.toArray(".cilindro");
      gsap.set(cilindros, { opacity: 0, y: 46, rotateX: -18, transformPerspective: 700 });
      gsap.to(cilindros, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: bancadaRef.current,
          start: "top 78%",
          once: true,
        },
      });

      // --- Tilt 3D leve em cada cilindro no hover ---
      cilindros.forEach((el) => {
        const aoMover = (e) => {
          const b = el.getBoundingClientRect();
          const px = (e.clientX - b.left) / b.width - 0.5;
          const py = (e.clientY - b.top) / b.height - 0.5;
          gsap.to(el, {
            rotateY: px * 14,
            rotateX: -py * 14,
            y: -6,
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const aoSair = () => {
          gsap.to(el, { rotateY: 0, rotateX: 0, y: 0, duration: 0.5, ease: "power2.out" });
        };
        el.addEventListener("mousemove", aoMover);
        el.addEventListener("mouseleave", aoSair);
      });

      // --- Botão de contato: leve efeito magnético ---
      const botao = document.querySelector(".learn-more");
      if (botao) {
        const aoMoverBotao = (e) => {
          const b = botao.getBoundingClientRect();
          gsap.to(botao, {
            x: (e.clientX - b.left - b.width / 2) * 0.18,
            y: (e.clientY - b.top - b.height / 2) * 0.35,
            duration: 0.4,
            ease: "power2.out",
          });
        };
        const aoSairBotao = () => {
          gsap.to(botao, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        };
        botao.addEventListener("mousemove", aoMoverBotao);
        botao.addEventListener("mouseleave", aoSairBotao);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <section id="sobre" className="cd-main" ref={mainRef}>
        <div className="cd-main-texto">
          <h1>
            Referência quando o assunto é{" "}
            <span>
              <br />
              mecânica automotiva.
            </span>
          </h1>
          <p>
            Manutenção e revisão automotiva com quem entende do assunto.
            Agilidade, transparência e peças de qualidade para o seu carro
            voltar a rodar com segurança.
          </p>

          <button className="learn-more" onClick={irParaContato}>
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Contato</span>
          </button>
        </div>

        <div className="cd-main-imagem" ref={imagemWrapRef}>
          <img
            src={Mecanico}
            alt="Mecânico realizando manutenção em um veículo"
            width={500}
          />
        </div>
      </section>

      <section className="cd-marcas">
        <div className="cd-marcas-esteira" ref={marcasRef}>
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

      <section className="motor-section" ref={motorRef}>
        <div className="motor-glow" />

        <svg className="motor-blueprint" viewBox="0 0 720 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="150" width="640" height="60" rx="10" fill="none" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="60" y1="180" x2="660" y2="180" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
          {[95, 200, 305, 410, 515, 620].map((x, i) => (
            <g key={i} className="pistao">
              <rect x={x - 26} y="60" width="52" height="90" rx="6" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx={x} cy="105" r="16" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <line x1={x} y1="150" x2={x} y2="180" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx={x} cy="180" r="6" fill="#ffffff" />
            </g>
          ))}
        </svg>

        <div className="motor-conteudo">
          <div className="motor-cabecalho">
            <h2>
              O motor por trás da <span>nossa qualidade</span>
            </h2>
            <p>Critérios que rodam em toda ordem de serviço, sem exceção.</p>
          </div>

          <div className="motor-bancada" ref={bancadaRef}>
            {criterios.map((c) => (
              <div className="cilindro" key={c.titulo} tabIndex={0}>
                <div className="cilindro-icone" style={{ "--cor-icone": c.cor }}>
                  {c.icone}
                </div>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;