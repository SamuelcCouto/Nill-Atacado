/**
 * Versão plana da logo, redesenhada do PNG 3D para tamanhos pequenos e fundo azul.
 * Letras em `currentColor` (branco no cabeçalho, azul em fundo claro);
 * ponto do i, cunha do N e faixa ATACADO sempre amarelos.
 * Provisória até o cliente mandar o vetor oficial.
 */
export function Logo({ className, titulo = 'Nill Atacado' }: { className?: string; titulo?: string }) {
  return (
    <svg className={className} viewBox="0 0 282 128" role="img" aria-label={titulo} focusable="false">
      <g fill="currentColor" stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
        {/* N */}
        <path d="M3 3 H30 L64 46 V3 H91 V83 H64 L30 40 V83 H3 Z" />
        {/* i */}
        <rect x="101" y="31" width="26" height="52" rx="3" />
        {/* L L */}
        <path d="M137 3 H164 V60 H204 V83 H137 Z" />
        <path d="M212 3 H239 V60 H279 V83 H212 Z" />
      </g>
      <g fill="var(--amarelo, #FFCC00)">
        <path d="M3 83 L30 56 V83 Z" stroke="var(--amarelo, #FFCC00)" strokeWidth="6" strokeLinejoin="round" />
        <rect x="98" y="0" width="32" height="25" rx="6" />
        <rect x="0" y="94" width="282" height="34" rx="17" />
      </g>
      <g fill="var(--azul, #0033C4)">
        <rect x="16" y="108" width="44" height="6" rx="3" />
        <rect x="222" y="108" width="44" height="6" rx="3" />
        <text
          x="141"
          y="120.5"
          textAnchor="middle"
          fontFamily="var(--fonte-titulo), sans-serif"
          fontWeight="800"
          fontSize="24"
          letterSpacing="5"
        >
          ATACADO
        </text>
      </g>
    </svg>
  );
}
