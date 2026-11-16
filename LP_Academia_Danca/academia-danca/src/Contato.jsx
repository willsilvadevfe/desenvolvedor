import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./Contato.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ===== Conteúdo (edite à vontade) ===== */
const AULAS = [
  {
    id: "ballet",
    nome: "Ballet Clássico",
    dias: "Seg e Qua · 18h",
    horarios: ["Segunda · 18h", "Quarta · 18h"],
  },
  {
    id: "jazz",
    nome: "Jazz",
    dias: "Ter e Qui · 19h",
    horarios: ["Terça · 19h", "Quinta · 19h"],
  },
  {
    id: "contemporanea",
    nome: "Dança Contemporânea",
    dias: "Sex · 18h",
    horarios: ["Sexta · 18h"],
  },
  {
    id: "breaking",
    nome: "Breaking Dance",
    dias: "Seg e Qua · 20h",
    horarios: ["Segunda · 20h", "Quarta · 20h"],
  },
  {
    id: "ventre",
    nome: "Dança do Ventre",
    dias: "Ter e Qui · 20h",
    horarios: ["Terça · 20h", "Quinta · 20h"],
  },
  {
    id: "sapateado",
    nome: "Sapateado",
    dias: "Sáb · 10h",
    horarios: ["Sábado · 10h"],
  },
];

const FORM_INICIAL = { nome: "", email: "", telefone: "", aula: "", horario: "" };

/* ===== Helpers ===== */
const formatarTelefone = (valor) => {
  const n = valor.replace(/\D/g, "").slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10)
    return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
};

// Mesmo efeito de palavras do site, com classes próprias para a animação
// ficar toda dentro deste componente
const Palavras = ({ text }) => (
  <h2 className="contato-titulo" aria-label={text}>
    {text.split(" ").map((w, i) => (
      <span className="contato-w" key={i} aria-hidden="true">
        <span className="contato-wi">{w}</span>
      </span>
    ))}
  </h2>
);

