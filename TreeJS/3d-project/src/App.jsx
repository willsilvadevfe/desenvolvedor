import { Suspense, useEffect, useId, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Preload,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import "./App.css";

const MODEL_URL = "/star-opt.glb";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =====================================================================
   MOVIMENTAÇÃO DO COPO  (é aqui que você altera tudo)
   ---------------------------------------------------------------------
   Cada item de STOPS é uma "parada": hero, section1, section2, section3
   e a section final (escura). O copo viaja de uma parada para a próxima
   conforme você rola a página.

   x       posição horizontal: -1 = esquerda, 0 = meio, 1 = direita
   y       altura (0 = centro da tela, negativo = mais para baixo)
   yMobile altura no celular (copo no topo, texto embaixo)
   scale   tamanho do copo (1 = normal)
   rot     orientação em VOLTAS (1 = 360°, 0.5 = 180°, 0.25 = 90°)
             rot.x -> mortal (cambalhota). Cada +1 = 1 mortal
             rot.y -> giro em torno do próprio eixo (parafuso)
             rot.z -> inclinação de lado

   Onde o copo PARA, olhando para:
     rot.y = 0 (ou 1, 2...)  de frente
     rot.y = 0.25            de lado (esquerda)
     rot.y = 0.5             de costas
     rot.y = 0.75            de lado (direita)
   ===================================================================== */
const STOPS = [
  // hero (verde): no meio, de frente
  { x: 0, y: 0, yMobile: 1.1, scale: 1, rot: { x: 0, y: 0, z: 0 } },
  // section1 (branca): esquerda
  { x: -1, y: 0, yMobile: 1.1, scale: 1, rot: { x: 1, y: 0, z: 0 } },
  // section2 (verde): direita
  { x: 1, y: 0, yMobile: 1.1, scale: 1, rot: { x: 2, y: 0, z: 0 } },
  // section3 (branca): esquerda
  { x: -1, y: 0, yMobile: 1.1, scale: 1, rot: { x: 3, y: 0, z: 0 } },
  // section final (escura): no meio, menor e mais baixo para não bater no título
  { x: 0, y: -0.35, yMobile: 0, scale: 0.8, rot: { x: 4, y: 0, z: 0 } },
];

// Correção da orientação do .glb (em voltas). O seu nasce de costas, então 0.5 = gira 180°
// para o logo ficar de frente. Se o logo aparecer de lado, tente 0.25 ou 0.75.
const MODEL_YAW = 0.5;

const SIDE = 0.26; // quão longe das bordas o copo para (fração da largura da tela)
const DIP = 0.9; // quanto ele desce no meio da transição (0 = não desce)
const SMOOTH = 5; // suavidade: menor = mais "preguiçoso", maior = mais colado ao scroll
const TURN = Math.PI * 2; // não mexer: converte "voltas" em radianos

// Progresso do scroll de 0 (topo) a 1 (fim da página)
function getScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
}

/* =====================================================================
   DETALHES GRÁFICOS DAS SECTIONS (ficam sob o copo)
   A cor vem do CSS (currentColor). O ponto dourado usa --gold.
   ===================================================================== */

/* Selo de torrefação: texto em círculo girando devagar + anéis finos */
const BADGE_TEXT = "ARÁBICA SELECIONADO • TORRA NO PONTO • FEITO COM CALMA • ";

function Badge({ side }) {
  // id único por selo, para o <textPath> não se confundir quando há mais de um
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <svg
      className={`orbit orbit-${side} badge`}
      viewBox="0 0 600 600"
      overflow="visible"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path
          id={`badge-path-${id}`}
          d="M300 300 m-215 0 a215 215 0 1 1 430 0 a215 215 0 1 1 -430 0"
        />
      </defs>

      <g fill="none" stroke="currentColor" opacity="0.5">
        <circle cx="300" cy="300" r="262" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="168" strokeWidth="1.5" />
      </g>

      <g>
        {!reduceMotion && (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 300 300"
            to="360 300 300"
            dur="45s"
            repeatCount="indefinite"
          />
        )}
        <text fill="currentColor" fontSize="32" fontWeight="600">
          <textPath
            href={`#badge-path-${id}`}
            textLength="1346"
            lengthAdjust="spacing"
          >
            {BADGE_TEXT}
          </textPath>
        </text>
      </g>

      <circle cx="300" cy="38" r="9" fill="var(--gold)" />
    </svg>
  );
}

