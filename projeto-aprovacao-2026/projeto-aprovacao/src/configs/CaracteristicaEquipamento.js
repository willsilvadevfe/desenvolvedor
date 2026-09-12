// Importar as imagens direto aqui — o Vite converte em URL automaticamente
import imgBorazon from "../assets/img/borazon.png";
import imgTorno01 from "../assets/img/login.svg";
// ... um import por equipamento

export const caracteristicasEquipamento = {
  //Borazon Retifica do topo
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

  //15G Retifica da haste semi-acabada
  "15g": {
    titulo: "FIP010 - 15G - Retífica da haste semi acabada",
    operacao: "15G",
    docRef: "010",
    imagem: imgBorazon,
    imagemAlt: "Desenho técnico de retífica da haste semi acabada - 15G",
    campos: [
      {
        id: "diametro-pe",
        tipo: "texto",
        label: "Diâmetro da haste pé",
        placeholder: "Ex.: -0,003",
        obrigatorio: true,
      },
      {
        id: "diametro-meio",
        tipo: "texto",
        label: "Diâmetro da haste meio",
        placeholder: "Ex.: 0,002",
        obrigatorio: true,
      },
      {
        id: "diametro-ponta",
        tipo: "texto",
        label: "Diâmetro da haste ponta",
        placeholder: "Ex.: 0,005",
        obrigatorio: true,
      },
      {
        id: "diametro-solda",
        tipo: "texto",
        label: "Diâmetro da haste solda",
        placeholder: "Ex.: 0,000",
        obrigatorio: false,
      },
      {
        id: "ovalizacao",
        tipo: "texto",
        label: "Ovalização da haste",
        placeholder: "Ex.: 0,002",
        obrigatorio: true,
      },
      {
        id: "paralelo",
        tipo: "texto",
        label: "Comprimento do paralelo",
        placeholder: "Ex.: 25,35",
        obrigatorio: true,
      },
    ],
  },

  //15S Retifica da haste semi-acabada
  "15s": {
    titulo: "FIP011 - 15S - Retífica da haste semi acabada",
    operacao: "15S",
    docRef: "011",
    imagem: imgBorazon,
    imagemAlt: "Desenho técnico de retífica da haste semi acabada - 15S",
    campos: [
      {
        id: "diametro-pe",
        tipo: "texto",
        label: "Diâmetro da haste pé",
        placeholder: "Ex.: -0,003",
        obrigatorio: true,
      },
      {
        id: "diametro-meio",
        tipo: "texto",
        label: "Diâmetro da haste meio",
        placeholder: "Ex.: 0,002",
        obrigatorio: true,
      },
      {
        id: "diametro-ponta",
        tipo: "texto",
        label: "Diâmetro da haste ponta",
        placeholder: "Ex.: 0,005",
        obrigatorio: true,
      },
      {
        id: "ovalizacao-pe",
        tipo: "texto",
        label: "Ovalização da haste pé",
        placeholder: "Ex.: 0,002",
        obrigatorio: true,
      },
      {
        id: "ovalizacao-meio",
        tipo: "texto",
        label: "Ovalização da haste meio",
        placeholder: "Ex.: 0,006",
        obrigatorio: true,
      },
      {
        id: "ovalizacao-ponta",
        tipo: "texto",
        label: "Ovalização da haste ponta",
        placeholder: "Ex.: 0,007",
        obrigatorio: true,
      },
      {
        id: "paralelo",
        tipo: "texto",
        label: "Comprimento do paralelo",
        placeholder: "Ex.: 35,40",
        obrigatorio: true,
      },
    ],
  },

  //15S Retifica da haste semi-acabada
  "15gs": {
    titulo: "FIP011 - 15GS - Retífica da haste semi acabada",
    operacao: "15GS",
    docRef: "011",
    imagem: imgBorazon,
    imagemAlt: "Desenho técnico de retífica da haste semi acabada - 15GS",
    campos: [
      {
        id: "diametro-pe",
        tipo: "texto",
        label: "Diâmetro da haste pé",
        placeholder: "Ex.: -0,003",
        obrigatorio: true,
      },
      {
        id: "diametro-meio",
        tipo: "texto",
        label: "Diâmetro da haste meio",
        placeholder: "Ex.: 0,002",
        obrigatorio: true,
      },
      {
        id: "diametro-ponta",
        tipo: "texto",
        label: "Diâmetro da haste ponta",
        placeholder: "Ex.: 0,005",
        obrigatorio: true,
      },
      {
        id: "ovalizacao-pe",
        tipo: "texto",
        label: "Ovalização da haste pé",
        placeholder: "Ex.: 0,002",
        obrigatorio: true,
      },
      {
        id: "ovalizacao-meio",
        tipo: "texto",
        label: "Ovalização da haste meio",
        placeholder: "Ex.: 0,006",
        obrigatorio: true,
      },
      {
        id: "ovalizacao-ponta",
        tipo: "texto",
        label: "Ovalização da haste ponta",
        placeholder: "Ex.: 0,007",
        obrigatorio: true,
      },
      {
        id: "paralelo",
        tipo: "texto",
        label: "Comprimento do paralelo",
        placeholder: "Ex.: 35,40",
        obrigatorio: true,
      },
    ],
  },

  //18D Retifica do diâmetro da cabeça
  "18d":{
    titulo: "FIP014 - 18D - Retífica do diâmetro da cabeça",
    operacao: "18D",
    docRef: "014",
    imagem: imgBorazon,
    imagemAlt: "Desenho técnico de retífica do diâmetro da cabeça",
    campos:[
      {
        id: "diâmetro-cabeca",
        tipo: "texto",
        label: "Diâmetro da cabeça",
        placeholder: "Ex.: -0,04",
        obrigatorio: true,
      },
      {
        id: "batimento-cabeca",
        tipo: "texto",
        label: "Batimento da cabeça",
        placeholder: "Ex.: 0,09",
        obrigatorio: true,
      },
      {
        id: "conicidade-cabeca",
        tipo: "texto",
        label: "Cônicidade da cabeça",
        placeholder: "Ex.: 0,02",
        obrigatorio: true,
      },
      
    ]
  }

};
