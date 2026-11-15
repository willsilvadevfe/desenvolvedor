import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./index.css";
/* IMGS */
import Ballet from "./assets/ballet.jpg";
import Hero1 from "./assets/header1.jpg";
import Hero2 from "./assets/header2.jpg";

import DanceBallet from "./assets/dance/ballet.jpg";
import DanceBreaking from "./assets/dance/breaking.jpg";
import DanceContemporanea from "./assets/dance/danca-contemporanea.jpg";
import DanceVentre from "./assets/dance/danca-ventre.jpg";
import DanceJazz from "./assets/dance/jazz.jpg";
import DanceSapateado from "./assets/dance/sapateado.jpg";
import Professor1 from "./assets/professores/professor1.jpg";
import Professor2 from "./assets/professores/professor2.jpg";
import Professor3 from "./assets/professores/professor3.jpg";
import Professor4 from "./assets/professores/professor4.jpg";
import Professor5 from "./assets/professores/professor5.jpg";
import Professor6 from "./assets/professores/professor6.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true }); // evita "pulos" quando a barra do navegador mobile some

/* ===== Conteúdo (edite à vontade) ===== */
const MENU = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Aulas", href: "#modalidades" },
  { label: "Contato", href: "#contato" },
];

// Coloque as fotos do Unsplash em /public/img com estes nomes
const IMG = {
  hero1: Hero1,
  hero2: Hero2,
  about: Ballet,
  banner: DanceBreaking,
  aulas: [
    DanceBallet,
    DanceJazz,
    DanceContemporanea,
    DanceBreaking,
    DanceVentre,
    DanceSapateado,
  ],
};

