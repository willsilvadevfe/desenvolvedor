export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="brand">
          <span className="brand__mark">B</span>
          <span className="brand__name">Barbearia Estilo</span>
        </div>
        <a className="site-header__cta" href="#agendar">
          Agendar horário
        </a>
      </div>
    </header>
  );
}
