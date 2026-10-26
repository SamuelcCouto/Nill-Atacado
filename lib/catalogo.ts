/**
 * Catálogo da loja. Fonte única dos produtos.
 *
 * Tudo aqui foi lido das fotos enviadas pelo cliente (nome, marca, peso, unidades).
 * Preço fica `null` até o cliente enviar a tabela: o card mostra "Preço sob consulta"
 * e o pedido no WhatsApp sai sem total. Não preencher preço por conta própria.
 */

export type Categoria = {
  slug: string;
  nome: string;
  descricao: string;
};

export type Produto = {
  slug: string;
  nome: string;
  marca?: string;
  categoria: Categoria['slug'];
  /** Como o atacado vende: aparece na pastilha amarela e na mensagem do pedido. */
  unidade: string;
  /** Plural da unidade para o carrinho ("3 potes"). */
  unidadePlural: string;
  detalhe?: string;
  /** Preço por unidade de venda, em reais. `null` = sob consulta. */
  preco: number | null;
  fotos: { src: string; alt: string }[];
};

export const WHATSAPP = {
  numero: '5562994571078',
  exibicao: '(62) 99457-1078',
};

export const categorias: Categoria[] = [
  { slug: 'doces', nome: 'Doces', descricao: 'Paçocas, doce de leite e confeitos para o balcão.' },
  { slug: 'salgadinhos', nome: 'Salgadinhos', descricao: 'Petiscos em cartela e pacote para pendurar e vender.' },
];

export const produtos: Produto[] = [
  {
    slug: 'pacoca-riquita-ricco-20-unidades',
    nome: 'Paçoca Riquita',
    marca: 'Ricco',
    categoria: 'doces',
    unidade: 'Pote com 20 unidades',
    unidadePlural: 'potes',
    detalhe: 'Peso líquido 1,040 kg',
    preco: null,
    fotos: [
      { src: '/produtos/pacoca-riquita-ricco-20un.webp', alt: 'Pote de Paçoca Riquita Ricco com 20 unidades' },
      { src: '/produtos/pacoca-rolha-pote-aberto.webp', alt: 'Paçocas embaladas uma a uma dentro do pote aberto' },
    ],
  },
  {
    slug: 'doce-de-leite-tablete-o-grilao-800g',
    nome: 'Doce de Leite em Tablete',
    marca: 'O Grilão',
    categoria: 'doces',
    unidade: 'Pote de 800 g',
    unidadePlural: 'potes',
    detalhe: 'Tabletes embalados individualmente',
    preco: null,
    fotos: [
      { src: '/produtos/doce-de-leite-tablete-o-grilao-800g.webp', alt: 'Pote de Doce de Leite em Tablete O Grilão 800 g' },
      { src: '/produtos/doce-de-leite-tablete-pote-aberto.webp', alt: 'Tabletes de doce de leite embalados, fora e dentro do pote' },
    ],
  },
  {
    slug: 'delikuky-crock-amendocrock',
    nome: 'Delikuky Crock',
    marca: 'Amendocrock Mix',
    categoria: 'doces',
    unidade: 'Pacote 70 g ou 140 g',
    unidadePlural: 'pacotes',
    detalhe: 'Confeitos coloridos',
    preco: null,
    fotos: [{ src: '/produtos/delikuky-crock-pacote.webp', alt: 'Pacote de Delikuky Crock com confeitos coloridos' }],
  },
  {
    slug: 'amendoim-confeitado-colorido-fardo',
    nome: 'Amendoim Confeitado Colorido',
    marca: 'Amendocrock Mix',
    categoria: 'doces',
    unidade: 'Fardo de pacotes',
    unidadePlural: 'fardos',
    detalhe: 'Pacotes presos em cartela para pendurar',
    preco: null,
    fotos: [{ src: '/produtos/amendoim-confeitado-fardo.webp', alt: 'Fardo de pacotes de amendoim confeitado colorido' }],
  },
  {
    slug: 'torresmo-goiano-25g-cartela',
    nome: 'Torresmo Goiano',
    categoria: 'salgadinhos',
    unidade: 'Cartela de pacotes de 25 g',
    unidadePlural: 'cartelas',
    detalhe: 'Pronto para pendurar no balcão',
    preco: null,
    fotos: [{ src: '/produtos/torresmo-goiano-cartela-25g.webp', alt: 'Cartela com pacotes de Torresmo Goiano de 25 g' }],
  },
];

export function produtoPorSlug(slug: string) {
  return produtos.find((p) => p.slug === slug);
}

export function categoriaPorSlug(slug: string) {
  return categorias.find((c) => c.slug === slug);
}

export function produtosDaCategoria(slug: string) {
  return produtos.filter((p) => p.categoria === slug);
}

const semAcento = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function buscar(termo: string) {
  const palavras = semAcento(termo).split(/\s+/).filter(Boolean);
  if (palavras.length === 0) return [];
  return produtos.filter((p) => {
    const texto = semAcento([p.nome, p.marca, p.unidade, p.detalhe, categoriaPorSlug(p.categoria)?.nome].join(' '));
    return palavras.every((w) => texto.includes(w));
  });
}

const reais = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const formatarPreco = (valor: number) => reais.format(valor);
