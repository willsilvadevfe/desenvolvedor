import { calcularStatus, obterInfoStatus } from '../utils/statusCalibracao';

// Componente pequeno e focado: recebe só a data de vencimento e
// desenha o "selo" colorido (🟢 Válido / 🟡 Próximo / 🔴 Vencido).
// Toda a regra de negócio fica em utils/statusCalibracao.js — aqui
// é só apresentação.
function StatusCalibracao({ dataVencimento }) {
  const status = calcularStatus(dataVencimento);
  const info = obterInfoStatus(status);

  return (
    <span className={`selo-status selo-status-${info.cor}`}>
      {info.emoji} {info.texto}
    </span>
  );
}

export default StatusCalibracao;
