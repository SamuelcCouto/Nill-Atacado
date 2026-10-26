# Nill Atacado — loja

Vitrine de atacado em Next.js 16 (App Router). O cliente monta o pedido no site e envia pelo WhatsApp com a lista pronta. Não há pagamento online nem backend.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
```

## Onde mexer

| O quê | Onde |
|---|---|
| Produtos, categorias, preços, WhatsApp | `lib/catalogo.ts` (preço `null` = "Preço sob consulta") |
| Fotos de produto | `public/produtos/` (quadradas, fundo branco, .webp) |
| Cores, fontes, espaçamentos | tokens no topo de `app/globals.css` |
| Banner | `components/Banner.tsx` |
| Mensagem do pedido | `mensagemDoPedido` em `lib/carrinho.ts` |

## Publicar na Vercel

1. Em vercel.com, use **Add New → Project** e importe o repositório `SamuelcCouto/Nill-Atacado`.
2. A Vercel detecta Next.js sozinha. Não precisa de variável de ambiente.
3. Cada push na `main` publica de novo.

## Documentos do projeto

- `briefing.md`: o que o cliente passou.
- `identidade/plano-identidade.md`: identidade aprovada.
- `design-plan.md`: estrutura e movimento.
- `desenvweb-progresso.md`: andamento por etapa.
