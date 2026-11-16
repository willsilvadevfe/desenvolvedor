import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./index.css";
import Contato from "./Contato";
/* IMGS */
import Ballet from "./assets/dance/ballet.webp";
import Ballet2 from "./assets/dance/ballet2.webp";
import Breaking from "./assets/dance/breaking.webp";
import Contemporanea from "./assets/dance/contemporanea.webp";
import Sapateado from "./assets/dance/sapateado.webp";
import Jazz from "./assets/dance/jazz.webp";
import Ventre from "./assets/dance/ventre.webp";
import Banner from "./assets/dance/banner.jpg";
/* PROFESSORES */
import Professor1 from "./assets/professores/professor1.webp";
import Professor2 from "./assets/professores/professor2.webp";
import Professor3 from "./assets/professores/professor3.webp";
import Professor6 from "./assets/professores/professor6.webp";

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true }); // evita "pulos" quando a barra do navegador mobile some

/* ===== Conteúdo (edite à vontade) ===== */
const MENU = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Aulas", href: "#modalidades" },
  { label: "Contato", href: "#contato" },
];

const IMG = {
  hero1: Ballet2,
  hero2: Ballet,
  about: Ballet,
  banner: Banner,
  aulas: [Ballet2, Jazz, Contemporanea, Breaking, Ventre, Sapateado],
};

const AULAS = [
  {
    t: "Ballet Clássico",
    d: "Tradição e beleza em cada movimento, formando bailarinos com técnica, sensibilidade e expressão.",
  },
  {
    t: "Jazz",
    d: "O jazz combina energia, ritmo e expressão corporal, proporcionando movimentos dinâmicos que despertam a criatividade",
  },
  {
    t: "Dança Contemporânea",
    d: "Explore sua liberdade corporal, desenvolva consciência dos movimentos e descubra novas possibilidades artísticas.",
  },
  {
    t: "Street Dance",
    d: "Explore sua personalidade através de movimentos urbanos, coreografias marcantes e muita atitude.",
  },
  {
    t: "Dança do Ventre",
    d: "Descubra a beleza dos movimentos orientais e desenvolva coordenação, ritmo e consciência corporal.",
  },
  {
    t: "Sapateado",
    d: "Transforme cada passo em uma batida e descubra a musicalidade através dos movimentos dos pés.",
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
    foto: Professor6,
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
    foto: Professor3,
  },
  {
    aula: "Sapateado",
    nome: "Mauro Vilela",
    info: "Sáb · 10h",
    foto: Professor6,
  },
  {
    aula: "Dança do Ventre",
    nome: "Vanessa Campos",
    info: "Ter e Qui · 20h",
    foto: Professor2,
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

      /* 11.5 Parallax do banner (a foto desliza mais devagar que a página) */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".banner img",
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: ".banner",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

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
              <Words as="h1" className="hero-title" text="ESSENZA Studio" />
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

        {/* BANNER PARALLAX */}
        <section className="banner">
          <div className="banner-text container">
            <Words text="A vida tem seu ritmo. Encontre o seu." />
            <p>
              Mais do que passos, criamos experiências, despertamos talentos e
              celebramos a liberdade de se expressar. Do primeiro passo à
              realização de um sonho, aqui cada movimento conta uma história.
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
        <Contato />
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
