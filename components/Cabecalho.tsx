'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/Logo';
import { Icone } from '@/components/Icone';
import { categorias } from '@/lib/catalogo';
import { gaveta, totalUnidades, useCarrinho } from '@/lib/carrinho';

export function Cabecalho({ termoInicial = '' }: { termoInicial?: string }) {
  const router = useRouter();
  const pedido = useCarrinho();
  const unidades = totalUnidades(pedido);
  const contador = useRef<HTMLSpanElement>(null);
  const [termo, setTermo] = useState(termoInicial);

  // Gesto-assinatura: o contador "soma" com um pulo curto a cada item adicionado.
  useEffect(() => {
    const pular = () => {
      const el = contador.current;
      if (!el) return;
      el.classList.remove('is-somou');
      void el.offsetWidth; // reinicia a animação mesmo em cliques seguidos
      el.classList.add('is-somou');
    };
    window.addEventListener('nill:somou', pular);
    return () => window.removeEventListener('nill:somou', pular);
  }, []);

  return (
    <header className="cabecalho" data-regiao="cabecalho">
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="cabecalho__linha container">
        <Link href="/" className="cabecalho__logo">
          <Logo />
        </Link>

        <form
          className="busca"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const q = termo.trim();
            router.push(q ? `/busca?q=${encodeURIComponent(q)}` : '/busca');
          }}
        >
          <label htmlFor="busca" className="sr-only">
            Buscar produtos
          </label>
          <input
            id="busca"
            type="search"
            placeholder="Buscar produtos, marcas…"
            autoComplete="off"
            enterKeyHint="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">
            <Icone nome="lupa" />
          </button>
        </form>

        <button
          type="button"
          className="cabecalho__pedido"
          data-pedido-alvo
          onClick={gaveta.abrir}
          aria-label={unidades ? `Ver pedido, ${unidades} ${unidades === 1 ? 'unidade' : 'unidades'}` : 'Ver pedido, vazio'}
        >
          <Icone nome="carrinho" />
          <span className="cabecalho__pedido-rotulo">Pedido</span>
          <span ref={contador} className="contador" data-vazio={unidades === 0 || undefined} aria-hidden="true">
            {unidades > 99 ? '99+' : unidades}
          </span>
        </button>
      </div>

      <nav className="categorias-nav" aria-label="Categorias">
        <ul className="container">
          <li>
            <Link href="/#vitrine">Todos os produtos</Link>
          </li>
          {categorias.map((c) => (
            <li key={c.slug}>
              <Link href={`/categoria/${c.slug}`}>{c.nome}</Link>
            </li>
          ))}
          <li>
            <Link href="/#como-pedir">Como pedir</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