/* Grãos de café flutuando ao redor do copo
   Todos ficam dentro da área segura do viewBox (margem de ~70) para não cortar */
const BEANS = [
  { x: 130, y: 150, rot: -30, s: 0.95 },
  { x: 455, y: 120, rot: 25, s: 0.7 },
  { x: 480, y: 340, rot: -50, s: 1 },
  { x: 150, y: 440, rot: 40, s: 0.8 },
  { x: 330, y: 500, rot: 70, s: 0.55 },
];

function Beans({ side }) {
  return (
    <svg
      className={`orbit orbit-${side} beans`}
      viewBox="0 0 600 600"
      overflow="visible"
      aria-hidden="true"
      focusable="false"
    >
      {BEANS.map((b, i) => (
        <g key={i}>
          {!reduceMotion && (
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0 0; 0 -12; 0 0"
              keyTimes="0; 0.5; 1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              begin={`${i * 0.7}s`}
              dur="6s"
              repeatCount="indefinite"
            />
          )}
          <g
            transform={`translate(${b.x} ${b.y}) rotate(${b.rot}) scale(${b.s})`}
          >
            <ellipse rx="34" ry="50" fill="currentColor" />
            <path
              d="M0 -46 C-14 -16 14 16 0 46"
              fill="none"
              stroke="var(--bean-cut)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* =====================================================================
   TELA DE CARREGAMENTO
   Cobre a página até o .glb (e o ambiente de luz) estarem carregados
   E o copo ter renderizado alguns frames. Depois faz fade-out.
   ===================================================================== */
function Loader({ ready }) {
  const { progress } = useProgress();
  const [gone, setGone] = useState(false);

  // Trava o scroll enquanto carrega e remove o loader depois do fade-out
  useEffect(() => {
    if (!ready) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    const t = setTimeout(() => setGone(true), 800);
    return () => clearTimeout(t);
  }, [ready]);

  if (gone) return null;

  const pct = Math.round(ready ? 100 : progress);

  return (
    <div
      className={`loader ${ready ? "is-hidden" : ""}`}
      role="status"
      aria-live="polite"
    >
      <img src="/star-logo.png" alt="" className="loader-logo" />
      <div className="loader-bar">
        <span style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
      <span className="loader-text">Preparando seu café… {pct}%</span>
    </div>
  );
}

function Cup({ onReady }) {
  const group = useRef();
  const intro = useRef(); // grupo da animação de entrada
  const frames = useRef(0);
  const shown = useRef(false);
  const appear = useRef(reduceMotion ? 1 : 0); // 0 = escondido, 1 = visível
  const { scene } = useGLTF(MODEL_URL);
  const { viewport, size } = useThree();
  const isMobile = size.width < 768;

  // Centraliza o modelo na origem e normaliza o tamanho, qualquer que seja o .glb
  const { object, scale } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const dims = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center);
    return { object: clone, scale: 3 / Math.max(dims.x, dims.y, dims.z) };
  }, [scene]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    // Entrada suave: espera 3 frames renderizados, avisa a página (tira o
    // loader) e faz o copo "nascer" girando e crescendo
    if (!shown.current && ++frames.current >= 3) {
      shown.current = true;
      onReady?.();
    }
    appear.current = THREE.MathUtils.damp(
      appear.current,
      shown.current ? 1 : 0,
      3.5,
      delta,
    );
    const k = reduceMotion ? 1 : appear.current;
    if (intro.current) {
      intro.current.scale.setScalar(Math.max(k, 0.0001));
      intro.current.rotation.y = (1 - k) * Math.PI;
    }

    // Em qual trecho estamos (i) e quanto já andamos dele (e, de 0 a 1)
    const p = getScrollProgress() * (STOPS.length - 1);
    const i = Math.min(Math.floor(p), STOPS.length - 2);
    const e = THREE.MathUtils.smootherstep(p - i, 0, 1);
    const a = STOPS[i];
    const b = STOPS[i + 1];
    const mix = THREE.MathUtils.lerp;

    // Posição
    const targetX = isMobile ? 0 : mix(a.x, b.x, e) * viewport.width * SIDE;
    const ya = isMobile ? a.yMobile : a.y;
    const yb = isMobile ? b.yMobile : b.y;
    const targetY = mix(ya, yb, e) - Math.sin(e * Math.PI) * DIP; // desce no meio do trecho

    // Tamanho
    const targetScale = mix(a.scale, b.scale, e);

    // Rotação (mortal + parafuso + inclinação)
    const targetRotX = mix(a.rot.x, b.rot.x, e) * TURN;
    const targetRotY = mix(a.rot.y, b.rot.y, e) * TURN;
    const targetRotZ = mix(a.rot.z, b.rot.z, e) * TURN;

    g.position.x = THREE.MathUtils.damp(g.position.x, targetX, SMOOTH, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, SMOOTH, delta);
    g.scale.setScalar(
      THREE.MathUtils.damp(g.scale.x, targetScale, SMOOTH, delta),
    );
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      targetRotX,
      SMOOTH,
      delta,
    );
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      targetRotY,
      SMOOTH,
      delta,
    );
    g.rotation.z = THREE.MathUtils.damp(
      g.rotation.z,
      targetRotZ,
      SMOOTH,
      delta,
    );
  });

  const fit = (isMobile ? 0.62 : 1) * scale;

  return (
    <group ref={group}>
      <group ref={intro}>
        <Float
          speed={reduceMotion ? 0 : 1.6}
          rotationIntensity={0}
          floatIntensity={reduceMotion ? 0 : 0.9}
          floatingRange={[-0.12, 0.12]}
        >
          <group scale={fit} rotation-y={MODEL_YAW * TURN}>
            <primitive object={object} />
          </group>
        </Float>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function App() {
  const [ready, setReady] = useState(false);

  // Segurança: se algo falhar no carregamento, libera a página após 15s
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 15000);
    return () => clearTimeout(t);
  }, []);

  function infoDev() {
    alert("willian");
  }

  return (
    <div className="app">
      <Loader ready={ready} />
      <header className="header">
        <a href="#inicio" className="brand">
          <img
            src="/star-logo.png"
            alt="Logo Starbucks"
            className="brand-logo"
          />
          <span className="brand-name">Starbucks Café</span>
        </a>
        <nav className="nav" aria-label="Principal">
          <a href="#graos">Grãos</a>
          <a href="#experiencia">Experiência</a>
          <a href="#cardapio">Cardápio</a>
          <a href="#visite">Visite</a>
        </nav>
      </header>

      <div className="canvas-wrap" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 5, 6]} intensity={2} />
          <Suspense fallback={null}>
            <Cup onReady={() => setReady(true)} />
            <Environment preset="apartment" />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      <main>
        <section id="inicio" className="hero">
          <div className="content hero-content">
            <h1 className="hero-title">
              Um café feito com calma para o seu dia começar bem.
            </h1>
            <div className="hero-side">
              <p>
                Grãos arábica selecionados, torra no ponto e um atendimento que
                lembra o seu nome. Entre, escolha uma mesa e fique o tempo que
                quiser.
              </p>
              <a href="#visite" className="btn btn-gold">
                Encontrar uma loja
              </a>
            </div>
          </div>
        </section>

        <section id="graos" className="section section-white">
          <Badge side="left" />
          <div className="content content-right">
            <div className="text-block">
              <h2>Grãos escolhidos um a um</h2>
              <p>
                Trabalhamos com fazendas parceiras e acompanhamos cada lote, da
                colheita à torra. O resultado é um café encorpado, com notas de
                chocolate e castanhas, que mantém o mesmo sabor em todas as
                lojas.
              </p>
              <a
                href="#experiencia"
                className="btn btn-green"
              >
                Conhecer a torra
              </a>
            </div>
          </div>
        </section>

        <section id="experiencia" className="section section-green">
          <Beans side="right" />
          <div className="content content-left">
            <div className="text-block">
              <h2>Do balcão até a sua mesa</h2>
              <p>
                Peça pelo aplicativo, retire sem fila ou sente com um livro. Seu
                café sai quente, no tamanho que você escolher, com leite do
                jeito que você preferir.
              </p>
              <a href="#cardapio" className="btn btn-gold">
                Fazer meu pedido
              </a>
            </div>
          </div>
        </section>

        <section id="cardapio" className="section section-white">
          <Badge side="left" />
          <div className="content content-right">
            <div className="text-block">
              <h2>Receitas para cada momento</h2>
              <p>
                Do espresso clássico aos frapês gelados, o cardápio muda com as
                estações. Experimente a edição da estação e descubra o seu novo
                favorito.
              </p>
              <a href="#visite" className="btn btn-green">
                Ver o cardápio
              </a>
            </div>
          </div>
        </section>

        <section id="visite" className="section section-dark">
          <div className="content content-center">
            <h2>Seu próximo café já está esperando</h2>
            <a href="#inicio" className="btn btn-gold">
              Ver lojas perto de mim
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
