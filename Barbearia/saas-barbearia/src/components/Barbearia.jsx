import { createFileRoute } from "@tanstack/react-router";

import "../components/site.css";
import { Agenda } from "@/components/Agenda";
import { BARBEARIA, SERVICOS, whatsappUrl } from "@/lib/barbearia";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbearia Navalha & Cia | Agende pelo WhatsApp" },
      {
        name: "description",
        content:
          "Escolha o corte, o dia e o horário no calendário. Avisamos o barbeiro e enviamos a sua confirmação pelo WhatsApp. Aberto das 08:00 às 17:00.",
      },
      { property: "og:title", content: "Barbearia Navalha & Cia" },
      {
        property: "og:description",
        content: "Agenda online com horários de 30 em 30 minutos e confirmação no WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const contatoRapido = whatsappUrl(
  BARBEARIA.whatsapp,
  `Olá, ${BARBEARIA.nome}! Gostaria de saber os horários disponíveis.`,
);

function Index() {
  return (
    <div className="site">
      <header className="topo">
        <div className="container">
          <a className="logo" href="#topo">
            ✂ {BARBEARIA.nome}
          </a>
          <nav className="menu">
            <a href="#servicos">Serviços</a>
            <a href="#agendar">Agendar</a>
            <a href="#visitar">Visitar</a>
          </nav>
          <a className="btn btn-primario" href="#agendar">
            Marcar horário
          </a>
        </div>
      </header>

      <section className="hero" id="topo">
        <div className="container">
          <span className="selo">Desde 1998</span>
          <h1>
            Cabelo afiado, <span>hora marcada</span> em poucos cliques.
          </h1>
          <p>
            Escolha o tipo de corte, o dia no calendário e o horário. O barbeiro
            recebe o aviso no WhatsApp e você recebe a confirmação do seu agendamento.
          </p>
          <div className="hero-acoes">
            <a className="btn btn-primario btn-grande" href="#agendar">
              Agendar agora
            </a>
            <a className="btn btn-secundario btn-grande" href="#servicos">
              Ver serviços e preços
            </a>
          </div>
          <div className="hero-infos">
            <span>★ 4,9 · +1.200 clientes</span>
            <span>{BARBEARIA.horario}</span>
            <span>Cortes de 30 minutos</span>
          </div>
        </div>
      </section>

      <section className="secao" id="servicos">
        <div className="container">
          <h2>Serviços da casa</h2>
          <p className="subtitulo">Preços fechados, sem surpresa na hora de pagar.</p>
          <div className="grade">
            {SERVICOS.map((s) => (
              <article key={s.id} className="cartao cartao-servico">
                <div className="linha">
                  <h3>{s.nome}</h3>
                  <span className="preco">{s.preco}</span>
                </div>
                <p>{s.descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="secao secao-cinza" id="agendar">
        <div className="container">
          <h2>Marque o seu horário</h2>
          <p className="subtitulo">
            Funcionamos das 08:00 às 17:00, de segunda a sábado, com cortes de 30 minutos.
          </p>
          <Agenda />
        </div>
      </section>

      <section className="secao" id="visitar">
        <div className="container">
          <h2>Onde nos encontrar</h2>
          <div className="grade">
            <div className="cartao">
              <p className="rotulo">Endereço</p>
              <p className="valor">{BARBEARIA.endereco}</p>
            </div>
            <div className="cartao">
              <p className="rotulo">Horário</p>
              <p className="valor">{BARBEARIA.horario}</p>
            </div>
            <div className="cartao">
              <p className="rotulo">Telefone</p>
              <p className="valor">{BARBEARIA.telefoneVisivel}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="rodape">
        <div className="container">
          <strong>{BARBEARIA.nome}</strong>
          <span>{BARBEARIA.instagram}</span>
          <span>© {new Date().getFullYear()} — Todos os direitos reservados</span>
        </div>
      </footer>

      <a
        className="flutuante"
        href={contatoRapido}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
      >
        ✆
      </a>
    </div>
  );
}
