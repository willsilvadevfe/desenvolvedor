// Importar as imagens direto aqui — o Vite converte em URL automaticamente
import imgBorazon from "../assets/img/login.svg";
import imgTorno01 from "../assets/img/login.svg";
// ... um import por equipamento

export const caracteristicasEquipamento = {
  borazon: {
    titulo: "FIP021 - Borazon - Corte de comprimento",
    operacao: "Borazon",
    docRef: "021",
    imagem: imgBorazon,
    imagemAlt: "Desenho técnico do corte de comprimento - Borazon",
    campos: [
      {
        id: "caracteristica",
        tipo: "select",
        label: "Característica",
        opcoes: [
          "Comprimento face/ponta",
          "Comprimento sede/ponta",
          "Comprimento enchimento/ponta",
        ],
        obrigatorio: true,
      },
      {
        id: "comprimento",
        tipo: "texto",
        label: "Valor do comprimento",
        placeholder: "Ex.: -0,03",
        obrigatorio: true,
      },
      {
        id: "esquadro",
        tipo: "texto",
        label: "Esquadro do topo",
        placeholder: "Ex.: 0,038",
        obrigatorio: true,
      },
      {
        id: "deformacao",
        tipo: "texto",
        label: "Deformação do topo",
        placeholder: "Ex.: 0,04",
        obrigatorio: false,
      },
    ],
  },

  torno01: {
    titulo: "FIP0XX - Torno 01 - ...",
    operacao: "Torno 01",
    docRef: "0XX",
    imagem: imgTorno01,
    imagemAlt: "Desenho técnico - Torno 01",
    campos: [
      // campos específicos desse equipamento
    ],
  },

  // ... os outros ~23 equipamentos seguem o mesmo formato
};
