import { useState } from "react";
import "./App.css";
import {
  IconArrowRight,
  IconCortarHaste,
  IconCortarTarugo,
  IconCorteComprimento,
  IconEndireitamentoPrutton,
  IconEndireitamentoRD6,
  IconPrensa,
  IconQualityShield,
  IconSoldaFriccao,
} from "./components/IndustrialIcons";

const PROCESSOS_INDUSTRIAIS = [
  {
    id: "cortar-haste-14h",
    nome: "Cortar haste - 14H",
    codigo: "Cortar Haste",
    categoria: "Corte de Haste",
    rota: "/cortar-haste-14h",
    Icone: IconCortarHaste,
  },
  {
    id: "cortar-tarugo-federal",
    nome: "Cortar Tarugo - Federal",
    codigo: "Cortar Tarugo",
    categoria: "Corte de Tarugo",
    rota: "/cortar-tarugo-federal",
    Icone: IconCortarTarugo,
  },
  {
    id: "prensa",
    nome: "Prensa",
    codigo: "Forjar",
    categoria: "Forjamento a Quente",
    rota: "/prensa",
    Icone: IconPrensa,
  },
  {
    id: "corte-comprimento-2rc",
    nome: "Corte de comprimento 2RC",
    codigo: "OP-2RC",
    categoria: "Corte Dimensional",
    rota: "/corte-comprimento-2rc",
    Icone: IconCorteComprimento,
  },
  {
    id: "solda-friccao-35f",
    nome: "Solda por fricção 35F",
    codigo: "OP-35F",
    categoria: "União Térmica",
    rota: "/solda-friccao-35f",
    Icone: IconSoldaFriccao,
  },
  {
    id: "endireitamento-prutton",
    nome: "Endireitamento Prutton",
    codigo: "OP-PRT",
    categoria: "Endireitamento",
    rota: "/endireitamento-prutton",
    Icone: IconEndireitamentoPrutton,
  },
  {
    id: "endireitamento-rd6",
    nome: "Endireitamento RD6",
    codigo: "OP-RD6",
    categoria: "Endireitamento",
    rota: "/endireitamento-rd6",
    Icone: IconEndireitamentoRD6,
  },
];

function App() {
  const [processoSelecionado, setProcessoSelecionado] = useState(null);

  const handleAcessarProcesso = (processo) => {
    setProcessoSelecionado(processo);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__container">
          <div className="app-header__brand">
            <div className="app-header__emblem">
              <IconQualityShield className="app-header__emblem-icon" />
            </div>
            <div className="app-header__titles">
              <span className="app-header__eyebrow">
                Forjaria SJDC • Controle de Qualidade
              </span>
              <h1 className="app-header__title">
                Sistema de Aprovação da Qualidade
              </h1>
            </div>
          </div>
          <div className="app-header__badge" aria-label="Status do sistema">
            <span className="app-header__badge-dot" />
            <span>Chão de Fábrica</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section
          className="processes-section"
          aria-labelledby="processes-heading"
        >
          <div className="processes-section__header">
            <div>
              <h2 id="processes-heading" className="processes-section__title">
                Setores e Processos Produtivos
              </h2>
              <p className="processes-section__subtitle">
                Selecione a operação industrial para iniciar a inspeção e
                aprovação das peças.
              </p>
            </div>
            <span className="processes-section__count">
              {PROCESSOS_INDUSTRIAIS.length} operações disponíveis
            </span>
          </div>

          {processoSelecionado && (
            <div className="selection-banner" role="status" aria-live="polite">
              <div>
                <strong>{processoSelecionado.nome}</strong>
                <span>
                  {" "}
                  — Página do setor ({processoSelecionado.rota}) será vinculada
                  nas próximas etapas.
                </span>
              </div>
              <button
                type="button"
                className="selection-banner__close"
                onClick={() => setProcessoSelecionado(null)}
                aria-label="Fechar aviso"
              >
                ×
              </button>
            </div>
          )}

          <div className="processes-grid">
            {PROCESSOS_INDUSTRIAIS.map((processo) => {
              const IconeProcesso = processo.Icone;
              const isSelected = processoSelecionado?.id === processo.id;

              return (
                <button
                  key={processo.id}
                  type="button"
                  data-route={processo.rota}
                  className={`process-button ${isSelected ? "process-button--selected" : ""}`}
                  onClick={() => handleAcessarProcesso(processo)}
                >
                  <div className="process-button__top">
                    <span className="process-button__icon-box">
                      <IconeProcesso className="process-button__icon" />
                    </span>
                    <span className="process-button__code">
                      {processo.codigo}
                    </span>
                  </div>

                  <div className="process-button__body">
                    <span className="process-button__category">
                      {processo.categoria}
                    </span>
                    <span className="process-button__name">
                      {processo.nome}
                    </span>
                  </div>

                  <div className="process-button__footer">
                    <span className="process-button__action">
                      Acessar inspeção
                    </span>
                    <IconArrowRight className="process-button__arrow" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="app-footer__container">
          <span>Forjaria SJDC • Qualidade Industrial</span>
          <span>Módulo de Aprovação de Peças</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
