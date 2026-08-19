import './ResumoRelatorio.css';

// Recebe o objeto "resumo" ({ total, validos, alerta, vencidos })
// já calculado pelo App.jsx e apenas exibe os números.
// Fica separado do ModalConfirmacao porque esses mesmos números
// aparecem em duas telas do modal (confirmação e sucesso).
function ResumoRelatorio({ resumo }) {
  return (
    <div className="resumo-relatorio">
      <div className="resumo-linha resumo-total">
        <span>Total de instrumentos</span>
        <strong>{resumo.total}</strong>
      </div>
      <div className="resumo-linha">
        <span>🟢 Válidos</span>
        <strong>{resumo.validos}</strong>
      </div>
      <div className="resumo-linha">
        <span>🟡 Próximos do vencimento</span>
        <strong>{resumo.alerta}</strong>
      </div>
      <div className="resumo-linha">
        <span>🔴 Vencidos</span>
        <strong>{resumo.vencidos}</strong>
      </div>
    </div>
  );
}

export default ResumoRelatorio;
