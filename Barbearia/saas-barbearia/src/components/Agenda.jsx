import { useMemo, useState } from "react";
import { toast } from "sonner";
import "../components/site.css";

import "../components/agenda.css";
import {
  BARBEARIA,
  SERVICOS,
  DURACAO_MIN,
  gerarHorarios,
  formatarData,
  isDomingo,
  soDigitos,
  whatsappUrl,
  mensagemBarbeiro,
  mensagemCliente,
} from "./js/barbearia";

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function hoje() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function Agenda() {
  const inicio = hoje();
  const [mes, setMes] = useState(
    new Date(inicio.getFullYear(), inicio.getMonth(), 1),
  );
  const [dia, setDia] = useState(null);
  const [hora, setHora] = useState("");
  const [servicoId, setServicoId] = useState("corte");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [confirmado, setConfirmado] = useState(null);

  const horarios = useMemo(() => gerarHorarios(), []);
  const servico = SERVICOS.find((s) => s.id === servicoId);

  const primeiroDiaSemana = new Date(
    mes.getFullYear(),
    mes.getMonth(),
    1,
  ).getDay();
  const totalDias = new Date(
    mes.getFullYear(),
    mes.getMonth() + 1,
    0,
  ).getDate();
  const podeVoltar =
    mes.getFullYear() > inicio.getFullYear() ||
    (mes.getFullYear() === inicio.getFullYear() &&
      mes.getMonth() > inicio.getMonth());

  function mudarMes(delta) {
    setMes(new Date(mes.getFullYear(), mes.getMonth() + delta, 1));
  }

  function horarioIndisponivel(h) {
    if (!dia) return true;
    const agora = new Date();
    if (dia.toDateString() !== agora.toDateString()) return false;
    const [hh, mm] = h.split(":").map(Number);
    return hh * 60 + mm <= agora.getHours() * 60 + agora.getMinutes();
  }

  function confirmar() {
    if (!nome.trim()) return setErro("Escreva o seu nome.");
    if (!dia) return setErro("Escolha o dia no calendário.");
    if (!hora) return setErro("Escolha o horário.");
    if (soDigitos(telefone).length < 10)
      return setErro("Informe o seu WhatsApp com DDD (ex.: 5511987654321).");

    setErro("");
    const dados = {
      nome: nome.trim(),
      servico,
      data: dia,
      hora,
      telefone: telefone.trim(),
    };

    const urlBarbeiro = whatsappUrl(
      BARBEARIA.whatsapp,
      mensagemBarbeiro(dados),
    );
    const urlCliente = whatsappUrl(telefone, mensagemCliente(dados));

    window.open(urlBarbeiro, "_blank", "noopener,noreferrer");
    setConfirmado({ urlBarbeiro, urlCliente });
    toast.success("Aviso enviado ao barbeiro. Agora envie a sua confirmação.");
  }

  return (
    <div className="agenda">
      <div className="painel">
        <div className="cal-topo">
          <button
            type="button"
            className="cal-nav"
            onClick={() => mudarMes(-1)}
            disabled={!podeVoltar}
            aria-label="Mês anterior"
          >
            ‹
          </button>
          <span className="cal-mes">
            {MESES[mes.getMonth()]} {mes.getFullYear()}
          </span>
          <button
            type="button"
            className="cal-nav"
            onClick={() => mudarMes(1)}
            aria-label="Próximo mês"
          >
            ›
          </button>
        </div>

        <div className="cal-grade">
          {DIAS_SEMANA.map((d, i) => (
            <div key={i} className="cal-dia-semana">
              {d}
            </div>
          ))}
          {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
            <div key={`v${i}`} className="cal-vazio" />
          ))}
          {Array.from({ length: totalDias }).map((_, i) => {
            const data = new Date(mes.getFullYear(), mes.getMonth(), i + 1);
            const bloqueado = data < inicio || isDomingo(data);
            const ativo = dia && data.toDateString() === dia.toDateString();
            return (
              <button
                key={i}
                type="button"
                className={`cal-dia${ativo ? " ativo" : ""}`}
                disabled={bloqueado}
                onClick={() => {
                  setDia(data);
                  setHora("");
                  setConfirmado(null);
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <h3 style={{ marginTop: 24 }}>
          Horários ({DURACAO_MIN} min · 08:00 às 17:00)
        </h3>
        {!dia ? (
          <p className="aviso">Escolha primeiro um dia no calendário.</p>
        ) : (
          <div className="horarios">
            {horarios.map((h) => (
              <button
                key={h}
                type="button"
                className={`horario${hora === h ? " ativo" : ""}`}
                disabled={horarioIndisponivel(h)}
                onClick={() => {
                  setHora(h);
                  setConfirmado(null);
                }}
              >
                {h}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="painel">
        <h3>Tipo de corte</h3>
        <div className="chips">
          {SERVICOS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chip${servicoId === s.id ? " ativo" : ""}`}
              onClick={() => {
                setServicoId(s.id);
                setConfirmado(null);
              }}
            >
              {s.nome} · {s.preco}
            </button>
          ))}
        </div>

        <div className="campo">
          <label htmlFor="nome">Seu nome</label>
          <input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como devemos chamá-lo?"
          />
        </div>

        <div className="campo">
          <label htmlFor="tel">Seu WhatsApp</label>
          <input
            id="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="5511987654321"
            inputMode="tel"
          />
          <p className="dica">
            Com código do país e DDD — é para lhe enviarmos a confirmação.
          </p>
        </div>

        <div className="resumo">
          <strong>Resumo do agendamento</strong>
          <ul>
            <li>
              Serviço: {servico?.nome} ({servico?.preco})
            </li>
            <li>Data: {dia ? formatarData(dia) : "—"}</li>
            <li>Horário: {hora || "—"}</li>
          </ul>
        </div>

        {erro ? <p className="erro">{erro}</p> : null}

        <div className="acoes">
          <button
            type="button"
            className="btn btn-primario btn-bloco btn-grande"
            onClick={confirmar}
          >
            Confirmar e avisar o barbeiro
          </button>
          {confirmado ? (
            <>
              <a
                className="btn btn-secundario btn-bloco"
                href={confirmado.urlCliente}
                target="_blank"
                rel="noopener noreferrer"
              >
                Receber a confirmação no meu WhatsApp
              </a>
              <a
                className="btn btn-secundario btn-bloco"
                href={confirmado.urlBarbeiro}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reabrir o aviso ao barbeiro
              </a>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
