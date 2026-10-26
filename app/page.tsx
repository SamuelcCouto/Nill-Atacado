import Link from 'next/link';
import { Banner } from '@/components/Banner';
import { CardProduto } from '@/components/CardProduto';
import { categorias, produtosDaCategoria } from '@/lib/catalogo';

const passos = [
  { titulo: 'Escolha os produtos', texto: 'Navegue pelas categorias ou busque pelo nome ou pela marca.' },
  { titulo: 'Ajuste as quantidades', texto: 'Use o − e o + em cada produto. Tudo fica guardado no seu pedido.' },
  { titulo: 'Envie pelo WhatsApp', texto: 'A lista chega pronta para a nossa equipe confirmar preço, total e entrega.' },
];

export default function Inicio() {
  return (
    <>
      <Banner />

      <section id="como-pedir" className="como container" aria-labelledby="como-titulo">
        <h2 id="como-titulo" className="sr-only">
          Como pedir
        </h2>
        <ol className="como__passos">
          {passos.map((p, i) => (
            <li key={p.titulo}>
              <span className="como__n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div id="vitrine" className="vitrine container">
        {categorias.map((c, ci) => {
          const lista = produtosDaCategoria(c.slug);
          if (lista.length === 0) return null;
          return (
            <section key={c.slug} className="secao" aria-labelledby={`cat-${c.slug}`}>
              <div className="secao__topo">
                <h2 id={`cat-${c.slug}`}>{c.nome}</h2>
                <Link href={`/categoria/${c.slug}`}>Ver todos</Link>
              </div>
              <div className="grade">
                {lista.map((p, i) => (
                  <CardProduto key={p.slug} produto={p} prioridade={ci === 0 && i === 0} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
