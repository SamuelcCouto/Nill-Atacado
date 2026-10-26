# Plano de identidade — Nill Atacado (modo completar)

Situação: **aprovado em 2026-10-26**.

## Ideia em uma frase
**A pastilha amarela.** A faixa arredondada "ATACADO" da logo vira o sinal de preço de atacado no site inteiro: ela aparece onde o lojista ganha alguma coisa (preço por quantidade, frete grátis, "adicionado ao pedido"). O resto da loja fica quieto, organizado e rápido, como no Mercado Livre.

## Inventário (manter, ajustar, completar)

| Manter | Ajustar | Completar |
|---|---|---|
| Logo azul e amarela em 3D (versão de out/2026) | O banner usa a **logo antiga vermelha** e a paleta vermelho e marrom: o site segue a logo nova (confirmar com o cliente) | Papéis das cores, tons de texto, linha e estados |
| Azul royal e amarelo como as duas cores da marca | Na logo, o amarelo não serve como texto sobre branco: só é usado como fundo | Versão plana da logo (sem 3D) para cabeçalho no celular e favicon |
| Cantos arredondados e formas "gordinhas" das letras | | Fontes, escala, voz, botões |

## Cores (medidas nos pixels da logo; contraste medido pelo script)

| Nome | Hex | Token | Papel | Proporção |
|---|---|---|---|---|
| Azul Nill | `#0033C4` | `--azul` | cabeçalho, links, botão "Adicionar" | ~20% |
| Azul luz | `#1F5BFF` | `--azul-luz` | hover e foco (anel de foco) | detalhe |
| Amarelo Nill | `#FFCC00` | `--amarelo` | pastilha de atacado, botão de busca, contador do carrinho | ~8% |
| Tinta | `#0E1B4D` | `--tinta` | texto e preços (azul quase noite, tirado do matiz da marca, não preto) | texto |
| Tinta 2 | `#4A5578` | `--tinta-2` | texto de apoio (marca, peso, unidade) | texto |
| Fundo | `#EEF1F7` | `--fundo` | fundo da página (cinza levemente azulado) | ~55% |
| Superfície | `#FFFFFF` | `--superficie` | cards de produto e painéis | ~15% |
| Linha | `#D5DBE8` | `--linha` | divisórias e bordas (decorativa, não carrega texto) | detalhe |
| Pedido | `#0B7A3E` | `--pedido` | **só** o botão final "Enviar pedido pelo WhatsApp" | 1 lugar |
| Alerta | `#C62828` | `--alerta` | erro e "esgotado". Não é cor de marca | estado |

Contraste (WCAG):
- tinta/branco 16.4:1
- tinta/fundo 14.5:1
- tinta-2/fundo 6.5:1
- azul/branco 9.3:1
- branco/azul 9.3:1
- amarelo/azul 6.1:1 (logo no cabeçalho)
- tinta/amarelo 10.8:1 (texto da pastilha)
- branco/pedido 5.4:1
- alerta/branco 5.6:1

Ajuste feito: o verde-WhatsApp do banner (`#1DA851`) dá só 3.1:1 com texto branco. Ele foi escurecido para `#0B7A3E`, mantendo o matiz.

## Tipografia

| Papel | Família | Por quê |
|---|---|---|
| Títulos, preços e números | **Rubik** 600–800 (Google Fonts, OFL) | Cantos levemente arredondados e proporções quadradas, que ecoam as letras da logo. Números fortes para o preço |
| Texto, nome do produto e interface | **Atkinson Hyperlegible Next** 400–700 (Google Fonts, OFL) | Feita para legibilidade máxima: diferencia 1/l/I e 0/O, o que importa em nome de produto, gramagem e quantidade ("20 un · 1,040 kg") |

Escala (rem), com alinhamento à esquerda e no máximo 70 caracteres por linha:

| Tamanho | Uso |
|---|---|
| 0.75 | selo |
| 0.875 | apoio |
| 1 | corpo |
| 1.125 | nome do produto na página |
| 1.375 | preço no card |
| 1.75 | título de seção |
| 2.25 | preço na página do produto |
| 3 | título do banner |

Entrelinha: 1.5 no corpo e 1.1 nos títulos.

## Layout (referência Mercado Livre, com a cara da Nill)

```
┌──────────────────────────────────────────────────────────┐
│ [NILL]  [ Buscar produtos, marcas...        (🔍amarelo)] 🛒3│  ← faixa azul
│ Categorias ▾  Doces  Salgadinhos  Bebidas  Descartáveis… │
├──────────────────────────────────────────────────────────┤
│  BANNER (carrossel calmo, troca a cada 6 s, pausa no toque)│
├──────────────────────────────────────────────────────────┤
│ Mais pedidos                                     Ver todos│
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │ foto │ │ foto │ │ foto │ │ foto │ │ foto │  card branco │
│ │Paçoca│ │Doce..│ │Torres│ │...   │ │...   │             │
│ │R$ 00 │ │R$ 00 │ │      │ │      │ │      │             │
│ │(10+ un R$ 00)│  ← pastilha amarela (preço por volume)   │
│ │[− 1 +][Adicionar]│                                      │
└──────────────────────────────────────────────────────────┘
Celular: barra fixa inferior "Ver pedido (3 itens) · R$ 000" → carrinho → [Enviar pedido pelo WhatsApp]
```

- Cards: raio de 12px. Botões e pastilha: raio total, como a faixa da logo. Sombra leve tingida de azul, não cinza genérica.
- Foto do produto sempre quadrada sobre fundo branco. As fotos do cliente já vêm assim.

## Movimento (calmo, a serviço da compra)
- O único momento marcado: ao clicar em "Adicionar", o contador do carrinho no cabeçalho dá um "pulo" amarelo, e a pastilha confirma "No pedido ✓".
- O banner troca com fade lento. Não há rolagem cinematográfica na vitrine nem animação de entrada em cada card.
- A preferência de movimento reduzido do sistema é respeitada.

## Voz
Direta, próxima, de comerciante para comerciante.

| Situação | Texto |
|---|---|
| Botão no card | "Adicionar" → vira "No pedido ✓" |
| Ação final | "Enviar pedido pelo WhatsApp" |
| Mensagem pronta | "Olá, Nill! Quero fazer este pedido: …" + itens, quantidades e total estimado |
| Carrinho vazio | "Seu pedido está vazio. Comece pelos mais pedidos da semana." + botão "Ver mais pedidos" |
| Erro na busca | "Nada encontrado para 'xyz'. Tente pelo nome da marca ou veja as categorias." |

## O que a marca não faz
- Não usa amarelo como cor de texto sobre branco.
- Não espalha vermelho: ele é só para erro e "esgotado".
- Não anima cada card ao rolar.
- Não promete entrega, prazo ou frete grátis que o cliente não confirmou.
- Não usa a logo antiga vermelha.

## Pendências para o cliente
1. Confirmar que o site segue a logo nova (azul e amarela) e que os banners serão refeitos nessa paleta.
2. Confirmar as promessas do banner: frete grátis acima de R$150 e entrega rápida.
3. Enviar a logo em vetor, se existir. Se não existir, desenhamos a versão plana a partir do PNG.