export default function Contato() {
  const raiz = useRef(null);
  const lista = useRef(null);
  const marcador = useRef(null);

  const [form, setForm] = useState(FORM_INICIAL);
  const [enviado, setEnviado] = useState(false);

  const aulaSelecionada = AULAS.find((a) => a.id === form.aula);

  /* 1. Entrada da seção: uma sequência única, disparada pelo scroll */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: raiz.current, start: "top 65%" },
        });

        tl.from(".contato-wi", {
          yPercent: 115,
          duration: 1,
          ease: "power4.out",
          stagger: 0.06,
        })
          .from(
            ".contato-intro .eyebrow, .contato-texto",
            { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 },
            "-=0.7",
          )
          .from(
            ".contato-aula",
            { x: -24, opacity: 0, duration: 0.6, stagger: 0.07 },
            "-=0.4",
          )
          .from(
            ".contato-card",
            { clipPath: "inset(100% 0 0 0)", duration: 1.2, ease: "power4.inOut" },
            "-=1.1",
          )
          .from(
            ".contato-campo, .contato-enviar",
            { y: 16, opacity: 0, duration: 0.5, stagger: 0.07 },
            "-=0.5",
          );
      });

      return () => mm.revert();
    },
    { scope: raiz },
  );

  /* 2. O marcador acompanha a aula escolhida (pela lista ou pelo select) */
  useGSAP(
    () => {
      const alvo = lista.current.querySelector(`[data-id="${form.aula}"]`);

      if (!alvo) {
        gsap.to(marcador.current, { opacity: 0, duration: 0.25 });
        return;
      }

      const posicionar = (duration) =>
        gsap.to(marcador.current, {
          opacity: 1,
          y: alvo.offsetTop,
          height: alvo.offsetHeight,
          duration,
          ease: "power3.out",
        });

      posicionar(0.6);
      const onResize = () => posicionar(0);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: raiz, dependencies: [form.aula] },
  );

  /* 3. Select de horários reage à troca de aula */
  useGSAP(
    () => {
      if (!form.aula) return;
      gsap.fromTo(
        ".contato-campo--horario",
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
      );
    },
    { scope: raiz, dependencies: [form.aula] },
  );

  /* 4. Confirmação ao enviar */
  useGSAP(
    () => {
      if (!enviado) return;
      gsap.from(".contato-ok > *", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.1,
      });
    },
    { scope: raiz, dependencies: [enviado] },
  );

  /* ===== Handlers ===== */
  const trocarAula = (id) => {
    const aula = AULAS.find((a) => a.id === id);
    setForm((f) => ({
      ...f,
      aula: id,
      // se só existe um horário, já deixa selecionado
      horario: aula?.horarios.length === 1 ? aula.horarios[0] : "",
    }));
  };

  const atualizar = (e) => {
    const { name, value } = e.target;
    if (name === "aula") return trocarAula(value);
    setForm((f) => ({
      ...f,
      [name]: name === "telefone" ? formatarTelefone(value) : value,
    }));
  };

  const enviar = (e) => {
    e.preventDefault();
    // Sem funcionalidade por enquanto: aqui entraria a chamada à API
    setEnviado(true);
  };

  const novoAgendamento = () => {
    setForm(FORM_INICIAL);
    setEnviado(false);
  };

  return (
    <section className="section contato" id="contato" ref={raiz}>
      <div className="container contato-grid">
        {/* Texto + lista de aulas */}
        <div className="contato-intro">
          <span className="eyebrow">Contato</span>
          <Palavras text="Agende sua aula experimental" />
          <p className="contato-texto">
            Escolha a modalidade e um horário. Entraremos em contato para
            confirmar a sua aula.
          </p>

          <ul className="contato-aulas" ref={lista}>
            <span
              className="contato-marcador"
              ref={marcador}
              aria-hidden="true"
            />
            {AULAS.map((a) => (
              <li className="contato-aula" key={a.id} data-id={a.id}>
                <button
                  type="button"
                  className={form.aula === a.id ? "ativa" : ""}
                  aria-pressed={form.aula === a.id}
                  onClick={() => trocarAula(a.id)}
                >
                  <span className="contato-aula-nome">{a.nome}</span>
                  <small>{a.dias}</small>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulário */}
        <div className="contato-card">
          {enviado ? (
            <div className="contato-ok" role="status">
              <h3>Pedido recebido!</h3>
              <p>
                {form.nome.split(" ")[0]}, anotamos seu interesse em{" "}
                {aulaSelecionada?.nome} ({form.horario}). Entraremos em contato
                pelo telefone ou e-mail informado.
              </p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={novoAgendamento}
              >
                Agendar outra aula
              </button>
            </div>
          ) : (
            <form className="contato-form" onSubmit={enviar}>
              <h3>Aula experimental</h3>

              <div className="contato-campo">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Como podemos te chamar?"
                  value={form.nome}
                  onChange={atualizar}
                  required
                />
              </div>

              <div className="contato-campo">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  value={form.email}
                  onChange={atualizar}
                  required
                />
              </div>

              <div className="contato-campo">
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(12) 90000-0000"
                  value={form.telefone}
                  onChange={atualizar}
                  required
                />
              </div>

              <div className="contato-campo">
                <label htmlFor="aula">Aula que deseja</label>
                <select
                  id="aula"
                  name="aula"
                  value={form.aula}
                  onChange={atualizar}
                  required
                >
                  <option value="" disabled>
                    Escolha uma modalidade
                  </option>
                  {AULAS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contato-campo contato-campo--horario">
                <label htmlFor="horario">Horário da aula experimental</label>
                <select
                  id="horario"
                  name="horario"
                  value={form.horario}
                  onChange={atualizar}
                  disabled={!aulaSelecionada}
                  required
                >
                  <option value="" disabled>
                    {aulaSelecionada
                      ? "Escolha um horário"
                      : "Escolha a modalidade primeiro"}
                  </option>
                  {aulaSelecionada?.horarios.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary contato-enviar">
                Solicitar aula experimental
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}