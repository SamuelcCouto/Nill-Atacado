import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Resultados } from './resultados';

export const metadata: Metadata = { title: 'Busca', robots: { index: false } };

export default function PaginaBusca() {
  return (
    <div className="container pagina">
      <Suspense fallback={<p className="pagina__topo">Buscando…</p>}>
        <Resultados />
      </Suspense>
    </div>
  );
}
