import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import "./App.css";

const MODEL_URL = "/star.glb";

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

/* Detalhe gráfico que fica sob o copo: anéis finos + um traço em meia-lua.
   A cor vem do CSS (currentColor), o ponto dourado usa --gold. */
function Orbit({ side }) {
  return (
    <svg
      className={`orbit orbit-${side}`}
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <circle
          cx="300"
          cy="300"
          r="235"
          strokeWidth="2.5"
          strokeDasharray="1130 347"
          transform="rotate(-35 300 300)"
        />
        <circle
          cx="300"
          cy="300"
          r="190"
          strokeWidth="1.5"
          strokeDasharray="640 554"
          opacity="0.55"
          transform="rotate(110 300 300)"
        />
      </g>
      <path
        d="M28 440 C170 548 380 556 576 372 C392 506 186 500 28 440 Z"
        fill="currentColor"
      />
      <circle cx="576" cy="372" r="9" fill="var(--gold)" />
    </svg>
  );
}

function Cup() {
  const group = useRef();
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
  );
}

useGLTF.preload(MODEL_URL);

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <a href="#inicio" className="brand">
          <span className="brand-mark" aria-hidden="true" />
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
            <Cup />
            <Environment preset="apartment" />
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
          <Orbit side="left" />
          <div className="content content-right">
            <div className="text-block">
              <h2>Grãos escolhidos um a um</h2>
              <p>
                Trabalhamos com fazendas parceiras e acompanhamos cada lote, da
                colheita à torra. O resultado é um café encorpado, com notas de
                chocolate e castanhas, que mantém o mesmo sabor em todas as
                lojas.
              </p>
              <a href="#experiencia" className="btn btn-green">
                Conhecer a torra
              </a>
            </div>
          </div>
        </section>

        <section id="experiencia" className="section section-green">
          <Orbit side="right" />
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
          <Orbit side="left" />
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
