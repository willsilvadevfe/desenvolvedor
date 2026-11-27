/**
 * Ícones SVG industriais dedicados aos processos de forjamento,
 * corte de aço, solda por fricção e endireitamento.
 */

const baseProps = {
  viewBox: '0 0 48 48',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
};

/** Emblema de Qualidade Industrial (Escudo + Engrenagem / Calibre) */
export function IconQualityShield({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      <path
        d="M24 4L8 10.5V22.5C8 32.8 14.9 41.6 24 44C33.1 41.6 40 32.8 40 22.5V10.5L24 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 24.5L22 29L31 19"
        stroke="var(--accent-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Cortar haste - 14H: Haste cilíndrica de aço sendo seccionada por lâmina de corte */
export function IconCortarHaste({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      {/* Haste de aço esquerda e direita */}
      <rect
        x="4"
        y="22"
        width="16"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <rect
        x="28"
        y="22"
        width="16"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      {/* Guilhotina / lâmina descendente */}
      <path
        d="M19 6H29L26 20H22L19 6Z"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="20"
        x2="24"
        y2="37"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
        strokeDasharray="3 3"
        strokeLinecap="round"
      />
      {/* Base de apoio */}
      <path
        d="M12 36H36"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Cortar Tarugo - Federal: Serra / cisalhamento pesado em tarugo maciço */
export function IconCortarTarugo({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      {/* Tarugo maciço em perspectiva */}
      <path
        d="M6 21L12 16H22V34H6V21Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M27 16H38L42 20V34H27V16Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Disco / lâmina de corte industrial */}
      <circle
        cx="24.5"
        cy="12"
        r="6.5"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
      />
      <circle cx="24.5" cy="12" r="2" fill="var(--accent-primary)" />
      {/* Linha de corte e faísca */}
      <line
        x1="24.5"
        y1="18.5"
        x2="24.5"
        y2="39"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M19 38L16 42M30 38L33 42"
        stroke="var(--accent-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Prensa: Martelo/punção superior comprimindo peça aquecida sobre matriz */
export function IconPrensa({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      {/* Estrutura superior e pistão hidráulico */}
      <rect x="19" y="4" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M12 11H36V19L31 23H17L12 19V11Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Setas de força de prensagem */}
      <path
        d="M24 13V19M24 19L21 16M24 19L27 16"
        stroke="var(--accent-primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Peça forjada sob pressão */}
      <rect
        x="14"
        y="25"
        width="20"
        height="6"
        rx="2"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
      />
      {/* Bigorna / matriz inferior */}
      <path
        d="M8 31H40V38H34V43H14V38H8V31Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Corte de comprimento 2RC: Barra dimensionada com escala métrica e corte preciso */
export function IconCorteComprimento({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      {/* Escala / régua de medição de comprimento */}
      <path
        d="M7 10H33M7 7V13M33 7V13M15 9V12M24 9V12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Peça sendo cortada no comprimento exato */}
      <rect
        x="7"
        y="20"
        width="23"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <rect
        x="34"
        y="20"
        width="8"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeDasharray="3 2"
      />
      {/* Lâmina de precisão */}
      <path
        d="M32 14V38"
        stroke="var(--accent-primary)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M28 38H36"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Solda por fricção 35F: Dois eixos em rotação/atrito com cordão térmico de solda */
export function IconSoldaFriccao({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      {/* Eixo esquerdo e direito */}
      <rect
        x="4"
        y="19"
        width="17"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <rect
        x="27"
        y="19"
        width="17"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      {/* Zona de fusão por fricção */}
      <rect
        x="21"
        y="16"
        width="6"
        height="16"
        rx="2"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
      />
      {/* Movimento rotacional e faíscas */}
      <path
        d="M11 13C11 9.5 16 9.5 16 13"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M14.5 12L16.5 13.5L17.5 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 8V12M24 36V40M19 11L21 13M29 11L27 13M19 37L21 35M29 37L27 35"
        stroke="var(--accent-primary)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Endireitamento Prutton: Barra passando entre rolos endireitadores opostos */
export function IconEndireitamentoPrutton({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      {/* Rolos superiores */}
      <circle cx="15" cy="13" r="5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="33" cy="13" r="5" stroke="currentColor" strokeWidth="2.4" />
      {/* Eixo / barra alinhada no centro */}
      <rect
        x="4"
        y="21"
        width="40"
        height="6"
        rx="1.5"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
      />
      {/* Rolo inferior central de pressão */}
      <circle cx="24" cy="35" r="5" stroke="currentColor" strokeWidth="2.4" />
      {/* Centros dos rolos */}
      <circle cx="15" cy="13" r="1.5" fill="currentColor" />
      <circle cx="33" cy="13" r="1.5" fill="currentColor" />
      <circle cx="24" cy="35" r="1.5" fill="currentColor" />
    </svg>
  );
}

/** Endireitamento RD6: Conjunto múltiplo de rolos de precisão e alinhamento linear */
export function IconEndireitamentoRD6({ className = '' }) {
  return (
    <svg {...baseProps} className={className}>
      {/* Bateria de 6 rolos (3 superiores + 3 inferiores) */}
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="13" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="36" cy="13" r="4" stroke="currentColor" strokeWidth="2.2" />

      <circle cx="12" cy="35" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="24" cy="35" r="4" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="36" cy="35" r="4" stroke="currentColor" strokeWidth="2.2" />

      {/* Linha de eixo perfeitamente retilínea */}
      <path
        d="M4 24H44"
        stroke="var(--accent-primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M39 20L44 24L39 28"
        stroke="var(--accent-primary)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Seta de navegação para os cards de processo */
export function IconArrowRight({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