const AULAS = [
  {
    t: "Ballet Clássico",
    d: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  { t: "Jazz", d: "Sed do eiusmod tempor incididunt ut labore et dolore." },
  {
    t: "Dança Contemporânea",
    d: "Ut enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    t: "Breaking Dance",
    d: "Duis aute irure dolor in reprehenderit in voluptate.",
  },
  {
    t: "Dança do Ventre",
    d: "Duis aute irure dolor in reprehenderit in voluptate.",
  },
  {
    t: "Sapateado",
    d: "Duis aute irure dolor in reprehenderit in voluptate.",
  },
];

const PROFESSORES = [
  {
    aula: "Ballet Clássico",
    nome: "Vanessa Campos",
    info: "Seg e Qua · 18h",
    foto: Professor2,
  },
  {
    aula: "Jazz",
    nome: "Mauro Vilela",
    info: "Ter e Qui · 19h",
    foto: Professor3,
  },
  {
    aula: "Breaking Dance",
    nome: "Jonas Souza",
    info: "Seg e Qua · 20h",
    foto: Professor1,
  },
  {
    aula: "Dança Contemporânea",
    nome: "Elizabete Todeschini",
    info: "Sex · 18h",
    foto: Professor4,
  },
  {
    aula: "Sapateado",
    nome: "Mauro Naves",
    info: "Sáb · 10h",
    foto: Professor6,
  },
  {
    aula: "Dança do Ventre",
    nome: "Gabriela Almeida",
    info: "Ter e Qui · 20h",
    foto: Professor5,
  },
];

const MARQUEE = [
  "Ballet",
  "Jazz",
  "Contemporâneo",
  "Hip Hop",
  "Sapateado",
  "Dança do Ventre",
];

// true = respeita quem desativou animações no sistema (recomendado em produção).
// Coloque false para TESTAR o efeito mesmo se o seu Windows/Mac estiver com animações reduzidas.
const RESPECT_REDUCED_MOTION = true;

const STAGE_TEXT =
  "A dança não pede palavras.\nEla começa no primeiro passo,\ncresce no ritmo\ne fica no corpo para sempre.";
const STAGE_WORDS = [
  "Ballet",
  "Jazz",
  "Contemporâneo",
  "Breaking",
  "Dança do Ventre",
  "Sapateado",
];

/* ===== Helpers ===== */
const Words = ({ text, as: Tag = "h2", className = "" }) => (
  <Tag className={`split ${className}`} aria-label={text}>
    {text.split(" ").map((w, i) => (
      <span className="w" key={i} aria-hidden="true">
        <span className="wi">{w}</span>
      </span>
    ))}
  </Tag>
);

const Img = ({ src, alt = "", eager = false }) => (
  <img
    src={src}
    alt={alt}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    onError={(e) => (e.currentTarget.style.display = "none")}
  />
);

export default function App() {
  const root = useRef(null);
  const cursor = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      /* 1. Intro do hero (text reveal + imagens com clip-path) */
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".hero h1 .wi", { yPercent: 115, duration: 1.2, stagger: 0.08 })
        .from(
          ".hero-img.a",
          { clipPath: "inset(100% 0 0 0)", duration: 1.3 },
          0.2,
        )
        .from(
          ".hero-img.b",
          { clipPath: "inset(100% 0 0 0)", duration: 1.3 },
          0.5,
        )
        .from(
          ".hero-fade",
          { y: 30, opacity: 0, duration: 0.9, stagger: 0.12 },
          0.7,
        )
        .from(".badge", { scale: 0, duration: 1, ease: "back.out(1.7)" }, 1.1);

      /* 2. Barra de progresso de leitura */
      gsap.to(".progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      /* 3. Header some ao rolar para baixo e volta ao subir */
      ScrollTrigger.create({
        start: 80,
        end: "max",
        onUpdate: (self) =>
          document
            .querySelector(".header")
            ?.classList.toggle(
              "hide",
              self.direction === 1 && self.scroll() > 200,
            ),
      });

      /* 4. Text reveal por palavra nos títulos */
      gsap.utils.toArray(".split:not(.hero-title)").forEach((el) => {
        gsap.from(el.querySelectorAll(".wi"), {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      /* 5. Fade up genérico */
      gsap.utils.toArray("[data-fade]").forEach((el, i) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      /* 6. Image reveal (máscara + zoom out) */
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        tl.from(el, {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
        });
        if (img)
          tl.from(img, { scale: 1.4, duration: 1.6, ease: "power3.out" }, 0);
      });

      /* 7. Parallax em imagens */
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.parallax),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      /* 8. Elementos flutuantes */
      gsap.to(".hero-img.b", {
        y: -18,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* 9. Contadores */
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const obj = { v: 0 };
        gsap.to(obj, {
          v: Number(el.dataset.count),
          duration: 2,
          ease: "power2.out",
          onUpdate: () =>
            (el.textContent = Math.round(obj.v) + (el.dataset.suffix || "")),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      /* 10. Marquee infinito (a velocidade reage ao scroll) */
      const marquee = gsap.to(".marquee-track", {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
      ScrollTrigger.create({
        onUpdate: (self) => {
          gsap.to(marquee, {
            timeScale: 1 + Math.abs(self.getVelocity()) / 300,
            duration: 0.2,
            overwrite: true,
          });
          gsap.to(marquee, {
            timeScale: self.direction,
            duration: 1.2,
            delay: 0.2,
          });
        },
      });

      /* 11. Scroll horizontal com pin (desktop e mobile) */
      const track = document.querySelector(".hs-track");
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: ".hs-wrap",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + dist(),
          invalidateOnRefresh: true,
          anticipatePin: 1,
          refreshPriority: 2,
        },
      });

      /* 11.5 Palco: holofote (scroll) + texto digitado por tempo, iniciado ao chegar.
         Fica depois do scroll horizontal para os pins serem calculados na ordem certa */
      const stage = q(".stage")[0];
      if (stage) {
        const typedEl = stage.querySelector(".stage-typed-text");
        const bg = stage.querySelector(".stage-bg");
        const spotEl = stage.querySelector(".stage-spot");
        const wordsRow = stage.querySelector(".stage-words");
        const words = stage.querySelectorAll(".stage-cycle span");

        const total = STAGE_TEXT.length;
        const spot = { r: 16, x: 50, y: 50 }; // raio (vmax) e posição (%) do holofote
        const typing = { n: 0 };

        const paint = () => {
          spotEl.style.setProperty("--sr", spot.r + "vmax");
          spotEl.style.setProperty("--sx", spot.x + "%");
          spotEl.style.setProperty("--sy", spot.y + "%");
        };
        const renderTyping = () => {
          typedEl.textContent = STAGE_TEXT.slice(0, Math.round(typing.n));
        };

        mm.add(
          RESPECT_REDUCED_MOTION
            ? "(prefers-reduced-motion: no-preference)"
            : "all",
          () => {
          // estado inicial: escuro, texto vazio, palavras escondidas
          typing.n = 0;
          renderTyping();
          paint();
          gsap.set(words, { yPercent: 110 });
          gsap.set(wordsRow, { opacity: 0 });
          gsap.set(bg, { scale: 1.25 });

          /* A) holofote + cor da foto: acompanham a rolagem (scrub) */
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: stage,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                refreshPriority: 1,
              },
            })
            .to(spot, { r: 120, ease: "power1.inOut", onUpdate: paint }, 0)
            .to(bg, { scale: 1 }, 0);

          /* B) texto digitado + troca de palavras: rodam por TEMPO,
                começam só quando a seção chega na tela */
          const typeTl = gsap.timeline({ paused: true });
          typeTl
            .to(typing, {
              n: total,
              duration: 5.5,
              ease: "none",
              onUpdate: renderTyping,
            })
            .to(wordsRow, { opacity: 1, duration: 0.5 }, "+=0.3");

          words.forEach((w, i) => {
            typeTl.to(w, { yPercent: 0, duration: 0.45, ease: "power3.out" });
            if (i < words.length - 1) {
              typeTl.to(w, {
                yPercent: -110,
                duration: 0.4,
                ease: "power3.in",
                delay: 1.1,
              });
            }
          });

          ScrollTrigger.create({
            trigger: stage,
            start: "top 15%",
            onEnter: () => {
              // ignora disparos falsos durante o carregamento (layout ainda mudando)
              if (window.scrollY < 100) return;
              typeTl.restart(); // chegou: começa a escrever
            },
            onLeaveBack: () => {
              // voltou para cima: zera para escrever de novo na próxima vez
              typeTl.pause(0);
              typing.n = 0;
              renderTyping();
            },
          });

          // o holofote segue o mouse (só em telas com mouse)
          const mmMove = gsap.matchMedia();
          mmMove.add("(pointer: fine)", () => {
            const onMove = (e) =>
              gsap.to(spot, {
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
                duration: 0.7,
                ease: "power3.out",
                overwrite: "auto",
                onUpdate: paint,
              });
            stage.addEventListener("mousemove", onMove);
            return () => stage.removeEventListener("mousemove", onMove);
          });
          return () => mmMove.revert();
          },
        );

        // quem prefere menos movimento vê tudo já pronto
        mm.add(RESPECT_REDUCED_MOTION ? "(prefers-reduced-motion: reduce)" : "not all", () => {
          console.warn(
            "[Palco] Seu sistema está com 'reduzir movimento' ligado, então o efeito foi desativado. Para testar, use RESPECT_REDUCED_MOTION = false no App.jsx.",
          );
          typedEl.textContent = STAGE_TEXT;
          spot.r = 120;
          paint();
          gsap.set(words, { yPercent: 110 });
          gsap.set(words[words.length - 1], { yPercent: 0 });
        });
      }

      /* 12. Cursor customizado */
      mm.add("(pointer: fine)", () => {
        const xTo = gsap.quickTo(cursor.current, "x", {
          duration: 0.35,
          ease: "power3",
        });
        const yTo = gsap.quickTo(cursor.current, "y", {
          duration: 0.35,
          ease: "power3",
        });
        const move = (e) => {
          gsap.to(cursor.current, { opacity: 1, duration: 0.3 });
          xTo(e.clientX);
          yTo(e.clientY);
        };
        const over = (e) =>
          gsap.to(cursor.current, {
            scale: e.target.closest("a, button, .card") ? 3.2 : 1,
            duration: 0.3,
          });
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        return () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseover", over);
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const marqueeItems = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];

  return (
    <div ref={root}>
      <div className="progress" />
      <div className="cursor" ref={cursor} />

      {/* HEADER */}
      <header className="header">
        <div className="container">
          <a href="#inicio" className="logo">
            ESSENZA<span>.</span>
          </a>
          <nav className="nav">
            {MENU.map((m) => (
              <a key={m.label} href={m.href}>
                {m.label}
              </a>
            ))}
          </nav>
          <button
            className={`burger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <i />
            <i />
          </button>
        </div>
      </header>
      <div
        className={`backdrop ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <aside className={`offcanvas ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="oc-top">
          <span className="logo">
            ESSENZA<span>.</span>
          </span>
          <button
            className="oc-close"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <i />
            <i />
          </button>
        </div>
        <nav className="oc-links">
          {MENU.map((m, i) => (
            <a key={m.label} href={m.href} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>
              {m.label}
            </a>
          ))}
        </nav>
        <div className="oc-foot">
          <a
            href="#contato"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            Aula experimental
          </a>
          <p>Rua Nagazaki, 86 — São José dos Campos/SP</p>
        </div>
      </aside>

      <main>
        {/* HERO */}
        <section className="hero" id="inicio">
          <div className="container">
            <div>
              <span className="eyebrow hero-fade">Escola de Dança</span>
              <Words
                as="h1"
                className="hero-title"
                text="Seu corpo, sua história, seu movimento"
              />
              <p className="hero-sub hero-fade">
                Do primeiro passo à evolução constante, encontre aulas,
                aprendizado e inspiração para viver a dança no seu próprio
                ritmo.
              </p>
              <div className="hero-actions hero-fade">
                <a href="#contato" className="btn btn-primary">
                  Aula experimental
                </a>
                <a href="#modalidades" className="btn btn-ghost">
                  Ver modalidades
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-img a">
                <Img src={IMG.hero1} alt="Bailarina" eager />
              </div>
              <div className="hero-img b">
                <Img src={IMG.hero2} alt="Aula de dança" eager />
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {marqueeItems.map((m, i) => (
              <span key={i}>{m} ✦</span>
            ))}
          </div>
        </div>

        {/* SOBRE */}
        <section className="section about" id="sobre">
          <div className="container">
            <div className="mask" data-reveal>
              <Img src={IMG.about} alt="Estúdio" />
            </div>
            <div>
              <span className="eyebrow" data-fade>
                Sobre nós
              </span>
              <Words text="Mais que uma academia, um espaço para se expressar." />
              <p data-fade>
                Acreditamos que a dança vai muito além dos movimentos. É uma
                forma de expressão, conexão e liberdade. Nosso propósito é
                proporcionar um ambiente acolhedor e inspirador, onde cada
                pessoa possa descobrir seu potencial, desenvolver suas
                habilidades e transformar sua paixão pela dança em experiências
                inesquecíveis.
              </p>
              <div className="stats" data-fade>
                <div className="stat">
                  <strong data-count="10" data-suffix="+">
                    0
                  </strong>
                  <span>Anos de história</span>
                </div>
                <div className="stat">
                  <strong data-count="400" data-suffix="+">
                    0
                  </strong>
                  <span>Alunos</span>
                </div>
                <div className="stat">
                  <strong data-count="15">0</strong>
                  <span>Professores</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODALIDADES: scroll horizontal */}
        <section className="hs" id="modalidades">
          <div className="hs-wrap">
            <div className="hs-track">
              <div className="hs-intro">
                <span className="eyebrow">Modalidades</span>
                <Words text="Encontre o seu ritmo" />
                <p>
                  Explore diferentes estilos de dança, desenvolva novas
                  habilidades e descubra novas formas de se expressar. Temos
                  modalidades para diferentes perfis, níveis e objetivos, sempre
                  com movimento, dedicação e muita paixão pela dança.
                </p>
              </div>
              {AULAS.map((a, i) => (
                <article className="card" key={a.t}>
                  <div className="card-img">
                    <Img src={IMG.aulas[i]} alt={a.t} />
                  </div>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PALCO: holofote + texto digitado */}
        <section className="stage" aria-label="A dança em palavras">
          <div
            className="stage-bg"
            style={{ backgroundImage: `url(${IMG.banner})` }}
          />
          <div className="stage-spot" />
          <div className="stage-content container">
            <p
              className="stage-typed"
              aria-label={STAGE_TEXT.replace(/\n/g, " ")}
            >
              <span className="stage-typed-text" aria-hidden="true" />
              <span className="stage-caret" aria-hidden="true" />
            </p>
            <p className="stage-words" aria-hidden="true">
              <span className="stage-prefix">Hoje é dia de</span>
              <span className="stage-cycle">
                {STAGE_WORDS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </span>
            </p>
          </div>
        </section>

        {/* PROFESSORES */}
        <section className="section">
          <div className="container">
            <span className="eyebrow" data-fade>
              Nossas aulas
            </span>
            <Words text="Quem conduz cada aula" />
            <div className="team-grid">
              {PROFESSORES.map((p) => (
                <article className="team" key={p.aula} data-fade>
                  <div className="team-photo">
                    <Img src={p.foto} alt={p.nome} />
                  </div>
                  <div>
                    <small>Professor(a) responsável</small>
                    <h3>{p.aula}</h3>
                    <p>
                      {p.nome}
                      <br />
                      {p.info}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section cta" id="contato">
          <div className="container">
            <Words text="Pronta para o primeiro passo?" />
            <p data-fade>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Agende
              sua aula experimental.
            </p>
            <a href="#" className="btn btn-primary" data-fade>
              Agendar agora
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <span>© 2026 ESSENZA Dança</span>
          <span>Rua Nagazaki, 86 — São José dos Campos/SP</span>
        </div>
      </footer>
    </div>
  );
}