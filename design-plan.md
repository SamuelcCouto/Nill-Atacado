# Plano de design — Nill Atacado (loja inteira)

Identidade (cores, fontes, voz) aprovada em `identidade/plano-identidade.md`. Este arquivo cobre estrutura e movimento.

## Tema
Sujeito: vitrine de atacado multi-categoria (começa com doces e salgadinhos).
Público: comerciante que repõe estoque (o banner do cliente fala em "seu negócio").
Função da página: achar o produto e montar o pedido em poucos toques; o fechamento é pelo WhatsApp.
Detalhe do mundo do cliente: a unidade de venda do atacado (pote, fardo, cartela, pacote) aparece sempre junto do nome.

## Objetivo (pergunta da skill para loja)
**A loja inteira.** Nenhum trecho fixado nem trilha horizontal, e nada animado entre o produto e o pedido. O catálogo fica a um toque do cabeçalho.

## Identidade de movimento
Materiais: faixa/pílula da logo, contador do carrinho, etiqueta de preço.
Verbos: carimbar, somar, conferir.
Três adjetivos: ágil, confiável, simpático.
Gesto-assinatura: **a soma no carrinho.** Ao adicionar um item, o contador amarelo do cabeçalho dá um pulo curto (escala 1 → 1.25 → 1, 280 ms) e o botão vira a pastilha "No pedido ✓". É a confirmação de "entrou no pedido".
Apoio: o banner troca com um fade de 600 ms a cada 7 s, pausa no hover, no foco e na aba escondida, e tem controles.
Curvas: `cubic-bezier(.34,1.56,.64,1)` no pulo e `ease-out` no resto. Só CSS, sem GSAP nem Lenis: menos JavaScript em loja.
Não faz: pin, parallax, rolagem suave forçada, entrada animada em cada card, blur ou cortina.
Teste da troca: o pulo do contador amarelo junto com a pastilha é a própria faixa da logo dizendo "somou". Com outra paleta, continua sendo um gesto de soma, não de outra marca.

## Mapa
| Ordem | Seção | Mecânica | Conteúdo |
|---|---|---|---|
| 1 | Cabeçalho azul | fixo no topo (sticky) | logo plana, busca, carrinho com contador e categorias |
| 2 | Banner | fade entre slides | texto do banner do cliente + fotos reais; slide "Como pedir" |
| 3 | Como funciona | estático | 3 passos (escolher, ajustar quantidade, enviar no WhatsApp). É sequência de verdade, então a numeração cabe |
| 4 | Vitrine por categoria | grade | cards com foto, nome, marca, unidade, preço ou "sob consulta", quantidade e "Adicionar" |
| 5 | Rodapé | grade | contato do WhatsApp e categorias |
| — | Produto `/produto/[slug]` | estático | galeria, detalhes, quantidade, adicionar, enviar |
| — | Busca `/busca?q=` | estático | resultados filtrados no cliente |
| — | Carrinho | gaveta lateral (barra inferior no celular) | itens, quantidade, remover, observação, "Enviar pedido pelo WhatsApp" |

## Mídia
| Peça | Origem | Status |
|---|---|---|
| Fotos de produto | cliente (7 fotos, 5 produtos) | ok |
| Banner | o do cliente usa a logo antiga, então o banner foi recomposto em HTML com o texto e as fotos do cliente | provisório até o cliente refazer |
| Logo plana | desenhada em SVG a partir do PNG | provisória, para validação |

## Revisão
- Cortado: o 3D da logo no cabeçalho (some sobre o azul e pesa) e as promessas de frete do banner (não confirmadas).
- Caderno: no estudo anterior de loja, o cinematográfico atrasou a compra e a loja não foi adotada. Por isso aqui o movimento fica só na confirmação.
