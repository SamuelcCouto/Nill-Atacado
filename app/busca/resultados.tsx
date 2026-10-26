'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CardProduto } from '@/components/CardProduto';
import { buscar, categorias } from '@/lib/catalogo';

export function Resultados() {
  const termo = (useSearchParams().get('q') ?? '').trim();
  const lista = buscar(termo);

  if (!termo) {
    return (
      <header className="pagina__topo">
        <h1>Buscar produtos</h1>
        <p>Digite o nome do produto ou da marca na busca lá em cima.</p>
      </header>
    );
  }

  return (
    <>
      <header className="pagina__topo">
        <h1>Resultados para “{termo}”</h1>
        <p className="pagina__contagem" role="status">
          {lista.length} {lista.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
      </header>
      {lista.length > 0 ? (
        <div className="grade">
          {lista.map((p) => (
            <CardProduto key={p.slug} produto={p} />
          ))}
        </div>
      ) : (
        <div className="vazio">
          <p>Nada encontrado para “{termo}”. Tente pelo nome da marca ou veja as categorias:</p>
          <ul>
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/categoria/${c.slug}`} className="pastilha">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
