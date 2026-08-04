import { useState } from "react";
import Header from "../components/Header.jsx";

import Calendar from "../components/Calendar.jsx";
import BookingForm from "../components/BookingForm.jsx";
import "../styles/home.css";

const SERVICES = [
  {
    name: "Corte degradê",
    price: "R$ 35",
    description: "Corte degradê com máquina, navalha ou shaver.",
  },
  {
    name: "Corte + Barba",
    price: "R$ 50,00",
    description: "Corte completo com barba e acabamento profissional.",
  },
  {
    name: "Corte social",
    price: "R$ 35,00",
    description: "Tesoura, máquina para acabamento e contornos na navalha.",
  },
  {
    name: "Sobrancelha",
    price: "R$ 10,00",
    description:
      "Alinhamento e definição com navalha ou pinça.",
  },
  {
    name: "Barba",
    price: "R$ 30,00",
    description: "Modelagem completa da barba com máquina e navalha.",
  },
  {
    name: "Luzes Masculinas",
    price: "R$ 80,00",
    description: "Clareamento parcial ou completo para visual moderno.",
  },
];

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero__content">
            <h1>
              Seu horário reservado,
              <br /> sem enrolação.
            </h1>
            <p>
              Escolha o dia, veja os horários livres na hora e garanta seu corte
              sem precisar ligar ou esperar resposta no WhatsApp.
            </p>
            <a href="#agendar" className="hero__cta">
              Ver horários disponíveis
            </a>
          </div>
          <div className="hero__glow" aria-hidden="true" />
        </section>

        <section class="comodidades">
          <div class="comodidades__header">
            <h2>
              Tudo pensado para o seu <span>conforto</span>
            </h2>
            <p>
              Da recepção ao pós-corte, cada detalhe do espaço foi montado para
              você relaxar enquanto cuida do visual.
            </p>
          </div>

          <div class="comodidades__grid">
            <article class="comodidade">
              <div class="comodidade__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 12h18M3 12a4 4 0 0 1 4-4h1m-5 4a4 4 0 0 0 4 4h1m9-4a4 4 0 0 0-4-4h-1m5 4a4 4 0 0 1-4 4h-1M7 8V5m5 3V4m5 4V5M7 20v-3m5 3v-4m5 4v-3" />
                </svg>
              </div>
              <h3>Ar-condicionado</h3>
              <p>
                Ambiente climatizado o ano todo, pra você esperar e ser atendido
                com conforto.
              </p>
            </article>

            <article class="comodidade">
              <div class="comodidade__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M5 12.5a11 11 0 0 1 14 0M8 16a6.5 6.5 0 0 1 8 0M12 19.5h.01" />
                </svg>
              </div>
              <h3>Wi-Fi grátis</h3>
              <p>
                Internet liberada para todo mundo enquanto aguarda ou aproveita
                o atendimento.
              </p>
            </article>

            <article class="comodidade">
              <div class="comodidade__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M9 2h6l1 4H8l1-4Zm-1 4h8l1 5a5 5 0 0 1-5 5.9V20h3v2H8v-2h3v-3.1A5 5 0 0 1 6 11l1-5Z" />
                </svg>
              </div>
              <h3>Produtos premium</h3>
              <p>
                Linha completa de cuidados masculinos: pomadas, óleos de barba e
                finalizadores.
              </p>
            </article>

            <article class="comodidade">
              <div class="comodidade__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 5h18v12H3zM8 21h8M12 17v4M7 9l3 3 3-3 4 4" />
                </svg>
              </div>
              <h3>TV e streaming</h3>
              <p>
                Telão com jogos ou playlist enquanto você espera seu horário
                agendado.
              </p>
            </article>
          </div>
        </section>

        <section className="services">
          <h2>Conheça alguns de nossos serviços</h2>
           <p>
              Da recepção ao pós-corte, cada detalhe do espaço foi montado para
              você relaxar enquanto cuida do visual.
            </p>
          <div className="services__grid">
            {SERVICES.map((service) => (
              <div className="service-card" key={service.name}>
                <h3>{service.name}</h3>
                <p className="service-card__meta">{service.description}</p>
                <p className="service-card__price">{service.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="agendar" className="scheduler">
          <h2>Agende seu horário</h2>
          <p className="scheduler__hint">
            Segunda a sábado, das 8h às 17h. Cada corte reserva 30 minutos.
          </p>
          <div className="scheduler__grid">
            <Calendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
            <BookingForm selectedDate={selectedDate} />
          </div>
        </section>

        <section class="pagamento">
          <h2>
            Pague do jeito que for <span>mais fácil</span>
          </h2>
          <p>
            Aceitamos as principais formas de pagamento pra você não perder
            tempo.
          </p>

          <div class="pagamento__lista">
            <div class="pagamento__item">
              <svg viewBox="0 0 24 24">
                <path d="M7 12a5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5Zm5-9 3 3-3 3-3-3 3-3Zm0 12 3 3-3 3-3-3 3-3Z" />
              </svg>
              <span>Pix</span>
            </div>

            <div class="pagamento__item">
              <svg viewBox="0 0 24 24">
                <path d="M2 8h20M2 8v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2M6 16h4" />
              </svg>
              <span>Cartão de crédito/Débito</span>
            </div>


            <div class="pagamento__item">
              <svg viewBox="0 0 24 24">
                <path d="M20 12a2 2 0 0 1-2 2 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5Zm-8 0h.01" />
              </svg>
              <span>Dinheiro</span>
            </div>
          </div>
        </section>

  <section class="local">
  <div class="local__header">
    <h2>Onde estamos<span> localizados</span>?</h2>
    <p>Estamos bem localizados, com acesso rápido e vaga por perto pra você não perder tempo.</p>
  </div>
 
  <div class="local__grid">
    <div class="local__info">
 
      <div class="local__item">
        <div class="local__item-icon">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 12 2a7 7 0 0 1 7 7.5C19 14.9 12 21 12 21Zm0-8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>
        </div>
        <div>
          <h4>Endereço</h4>
          <p>Rua Exemplo, 123 — Jardim Veneza São José dos Campos, SP</p>
        </div>
      </div>
 
      <div class="local__item">
        <div class="local__item-icon">
          <svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
        </div>
        <div>
          <h4>Horário de funcionamento</h4>
          <p>Seg a sáb — 9h às 20h Domingo — fechado</p>
        </div>
      </div>
 
      <div class="local__item">
        <div class="local__item-icon">
          <svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8 10a16 16 0 0 0 6 6l1.3-1.4a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/></svg>
        </div>
        <div>
          <h4>Contato</h4>
          <p>(12) 90000-0000 WhatsApp e ligação</p>
        </div>
      </div>
 
      <a href="https://www.google.com/maps/dir/?api=1&destination=Rua+Exemplo+123+Jardim+Veneza+S%C3%A3o+Jos%C3%A9+dos+Campos" target="_blank" class="local__cta">
        Como chegar
      </a>
    </div>
 
    <div class="local__map">
      <iframe
        src="https://www.google.com/maps?q=Jardim+Veneza,+S%C3%A3o+Jos%C3%A9+dos+Campos+-+SP&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen>
      </iframe>
    </div>
  </div>
</section>
      </main>

      <footer className="site-footer">
        <p>Barbearia Estilo — São José dos Campos, SP</p>

      </footer>
    </>
  );
}
