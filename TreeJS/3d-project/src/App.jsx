import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./App.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

let lenis = null;

// Campo de estrelas em CSS: cada estrela tem um núcleo e um halo de brilho em cores combinadas
const STAR_COLORS = ["#ffffff", "#bfe9ff", "#ffd9a0", "#c9b8ff", "#9fe3f2"];
const seeded = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const starShadows = (count, seed, core, blur, glow) => {
  const r = seeded(seed);
  return Array.from({ length: count }, () => {
    const c = STAR_COLORS[Math.floor(r() * STAR_COLORS.length)];
    const x = (r() * 100).toFixed(2);
    const y = (r() * 125).toFixed(2);
    return `${x}vw ${y}vh 0 ${core}px ${c}, ${x}vw ${y}vh ${blur}px ${glow}px ${c}66`;
  }).join(",");
};
const STAR_LAYERS = [
  { cls: "s1", shadow: starShadows(140, 11, 0.5, 4, 0) },
  { cls: "s2", shadow: starShadows(60, 23, 0.8, 7, 1) },
  { cls: "s3", shadow: starShadows(14, 37, 1.2, 12, 2) },
];

// Ajuste aqui o arquivo e a orientação inicial do modelo
const MODEL_URL = "/voyager1.glb";
const MODEL_SIZE = 3.4;
const MODEL_ROTATION = [0, 0, 0];
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const col = (hex) => {
  const c = new THREE.Color(hex);
  return { r: c.r, g: c.g, b: c.b };
};

// Trechos entre *asteriscos* ganham o itálico serifado âmbar
const story = [
  {
    side: "right",
    tag: "Fase 01 · Lançamento",
    title: "Setembro de 1977",
    text: "A Voyager 1 deixa a Terra em um foguete Titan–Centaur, com a missão de visitar *Júpiter e Saturno*.",
  },
  {
    side: "left",
    tag: "Fase 02 · Gigantes",
    title: "Júpiter e Saturno",
    text: "Entre 1979 e 1980, a sonda envia as primeiras imagens detalhadas das luas e dos anéis dos *gigantes do sistema solar*.",
  },
  {
    side: "right",
    tag: "Fase 03 · Retrato",
    title: "Um ponto azul-claro",
    text: "Em 1990, a câmera olha para trás e fotografa a Terra como um *ponto minúsculo*, a bilhões de quilômetros.",
  },
  {
    side: "left",
    tag: "Fase 04 · Fronteira",
    title: "Além do Sol",
    text: "Em 2012, a Voyager 1 cruza a heliopausa e se torna a primeira sonda a viajar pelo *espaço interestelar*.",
  },
  {
    side: "right",
    tag: "Fase 05 · Silêncio",
    title: "Cada vez mais longe",
    text: "Seus geradores de plutônio perdem potência aos poucos, e o sinal leva *mais de 20 horas* para chegar à Terra.",
  },
];

const rich = (t) =>
  t.split("*").map((p, i) => (i % 2 ? <em key={i}>{p}</em> : p));

// Uma etapa por fase: a sonda cruza a tela na horizontal e na vertical, mostrando lados diferentes
const steps = (dx, dy, va) => [
  {
    x: -dx,
    y: dy + va,
    rx: 0.8,
    ry: 1.1,
    rz: 0.15,
    bg: "#010309",
    key: "#9fe3f2",
    rim: "#e8a15a",
  },
  {
    x: dx,
    y: dy - va,
    rx: -0.8,
    ry: -1.2,
    rz: -0.15,
    bg: "#000308",
    key: "#8fa2ff",
    rim: "#7fd8e8",
  },
  {
    x: -dx,
    y: dy + va * 0.8,
    rx: 0.45,
    ry: 1.3,
    rz: 0.1,
    bg: "#04020a",
    key: "#9fe3f2",
    rim: "#e8a15a",
  },
  {
    x: dx,
    y: dy - va * 0.8,
    rx: -0.6,
    ry: -1.3,
    rz: -0.1,
    bg: "#01070a",
    key: "#7fe8d0",
    rim: "#5a6bb0",
  },
  {
    x: -dx,
    y: dy + va,
    rx: 0.7,
    ry: 0.9,
    rz: 0.12,
    bg: "#02030a",
    key: "#9fe3f2",
    rim: "#e8a15a",
  },
  {
    x: 0,
    y: 0.1,
    rx: 0.2,
    ry: 0,
    rz: 0,
    bg: "#000103",
    key: "#e8a15a",
    rim: "#7fd8e8",
  },
];

