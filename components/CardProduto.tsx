import Image from 'next/image';
import Link from 'next/link';
import { AdicionarAoPedido } from '@/components/AdicionarAoPedido';
import { formatarPreco, type Produto } from '@/lib/catalogo';

export function CardProduto({ produto, prioridade = false }: { produto: Produto; prioridade?: boolean }) {
  const foto = produto.fotos[0];
  return (
    <article className="card">
      <Link href={`/produto/${produto.slug}`} className="card__foto">
        <Image
          src={foto.src}
          alt={foto.alt}
          width={1024}
          height={1024}
          sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 240px"
          priority={prioridade}
        />
      </Link>
      <div className="card__corpo">
        <span className="pastilha">{produto.unidade}</span>
        <h3 className="card__nome">
          <Link href={`/produto/${produto.slug}`}>{produto.nome}</Link>
        </h3>
        {produto.marca && <p className="card__marca">{produto.marca}</p>}
        <p className="preco">
          {produto.preco === null ? <span className="preco__consulta">Preço sob consulta</span> : formatarPreco(produto.preco)}
        </p>
        <AdicionarAoPedido slug={produto.slug} nome={produto.nome} unidadePlural={produto.unidadePlural} />
      </div>
    </article>
  );
}
