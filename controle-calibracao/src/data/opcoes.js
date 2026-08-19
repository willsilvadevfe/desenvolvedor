// Todas as opções dos campos "select" ficam aqui.
// Se um dia precisar adicionar/remover um tipo de objeto, um setor
// ou um responsável, este é o único arquivo que precisa ser editado.

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

export const RESPONSAVEIS = ["João Silva", "Maria Souza", "Carlos Pereira"];

const NOMES_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const SETORES = [
  "Borazon",
  "15G",
  "15S",
  "15A",
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
  "Bancada (Ponta de Linha)",
  "Visual",
];

export const opcoesPorTipo = {
  Borazon: [
    "Comprimento Face/Ponta",
    "Comprimento Enchimento/Ponta",
    "Comprimento Sede/Ponta",
    "Esquadro do topo",
  ],

  "15G": ["Diâmetro da haste", "Ovalização da haste"],
  "15S": ["Diâmetro da haste", "Ovalização da haste"],
  "15A": ["Diâmetro da haste", "Ovalização da haste"],

  "18D": ["Diâmetro da cabeça", "Batimento da cabeça"],

  "18DS": [
    "Diâmetro da cabeça",
    "Batimento da cabeça",
    "Batimento do canal de solda",
    "Comprimento Filete/Ponta",
    "Espessura do Filete",
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

  Tempera: ["Batimento da ponta"],

  "Bancada (Ponta de Linha)": [
    "Diâmetro da cabeça",
    "Espessura da margem",
    "Comprimento Sede/Ponta",
    "Comprimento Sede/Canaleta",
    "Diâmetro da canaleta",
    "Diâmetro da haste",
    "Batimento da sede",
    "Diâmetro do rebaixo",
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
  ],

  Cromadora: [
    "Diâmetro da haste",
    "Paquimetro Digital",
    "Comprimento do Paralelo",
  ],
};

// Estrutura inicial de um lançamento. Usada para limpar o formulário
// e para saber quais campos um registro deve ter.
// Se precisar adicionar um novo campo no futuro (ex: "observacoes"),
// basta incluir a propriedade aqui e no formulário.
export const CAMPO_INICIAL = {
  codigoObjeto: "",
  dataCalibracao: "",
  dataVencimento: "",
  tipoObjeto: "",
  setor: "",
  responsavel: "",
};
