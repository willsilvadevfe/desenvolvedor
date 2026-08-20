import StatusCalibracao from "./StatusCalibracao";
import { formatarDataBR } from "../utils/formatarData";
import "./ListaLancamentos.css";

// Recebe o array "registros" (o estado que vive no App.jsx) e uma
// função "onRemover". Este componente não altera o array diretamente
// — ele só pede para o pai remover, passando o id do item.
function ListaLancamentos({ registros, onRemover }) {
  if (registros.length === 0) {
    return (
      <section className="lista-vazia">
        <p>
          Nenhum instrumento lançado ainda. Preencha o formulário acima para
          começar.
        </p>
      </section>
    );
  }

  return (
    <section className="lista">
      <div className="lista-cabecalho">
        <h2>Lançamentos realizados</h2>
        <span className="lista-total">Total: {registros.length}</span>
      </div>

      <div className="lista-tabela-wrapper">
        <table className="lista-tabela">
          <thead>
            <tr>
              <th>N</th>
              <th>Código</th>
              <th>Calibração</th>
              <th>Vencimento</th>
              <th>Linha</th>
              <th>Equipamento</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, indice) => (
              <tr key={registro.id}>
                <td data-rotulo="#">{indice + 1}</td>
                <td data-rotulo="Código">{registro.codigoObjeto}</td>
                <td data-rotulo="Calibração">{registro.dataCalibracao}</td>
                <td data-rotulo="Vencimento">{registro.dataVencimento}</td>
                <td data-rotulo="Tipo">{registro.tipoObjeto}</td>
                <td data-rotulo="Setor">{registro.setor}</td>
                <td data-rotulo="Status">
                  <StatusCalibracao dataVencimento={registro.dataVencimento} />
                </td>
                <td data-rotulo="">
                  <button
                    type="button"
                    className="botao-remover"
                    onClick={() => onRemover(registro.id)}
                    aria-label={`Remover lançamento ${registro.codigoObjeto}`}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ListaLancamentos;
