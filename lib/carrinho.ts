'use client';

import { useSyncExternalStore } from 'react';
import { produtoPorSlug, WHATSAPP, formatarPreco, type Produto } from '@/lib/catalogo';

/**
 * Carrinho no localStorage, lido com useSyncExternalStore.
 * O snapshot devolve a mesma referência enquanto o texto guardado não muda
 * (senão o React entra em laço) e o parse nunca lança.
 * No servidor o carrinho é vazio; o contador aparece depois da hidratação.
 */

export type Item = { slug: string; qtd: number };
type Estado = { itens: Item[]; obs: string };

const CHAVE = 'nill:pedido:v1';
const VAZIO: Estado = { itens: [], obs: '' };
const ouvintes = new Set<() => void>();

let textoAtual: string | null = null;
let estadoAtual: Estado = VAZIO;

function ler(): Estado {
  let texto: string | null = null;
  try {
    texto = localStorage.getItem(CHAVE);
  } catch {
    texto = null;
  }
  if (texto === textoAtual) return estadoAtual;
  textoAtual = texto;
  estadoAtual = interpretar(texto);
  return estadoAtual;
}

function interpretar(texto: string | null): Estado {
  if (!texto) return VAZIO;
  try {
    const bruto = JSON.parse(texto) as Partial<Estado>;
    const itens = Array.isArray(bruto.itens)
      ? bruto.itens.filter(
          (i): i is Item =>
            !!i && typeof i.slug === 'string' && !!produtoPorSlug(i.slug) && Number.isInteger(i.qtd) && i.qtd > 0,
        )
      : [];
    return { itens, obs: typeof bruto.obs === 'string' ? bruto.obs.slice(0, 500) : '' };
  } catch {
    return VAZIO;
  }
}

function gravar(estado: Estado) {
  const texto = JSON.stringify(estado);
  try {
    localStorage.setItem(CHAVE, texto);
    textoAtual = null; // força reler na próxima leitura
  } catch {
    // sem armazenamento (aba anônima bloqueada): mantém só em memória
    textoAtual = texto;
    estadoAtual = estado;
  }
  ouvintes.forEach((f) => f());
}

function assinar(f: () => void) {
  ouvintes.add(f);
  const aoMudarEmOutraAba = (e: StorageEvent) => e.key === CHAVE && f();
  window.addEventListener('storage', aoMudarEmOutraAba);
  return () => {
    ouvintes.delete(f);
    window.removeEventListener('storage', aoMudarEmOutraAba);
  };
}

export const QTD_MAX = 999;

export const carrinho = {
  adicionar(slug: string, qtd = 1) {
    const e = ler();
    const existe = e.itens.find((i) => i.slug === slug);
    const itens = existe
      ? e.itens.map((i) => (i.slug === slug ? { ...i, qtd: Math.min(QTD_MAX, i.qtd + qtd) } : i))
      : [...e.itens, { slug, qtd: Math.min(QTD_MAX, qtd) }];
    gravar({ ...e, itens });
    window.dispatchEvent(new CustomEvent('nill:somou'));
  },
  definir(slug: string, qtd: number) {
    const e = ler();
    if (qtd <= 0) return carrinho.remover(slug);
    gravar({ ...e, itens: e.itens.map((i) => (i.slug === slug ? { ...i, qtd: Math.min(QTD_MAX, qtd) } : i)) });
  },
  remover(slug: string) {
    const e = ler();
    gravar({ ...e, itens: e.itens.filter((i) => i.slug !== slug) });
  },
  observacao(obs: string) {
    gravar({ ...ler(), obs: obs.slice(0, 500) });
  },
  limpar() {
    gravar(VAZIO);
  },
};

export function useCarrinho() {
  return useSyncExternalStore(assinar, ler, () => VAZIO);
}

export type Linha = { produto: Produto; qtd: number };

export function linhasDo(estado: Estado): Linha[] {
  return estado.itens.flatMap((i) => {
    const produto = produtoPorSlug(i.slug);
    return produto ? [{ produto, qtd: i.qtd }] : [];
  });
}

export function totalUnidades(estado: Estado) {
  return estado.itens.reduce((s, i) => s + i.qtd, 0);
}

/** Total só quando todos os itens têm preço; com algum "sob consulta", não há total. */
export function totalEstimado(linhas: Linha[]) {
  if (linhas.some((l) => l.produto.preco === null)) return null;
  return linhas.reduce((s, l) => s + (l.produto.preco ?? 0) * l.qtd, 0);
}

export function mensagemDoPedido(estado: Estado) {
  const linhas = linhasDo(estado);
  const partes = ['Olá, Nill! Quero fazer este pedido:', ''];
  for (const { produto, qtd } of linhas) {
    const marca = produto.marca ? ` (${produto.marca})` : '';
    const preco = produto.preco !== null ? ` — ${formatarPreco(produto.preco * qtd)}` : '';
    partes.push(`• ${qtd}× ${produto.nome}${marca} — ${produto.unidade}${preco}`);
  }
  const total = totalEstimado(linhas);
  partes.push('');
  if (total !== null) partes.push(`Total estimado: ${formatarPreco(total)}`);
  else partes.push('Pode me passar os preços e o total?');
  if (estado.obs.trim()) partes.push('', `Observação: ${estado.obs.trim()}`);
  return partes.join('\n');
}

export function linkWhatsApp(texto: string) {
  return `https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(texto)}`;
}

/* Gaveta do carrinho: aberta/fechada, compartilhada entre cabeçalho, barra e cards. */
let gavetaAberta = false;
const ouvintesGaveta = new Set<() => void>();
export const gaveta = {
  abrir() {
    gavetaAberta = true;
    ouvintesGaveta.forEach((f) => f());
  },
  fechar() {
    gavetaAberta = false;
    ouvintesGaveta.forEach((f) => f());
  },
};
export function useGaveta() {
  return useSyncExternalStore(
    (f) => {
      ouvintesGaveta.add(f);
      return () => ouvintesGaveta.delete(f);
    },
    () => gavetaAberta,
    () => false,
  );
}
