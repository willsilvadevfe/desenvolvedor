import './Root.css'
import './Form.css'

const Form = () => {
  return (
    <div>
      <header>
        <div className="img-logo">
          <img src="../frontend/img/logo_pdc.png" alt="logo_pdc" width={100} />
        </div>
        <div className="header-text">
          <h2>Sistema de Gestão para Alertas da Qualidade</h2>
          <small>
            Acompanhamento de ocorrências, desvios e ações que requerem atenção.
          </small>
        </div>
      </header>
    </div>
  );
};

export default Form;
