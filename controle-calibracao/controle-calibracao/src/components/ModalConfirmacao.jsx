import ResumoRelatorio from './ResumoRelatorio';
import './ModalConfirmacao.css';

// Este modal tem 4 "telas" possíveis, controladas pela prop
// statusEnvio, que vem do App.jsx:
//   'idle'     -> pedindo confirmação, mostrando o resumo
//   'enviando' -> gerando o CSV e enviando o e-mail (com spinner)
//   'sucesso'  -> deu tudo certo
//   'erro'     -> falhou o envio, mas o CSV já existe para download
function ModalConfirmacao({
  resumo,
  statusEnvio,
  onCancelar,
  onConfirmar,
  onBaixarCSV,
  onNovoRelatorio,
}) {
  return (
    <div className="modal-fundo" role="dialog" aria-modal="true">
      <div className="modal-caixa">
        {statusEnvio === 'idle' && (
          <>
            <h2>Finalizar relatório</h2>
            <ResumoRelatorio resumo={resumo} />
            <p className="modal-pergunta">Deseja gerar e enviar o relatório?</p>
            <div className="modal-acoes">
              <button type="button" className="botao botao-secundario" onClick={onCancelar}>
                Cancelar
              </button>
              <button type="button" className="botao botao-primario" onClick={onConfirmar}>
                Finalizar relatório
              </button>
            </div>
          </>
        )}

        {statusEnvio === 'enviando' && (
          <div className="modal-carregando">
            <div className="spinner" aria-hidden="true"></div>
            <p>Gerando CSV e enviando o relatório por e-mail...</p>
          </div>
        )}

        {statusEnvio === 'sucesso' && (
          <>
            <h2>✓ Relatório enviado com sucesso!</h2>
            <ResumoRelatorio resumo={resumo} />
            <p className="modal-pergunta">O arquivo CSV foi enviado por e-mail.</p>
            <div className="modal-acoes">
              <button type="button" className="botao botao-secundario" onClick={onBaixarCSV}>
                Baixar CSV
              </button>
              <button type="button" className="botao botao-primario" onClick={onNovoRelatorio}>
                Iniciar novo relatório
              </button>
            </div>
          </>
        )}

        {statusEnvio === 'erro' && (
          <>
            <h2>Não foi possível enviar o relatório por email</h2>
            <p className="modal-pergunta">
              O CSV foi gerado corretamente. Você pode baixar o arquivo ou tentar enviar novamente.
            </p>
            <div className="modal-acoes">
              <button type="button" className="botao botao-secundario" onClick={onBaixarCSV}>
                Baixar CSV
              </button>
              <button type="button" className="botao botao-secundario" onClick={onCancelar}>
                Fechar
              </button>
              <button type="button" className="botao botao-primario" onClick={onConfirmar}>
                Tentar novamente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalConfirmacao;
