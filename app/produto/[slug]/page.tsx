import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdicionarAoPedido } from '@/components/AdicionarAoPedido';
import { CardProduto } from '@/components/CardProduto';
import { Galeria } from '@/components/Galeria';
import { categoriaPorSlug, formatarPreco, produtoPorSlug, produtos, produtosDaCategoria } from '@/lib/catalogo';

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<'/produto/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params;
  const p = produtoPorSlug(slug);
  if (!p) return {};
  return {
    title: p.nome,
    description: `${p.nome}${p.marca ? ` ${p.marca}` : ''}, ${p.unidade}. Peça no atacado pela Nill.`,
    openGraph: { images: [p.fotos[0].src] },
  };
}

export default async function PaginaProduto(props: PageProps<'/produto/[slug]'>) {
  const { slug } = await props.params;
  const produto = produtoPorSlug(slug);
  if (!produto) notFound();
  const categoria = categoriaPorSlug(produto.categoria);
  const relacionados = produtosDaCategoria(produto.categoria).filter((p) => p.slug !== produto.slug).slice(0, 4);

  return (
    <div className="container pagina">
      <nav className="trilha" aria-label="Você está em">
        <Link href="/">Início</Link> <span aria-hidden="true">/</span>{' '}
        {categoria && (
          <>
            <Link href={`/categoria/${categoria.slug}`}>{categoria.nome}</Link> <span aria-hidden="true">/</span>{' '}
          </>
        )}
        <span aria-current="page">{produto.nome}</span>
      </nav>

      <div className="produto">
        <Galeria fotos={produto.fotos} />

        <div className="produto__info">
          {produto.marca && <p className="produto__marca">{produto.marca}</p>}
          <h1>{produto.nome}</h1>
          <span className="pastilha pastilha--grande">{produto.unidade}</span>
          {produto.detalhe && <p className="produto__detalhe">{produto.detalhe}</p>}

          <p className="preco preco--grande">
            {produto.preco === null ? <span className="preco__consulta">Preço sob consulta</span> : formatarPreco(produto.preco)}
          </p>
          {produto.preco === null && (
            <p className="produto__nota">Adicione ao pedido: a nossa equipe confirma o preço de atacado pelo WhatsApp.</p>
          )}

          <AdicionarAoPedido slug={produto.slug} nome={produto.nome} unidadePlural={produto.unidadePlural} grande />
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="secao" aria-labelledby="relacionados">
          <div className="secao__topo">
            <h2 id="relacionados">Mais em {categoria?.nome}</h2>
          </div>
          <div className="grade">
            {relacionados.map((p) => (
              <CardProduto key={p.slug} produto={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
