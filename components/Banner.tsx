'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icone } from '@/components/Icone';

/**
 * Banner com troca em fade lento (7 s). Pausa no hover, no foco, com a aba escondida
 * e com movimento reduzido. Textos do banner enviado pelo cliente; a arte foi recomposta
 * na paleta nova porque o original usa a logo antiga.
 */
const slides = [
  {
    id: 'estoque',
    titulo: 'Seu estoque sempre completo!',
    texto: 'Doces, salgadinhos e muito mais para o seu negócio.',
    acao: { rotulo: 'Ver produtos', href: '/#vitrine' },
    fotos: [
      { src: '/produtos/pacoca-riquita-ricco-20un.webp', alt: '' },
      { src: '/produtos/doce-de-leite-tablete-o-grilao-800g.webp', alt: '' },
      { src: '/produtos/torresmo-goiano-cartela-25g.webp', alt: '' },
    ],
  },
  {
    id: 'pedido',
    titulo: 'Monte o pedido aqui, feche no WhatsApp.',
    texto: 'Escolha os produtos e as quantidades. A lista chega pronta para a nossa equipe.',
    acao: { rotulo: 'Como pedir', href: '/#como-pedir' },
    fotos: [
      { src: '/produtos/amendoim-confeitado-fardo.webp', alt: '' },
      { src: '/produtos/delikuky-crock-pacote.webp', alt: '' },
      { src: '/produtos/pacoca-rolha-pote-aberto.webp', alt: '' },
    ],
  },
];

export function Banner() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      if (!document.hidden) setAtual((i) => (i + 1) % slides.length);
    }, 7000);
    return () => clearInterval(t);
  }, [pausado]);

  const ir = (i: number) => setAtual((i + slides.length) % slides.length);

  return (
    <section
      className="banner"
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      <div className="banner__palco container">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className="banner__slide"
            data-ativo={i === atual || undefined}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${slides.length}`}
            aria-hidden={i !== atual}
            inert={i !== atual}
          >
            <div className="banner__texto">
              {i === 0 ? <h1>{s.titulo}</h1> : <h2 className="banner__h">{s.titulo}</h2>}
              <p>{s.texto}</p>
              <Link href={s.acao.href} className="botao botao--amarelo">
                {s.acao.rotulo}
              </Link>
            </div>
            <div className="banner__fotos" aria-hidden="true">
              {s.fotos.map((f) => (
                <Image key={f.src} src={f.src} alt={f.alt} width={360} height={360} priority={i === 0} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="banner__controles container">
        <button type="button" className="botao-icone" onClick={() => ir(atual - 1)} aria-label="Destaque anterior">
          <Icone nome="seta-esq" />
        </button>
        <div className="banner__pontos">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Ir para o destaque ${i + 1}`}
              aria-current={i === atual || undefined}
              onClick={() => ir(i)}
            />
          ))}
        </div>
        <button type="button" className="botao-icone" onClick={() => ir(atual + 1)} aria-label="Próximo destaque">
          <Icone nome="seta-dir" />
        </button>
      </div>
    </section>
  );
}
