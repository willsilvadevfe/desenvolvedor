import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./index.css";
/* IMGS */
import Ballet from "./assets/ballet.jpg";
import Hero1 from "./assets/header1.jpg";
import Hero2 from "./assets/header2.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true }); // evita "pulos" quando a barra do navegador mobile some

/* ===== Conteúdo (edite à vontade) ===== */
const MENU = [
  { label: "Início", href: "#inicio" },
  { label: "Item 2", href: "#sobre" },
  { label: "Item 3", href: "#modalidades" },
  { label: "Item 4", href: "#contato" },
];

// Coloque as fotos do Unsplash em /public/img com estes nomes
const IMG = {
  hero1: Hero1,
  hero2: Hero2,
  about: Ballet,
  banner: "/img/banner.jpg",
  aulas: [
    "/img/aula-1.jpg",
    "/img/aula-2.jpg",
    "/img/aula-3.jpg",
    "/img/aula-4.jpg",
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
    t: "Danças Urbanas",
    d: "Duis aute irure dolor in reprehenderit in voluptate.",
  },
];

const PROFESSORES = [
  {
    aula: "Ballet Clássico",
    nome: "Nome do Professor",
    info: "Seg e Qua · 18h",
    foto: "/img/prof-1.jpg",
  },
  {
    aula: "Jazz",
    nome: "Nome da Professora",
    info: "Ter e Qui · 19h",
    foto: "/img/prof-2.jpg",
  },
  {
    aula: "Hip Hop",
    nome: "Nome do Professor",
    info: "Seg e Qua · 20h",
    foto: "/img/prof-3.jpg",
  },
  {
    aula: "Dança Contemporânea",
    nome: "Nome da Professora",
    info: "Sex · 18h",
    foto: "/img/prof-4.jpg",
  },
  {
    aula: "Sapateado",
    nome: "Nome do Professor",
    info: "Sáb · 10h",
    foto: "/img/prof-5.jpg",
  },
  {
    aula: "Dança do Ventre",
    nome: "Nome da Professora",
    info: "Ter e Qui · 20h",
    foto: "/img/prof-6.jpg",
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

const Img = ({ src, alt = "" }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
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
    return () => window.removeEventListener("load", refresh);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

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
        },
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
            Aura<span>.</span>
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
            Aura<span>.</span>
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
          <p>Rua Exemplo, 123 — Cidade/UF</p>
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
                text="Dance com leveza, viva com intensidade"
              />
              <p className="hero-sub hero-fade">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
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
                <Img src={IMG.hero1} alt="Bailarina" />
              </div>
              <div className="hero-img b">
                <Img src={IMG.hero2} alt="Aula de dança" />
              </div>
              <div className="badge">
                +10
                <br />
                anos de arte
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
              <Words text="Um espaço feito para o seu movimento" />
              <p data-fade>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation.
              </p>
              <div className="stats" data-fade>
                <div className="stat">
                  <strong data-count="12" data-suffix="+">
                    0
                  </strong>
                  <span>Anos</span>
                </div>
                <div className="stat">
                  <strong data-count="800" data-suffix="+">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Role
                  para conhecer as aulas →
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
          <Img src={IMG.banner} alt="" />
          <div className="banner-text container">
            <Words text="A dança transforma quem somos" />
          </div>
        </section>
        {/* o parallax usa a <img> dentro do banner */}
        <ParallaxBinder />

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
          <span>© 2026 Aura Dança</span>
          <span>Rua Nagazaki, 86 — São José dos Campos/SP</span>
        </div>
      </footer>
    </div>
  );
}

/* Liga o parallax à imagem do banner sem precisar de ref extra */
function ParallaxBinder() {
  useGSAP(() => {
    const img = document.querySelector(".banner img");
    if (!img) return;
    gsap.to(img, {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: ".banner",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  return null;
}
