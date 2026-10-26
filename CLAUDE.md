@AGENTS.md

## Visão do código

A loja do atacado é estática, sem backend. O lojista monta o pedido e ele sai pelo WhatsApp como link `wa.me` com a mensagem pronta. O catálogo fica em `lib/catalogo.ts` e o carrinho no `localStorage` (`lib/carrinho.ts`).

**Stack:** Next.js 16 (App Router, `cacheComponents`), React 19, TypeScript e CSS puro com tokens em `app/globals.css`. As fontes são Rubik e Atkinson Hyperlegible Next. O deploy é na Vercel.
**Estrutura:**
- `app/`: rotas;
- `components/`: UI;
- `lib/`: dados e estado;
- `public/produtos/`: fotos;
- `identidade/` e `design-plan.md`: decisões aprovadas.

O mapa detalhado está em [docs/CODEBASE_MAP.md](docs/CODEBASE_MAP.md).

## Regras do projeto
- Preço nunca é inventado: `null` significa "Preço sob consulta".
- Cores e tamanhos vêm só dos tokens de `:root`. Não usar a logo antiga vermelha.
- Movimento só em CSS e só no gesto aprovado (o contador do pedido "soma"). Nada entre o produto e o pedido.
- Alvos de toque com 44 px ou mais. Rode a auditoria da skill `mobile` depois de mudar o layout.
- Toda mudança vai para o GitHub (`SamuelcCouto/Nill-Atacado`, `main`).