// Órbita de brilho suave: halos largos e quase transparentes, sem fio central
function Orbit({ radius, rotation, color, strength = 1 }) {
  const layers = [
    { tube: 0.05, opacity: 0.07 },
    { tube: 0.14, opacity: 0.04 },
    { tube: 0.28, opacity: 0.022 },
    { tube: 0.5, opacity: 0.012 },
  ];
  return (
    <group rotation={rotation}>
      {layers.map((l, i) => (
        <mesh key={i}>
          <torusGeometry args={[radius, l.tube, 16, 220]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={l.opacity * strength}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// [anel, eixo, quanto]: nem todo anel se move em todo passo, e alguns vão contra a sonda
const RING_MOVES = [
  [
    [0, "y", -0.8],
    [2, "y", 0.5],
  ],
  [
    [0, "y", 0.8],
    [1, "y", 0.7],
  ],
  [
    [1, "y", -0.7],
    [2, "x", -0.4],
  ],
  [
    [0, "y", 0.7],
    [2, "y", 0.6],
    [1, "x", 0.3],
  ],
  [
    [0, "y", -0.6],
    [1, "y", -0.5],
    [2, "x", -0.3],
  ],
  [
    [0, "y", 0.4],
    [1, "y", -0.4],
  ],
];

function Rover() {
  const stage = useRef();
  const tilt = useRef();
  const sky = useRef();
  const orbits = useRef();
  const ringsRoot = useRef();
  const key = useRef();
  const rim = useRef();
  const { scene } = useGLTF(MODEL_URL);

  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3()).length();
    return {
      scale: MODEL_SIZE / size,
      offset: box.getCenter(new THREE.Vector3()).negate(),
    };
  }, [scene]);

  useGSAP(() => {
    const g = stage.current;
    const og = ringsRoot.current;
    const rings = orbits.current.children;
    const mobile = window.innerWidth < 768;
    const dx = mobile ? 0 : 1.8;
    const dy = mobile ? 1.5 : 0;
    g.rotation.set(0.15, -0.6, 0);

    const tl = gsap.timeline({
      defaults: { ease: "power1.inOut", duration: 1 },
      scrollTrigger: {
        trigger: ".page",
        start: "top top",
        end: "bottom bottom",
        scrub: reduceMotion ? true : 1,
      },
    });

    steps(dx, dy, mobile ? 0.35 : 0.9).forEach((s, i) => {
      tl.to(g.position, { x: s.x, y: s.y }, i)
        .to(g.rotation, { x: s.rx, y: s.ry, z: s.rz }, i)
        .to(og.position, { x: s.x, y: s.y }, i)
        .to(".stage", { backgroundColor: s.bg }, i)
        .to(key.current.color, col(s.key), i)
        .to(rim.current.color, col(s.rim), i);
    });
    tl.to(g.scale, { x: 1.2, y: 3, z: 1.2 }, 5);
    tl.to(og.scale, { x: 1.2, y: 2, z: 1.2 }, 5);
    RING_MOVES.forEach((list, i) =>
      list.forEach(([k, axis, d]) =>
        tl.to(rings[k].rotation, { [axis]: `+=${d}` }, i),
      ),
    );

    const line = { duration: 6, ease: "none" };
    const h = window.innerHeight;
    tl.to(sky.current.rotation, { y: 0.3, x: 0.05, ...line }, 0)
      .to(".orb-a", { xPercent: 30, yPercent: 10, ...line }, 0)
      .to(".orb-b", { xPercent: -50, yPercent: -30, ...line }, 0)
      .to(".bar", { scaleX: 3, ...line }, 0)
      .to(".s1", { y: -h * 0.09, ...line }, 0)
      .to(".s2", { y: -h * 0.2, ...line }, 0)
      .to(".s3", { y: -h * 0.26, ...line }, 0);
  });

  useFrame((s, dt) => {
    const t = tilt.current;
    t.rotation.y = THREE.MathUtils.damp(
      t.rotation.y,
      s.pointer.x * 0.35,
      3,
      dt,
    );
    t.rotation.x = THREE.MathUtils.damp(
      t.rotation.x,
      -s.pointer.y * 0.05,
      3,
      dt,
    );
    orbits.current.children.forEach(
      (o, i) => (o.rotation.z += dt * (0.09 + i * 0.08) * (i % 2 ? -1 : 1)),
    );
  });

  return (
    <>
      <hemisphereLight args={["#9fb4ff", "#03040a", 0.22]} />
      <directionalLight
        ref={key}
        position={[4, 3, 4]}
        intensity={1.5}
        color="#9fe3f2"
      />
      <directionalLight
        ref={rim}
        position={[-5, 1, -3]}
        intensity={0.9}
        color="#e8a15a"
      />

      <group ref={sky}>
        <Stars
          radius={60}
          depth={45}
          count={2200}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
      </group>

      {/* Anéis independentes: acompanham a posição da sonda, mas giram por conta própria */}
      <group ref={ringsRoot} position={[0, -0.2, 0]} scale={1.15}>
        <group ref={orbits}>
          <Orbit radius={3.9} rotation={[0.75, 0.3, 0]} color="#4a6ad0" />
          <Orbit
            radius={4.8}
            rotation={[0.55, -0.6, 0.4]}
            color="#7a5ac8"
            strength={0.8}
          />
          <Orbit
            radius={6}
            rotation={[0.9, 0.9, -0.3]}
            color="#2f7f9a"
            strength={0.7}
          />
        </group>
      </group>

      <group ref={stage} position={[0, -0.2, 0]} scale={1.15}>
        <group ref={tilt}>
          <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
            <group scale={scale} rotation={MODEL_ROTATION}>
              <primitive object={scene} position={offset} />
            </group>
          </Float>
        </group>
      </group>
    </>
  );
}

useGLTF.preload(MODEL_URL);

function Clock() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <span>UTC {t.toISOString().slice(11, 19)}</span>;
}

export default function App() {
  // Rolagem suave (Lenis) sincronizada com o GSAP e o ScrollTrigger
  useEffect(() => {
    if (reduceMotion) return;
    lenis = new Lenis({ lerp: 0.07, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
    };
  }, []);

  useGSAP(() => {
    gsap.to(".hero-word", {
      yPercent: -25,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".panel-0",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    if (reduceMotion) return;
    gsap.utils.toArray(".panel").forEach((panel) => {
      gsap.from(panel.querySelectorAll(".rv"), {
        opacity: 0,
        y: 40,
        filter: "blur(8px)",
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "top 55%",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  return (
    <>
      <div className="stage">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="flare" />
        {STAR_LAYERS.map((l) => (
          <i
            key={l.cls}
            className={`star ${l.cls}`}
            style={{ boxShadow: l.shadow }}
          />
        ))}
      </div>
      <div className="grade" />
      <div className="grain" />
      <div className="scan" />
      <div className="bar" />

      <header className="hud">
        <span className="corner">Voyager 1 · Espaço interestelar</span>
        <span className="live">
          <i /> Telemetria ativa
        </span>
        <Clock />
      </header>

      <Canvas
        className="canvas"
        camera={{ position: [0, 0, 6.7], fov: 35 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <Rover />
        </Suspense>
      </Canvas>

      <main className="page">
        <section className="panel panel-0">
          <p className="rv eyebrow">Diário de uma sonda perdida no espaço</p>
          <h1 className="hero-word" data-text="VOYAGER">
            Voyager
          </h1>
          <p className="rv lead">
            A história da Voyager 1, a sonda que <em>nunca parou de ir</em>.
          </p>
          <div className="cue">
            <i />
            Role para acompanhar
          </div>
        </section>

        {story.map((s) => (
          <section key={s.title} className={`panel ${s.side}`}>
            <div className="copy">
              <p className="rv tag">{s.tag}</p>
              <h2 className="rv">{s.title}</h2>
              <p className="rv">{rich(s.text)}</p>
            </div>
          </section>
        ))}

        <section className="panel end">
          <div className="copy">
            <p className="rv tag">Fase 06 · Mensagem</p>
            <h2 className="rv">Um disco de ouro a caminho das estrelas</h2>
            <p className="rv">
              A bordo, o Disco de Ouro guarda sons e imagens da Terra para quem
              um dia o encontrar. Ela segue em frente,{" "}
              <em>sozinha e em silêncio</em>.
            </p>
            <button
              className="rv cta"
              onClick={() =>
                lenis
                  ? lenis.scrollTo(0, { duration: 2.5 })
                  : window.scrollTo({ top: 0, behavior: "smooth" })
              }
            >
              Rever a viagem
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
