# Progresso do projeto

Mantido pela skill desenvwebpremium. Atualize ao fim de cada etapa. Este arquivo vive no projeto; não vai para o caderno de aprendizados.

- Projeto: Nill Atacado
- Tipo: loja (atacado multi-categoria, referência Mercado Livre)
- Stack: Next.js 16.4 (App Router, cacheComponents), CSS puro com tokens, sem GSAP/Lenis; deploy Vercel
- Início: 2026-10-21

| Etapa | Skill | Situação | Aprovado em | Notas (o que foi decidido, o que falta) |
|---|---|---|---|---|
| 0 Preparar | — | concluída | 2026-10-26 | Repo GitHub SamuelcCouto/Nill-Atacado. Material organizado em assets/ (logo PNG transparente, banner, 7 fotos de produto). Pedido via carrinho → WhatsApp. |
| 1 Identidade | identidade-visual | concluída | 2026-10-26 | Modo completar. Plano em identidade/plano-identidade.md: pastilha amarela, Rubik + Atkinson Hyperlegible Next, verde de pedido #0B7A3E. |
| 2 Movimento e construção | site-premium | concluída (v1 para apresentar) | 2026-10-26 | design-plan.md. Home (banner, como pedir, vitrine por categoria), categoria, produto com galeria, busca, gaveta de pedido → WhatsApp, barra fixa no celular. Gesto: contador amarelo 'soma'. Auditoria mobile: 0 graves em 12 tamanhos. |
| 3 Mapa | cartographer | concluída | 2026-10-26 | docs/CODEBASE_MAP.md + CLAUDE.md. |
| 4 Ajustes | — | | | |
| 5 Celular | mobile | concluída (v1) | 2026-10-26 | auditoria.py em 12 tamanhos: 0 graves (home, categoria, produto, busca). Falta teste em aparelho real. |
| 6 Segurança e publicação | seguranca-web | aguardando aprovação | | Relatório em docs/auditoria-seguranca.md: 4 itens (2 médios, 2 baixos), nenhum alto. Publicação na Vercel feita pelo usuário. |
| 7 Fechar | — | | | |

Situação: aberta, em andamento, aguardando aprovação, concluída, pulada (com o motivo).

## Decisões do cliente
- Inspiração declarada: Mercado Livre.
- Trabalho por etapas.
- 2026-10-26: carrinho monta pedido e envia para WhatsApp (62) 99457-1078 com mensagem pronta. Sem pagamento online por ora.
- Subir tudo sempre para https://github.com/SamuelcCouto/Nill-Atacado.
- Transições premium com calma (prioridade é a compra).

## Pendências
- Logo em vetor (SVG/AI/PDF).
- Banner usa logo antiga vermelha e paleta vermelho/amarelo: confirmar qual identidade vale.
- Confirmar promessas do banner (entrega grátis acima de R$150, entrega rápida).
- Preços, categorias, tamanho do catálogo, pedido mínimo (todos os produtos estão 'Preço sob consulta').
- Feedback do cliente sobre a v1 (usuário publica na Vercel e apresenta).
- Aprovar correções da auditoria de segurança (cabeçalhos, /privacidade, observação).
