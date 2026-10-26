import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CardProduto } from '@/components/CardProduto';
import { categoriaPorSlug, categorias, produtosDaCategoria } from '@/lib/catalogo';

export function generateStaticParams() {
  return categorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<'/categoria/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const c = categoriaPorSlug(slug);
  return c ? { title: c.nome, description: c.descricao } : {};
}

export default async function PaginaCategoria(props: PageProps<'/categoria/[slug]'>) {
  const { slug } = await props.params;
  const categoria = categoriaPorSlug(slug);
  if (!categoria) notFound();
  const lista = produtosDaCategoria(slug);

  return (
    <div className="container pagina">
      <nav className="trilha" aria-label="Você está em">
        <Link href="/">Início</Link> <span aria-hidden="true">/</span> <span aria-current="page">{categoria.nome}</span>
      </nav>
      <header className="pagina__topo">
        <h1>{categoria.nome}</h1>
        <p>{categoria.descricao}</p>
        <p className="pagina__contagem">
          {lista.length} {lista.length === 1 ? 'produto' : 'produtos'}
        </p>
      </header>
      <div className="grade">
        {lista.map((p, i) => (
          <CardProduto key={p.slug} produto={p} prioridade={i === 0} />
        ))}
      </div>
    </div>
  );
}
