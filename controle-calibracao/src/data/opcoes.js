export const LINHAS = [
  "Linha 01",
  "Linha 02",
  "Linha 03",
  "Linha 04",
  "Linha 05",
  "Linha 06",
  "Linha 07",
  "Linha 08",
  "Linha 09",
  "Linha 10",
  "Linha 11",
  "Linha 12",
  "Linha 13",
  "Linha 14",
  "BV(1)",
  "BV(2)",
  "AFTM(1)",
  "AFTM(2)",
  "AFTM(3)",
  "Cromadora",
];

const MESES = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

export const SETORES = [
  "Borazon",
  "15G",
  "15S",
  "15A",
  "15AC",
  "15AN",
  "15P",
  "18D",
  "18DS",
  "18F",
  "HSG",
  "EMB",
  "HSF",
  "CNC",
  "15PC",
  "21A",
  "25",
  "Tempera",
  "Cromadora",
  "Ponta de Linha",
  "Visual",
];

export const opcoesPorTipo = {
  Borazon: [
    "Comprimento Face/Ponta",
    "Comprimento Enchimento/Ponta",
    "Comprimento Sede/Ponta",
    "Esquadro do topo",
  ],

  "15G": [
    "Diâmetro da haste",
    "Ovalização da haste",
    "Diâmetro do rebaixo",
    "Diâmetro do ressalto",
  ],
  "15S": [
    "Diâmetro da haste",
    "Ovalização da haste",
    "Diâmetro do rebaixo",
    "Diâmetro do ressalto",
  ],
  "15A": [
    "Diâmetro da haste",
    "Ovalização da haste",
    "Diâmetro do rebaixo",
    "Diâmetro do ressalto",
  ],
  "15AC": [
    "Diâmetro da haste",
    "Ovalização da haste",
    "Diâmetro do rebaixo",
    "Diâmetro do ressalto",
  ],
  "15AN": [
    "Diâmetro da haste",
    "Ovalização da haste",
    "Diâmetro do rebaixo",
    "Diâmetro do ressalto",
  ],
  "15P": [
    "Diâmetro do rebaixo",
    "Comprimento do rebaixo",
    "Ovalização do rebaixo",
  ],

  "18D": ["Diâmetro da cabeça", "Batimento da cabeça"],

  "18DS": [
    "Diâmetro da cabeça",
    "Batimento da cabeça",
    "Batimento do canal de solda",
    "Comprimento Filete/Ponta",
    "Espessura do Filete",
    "Diâmetro interno",
  ],

  "18F": [
    "Diâmetro da cabeça",
    "Batimento da cabeça",
    "Batimento da sede",
    "Espessura da margem",
    "Espessura da cabeça",
    "Comprimento Face/Ponta",
    "Esquadro da face",
  ],

  HSG: [
    "Diâmetro da cabeça",
    "Batimento da cabeça",
    "Batimento da sede",
    "Espessura da margem",
    "Espessura da cabeça",
    "Comprimento Sede/Ponta",
    "Comprimento Enchimento/Ponta",
    "Diâmetro do colarinho",
  ],

  EMB: [
    "Diâmetro da cabeça",
    "Batimento da cabeça",
    "Batimento da sede",
    "Espessura da margem",
    "Espessura da cabeça",
    "Comprimento Sede/Ponta",
    "Comprimento Enchimento/Ponta",
    "Diâmetro do colarinho",
  ],

  HSF: ["Comprimento Face/Ponta", "Esquadro da face"],

  CNC: [
    "Diâmetro da cabeça",
    "Batimento da cabeça",
    "Batimento da sede",
    "Espessura da margem",
    "Espessura da cabeça",
    "Comprimento Face/Ponta",
    "Profundidade da depressão",
    "Esquadro da face",
  ],

  "15PC": [
    "Diâmetro da canaleta",
    "Diâmetro do blend",
    "Comprimento Face/Canaleta",
    "Comprimento Canaleta/Ponta",
    "Comprimento Sede/Canaleta",
  ],

  "21A": [
    "Comprimento Face/Ponta",
    "Esquadro do topo",
    "Comprimento Sede/Ponta",
  ],

  25: [
    "Espessura da margem",
    "Comprimento Sede/Ponta",
    "Comprimento Sede/Canaleta",
    "Batimento da Sede",
  ],

  Tempera: ["Empenamento da ponta"],

  "Ponta de Linha": [
    "Diâmetro da cabeça",
    "Espessura da margem",
    "Comprimento Sede/Ponta",
    "Comprimento Sede/Canaleta",
    "Diâmetro da canaleta",
    "Diâmetro da haste",
    "Batimento da sede",
    "Diâmetro do rebaixo",
    "Esquadro do topo",
  ],

  Visual: [
    "Diâmetro da cabeça",
    "Espessura da margem",
    "Comprimento Sede/Ponta",
    "Comprimento Sede/Canaleta",
    "Diâmetro da canaleta",
    "Diâmetro da haste",
    "Batimento da sede",
    "Diâmetro do rebaixo",
    "Esquadro do topo",
  ],

  Cromadora: [
    "Diâmetro da haste",
    "Paquimetro Digital",
    "Comprimento do Paralelo",
  ],
};

// Estrutura inicial de um lançamento. Usada para limpar o formulário
export const CAMPO_INICIAL = {
  codigoObjeto: "",
  dataCalibracao: "",
  dataVencimento: "",
  setor: "",
  responsavel: "",
  etiquetaLegivel: null,
};
