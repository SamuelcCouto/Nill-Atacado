'use client';

import { useState } from 'react';
import { Icone } from '@/components/Icone';
import { carrinho, gaveta, QTD_MAX, useCarrinho } from '@/lib/carrinho';

/**
 * Quantidade + "Adicionar". Depois de adicionar, o botão vira a pastilha
 * "No pedido ✓" com a quantidade que já está no carrinho; clicar nela abre o pedido.
 */
export function AdicionarAoPedido({
  slug,
  nome,
  unidadePlural,
  grande = false,
}: {
  slug: string;
  nome: string;
  unidadePlural: string;
  grande?: boolean;
}) {
  const pedido = useCarrinho();
  const noPedido = pedido.itens.find((i) => i.slug === slug)?.qtd ?? 0;
  const [qtd, setQtd] = useState(1);
  const [texto, setTexto] = useState(String(qtd));

  const definir = (n: number) => {
    const v = Math.max(1, Math.min(QTD_MAX, Math.round(n) || 1));
    setQtd(v);
    setTexto(String(v));
  };

  return (
    <div className={`adicionar${grande ? ' adicionar--grande' : ''}`}>
      <div className="qtd" role="group" aria-label={`Quantidade de ${nome}`}>
        <button type="button" onClick={() => definir(qtd - 1)} disabled={qtd <= 1} aria-label="Diminuir quantidade">
          <Icone nome="menos" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-label={`Quantidade (${unidadePlural})`}
          value={texto}
          onChange={(e) => {
            const limpo = e.target.value.replace(/\D/g, '').slice(0, 3);
            setTexto(limpo);
            if (limpo) setQtd(Math.max(1, Number(limpo)));
          }}
          onBlur={() => definir(Number(texto))}
        />
        <button type="button" onClick={() => definir(qtd + 1)} disabled={qtd >= QTD_MAX} aria-label="Aumentar quantidade">
          <Icone nome="mais" />
        </button>
      </div>

      <button
        type="button"
        className="botao botao--azul adicionar__botao"
        onClick={() => {
          carrinho.adicionar(slug, qtd);
          definir(1);
        }}
      >
        <Icone nome="carrinho" />
        Adicionar
      </button>

      {noPedido > 0 && (
        <button type="button" className="pastilha pastilha--no-pedido" onClick={gaveta.abrir}>
          <Icone nome="check" />
          No pedido: {noPedido}
        </button>
      )}
    </div>
  );
}
