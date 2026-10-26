## Auditoria de segurança: Nill Atacado (2026-10-26)

**Escopo:** a loja é estática no Next 16, publicada na Vercel. Não tem backend, API, login, pagamento, upload nem banco. O único "envio" é o link `wa.me` que o próprio lojista abre.
**Varredura automática:** `varredura.py` não encontrou nada, e o `npm audit --omit=dev` deu 0 vulnerabilidades.

**Resumo:** 4 itens em risco, nenhum de gravidade alta.

### Itens em risco

| # | Item | Situação | Onde | Gravidade | Correção proposta |
|---|---|---|---|---|---|
| 1 | Cabeçalhos de segurança | EM RISCO | `next.config.ts` (não há `headers()`) | Média | Adicionar `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` e `Permissions-Policy` (câmera, microfone e localização desligados), além de uma CSP em modo **Report-Only** (`default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; form-action 'self'`). O HSTS a Vercel já envia |
| 2 | Transparência (LGPD Art. 9º) | EM RISCO | não há página de privacidade | Média | Criar uma página `/privacidade` curta, com link no rodapé. Ela explica que o pedido fica só no navegador, que não há cookies nem analytics, que o envio é pelo WhatsApp (Meta), qual é o canal do titular (o próprio WhatsApp) e que a hospedagem registra IP |
| 3 | Dado pessoal no `localStorage` | EM RISCO (baixo) | `lib/carrinho.ts`, campo "Observação" | Baixa | A observação é texto livre e o lojista pode digitar endereço ou CPF, que ficariam guardados no navegador. Proposta: dizer no placeholder "não coloque dados pessoais aqui" e limpar a observação depois do envio |
| 4 | Total calculado no front | EM RISCO (processo) | `lib/carrinho.ts` (`totalEstimado`) | Baixa | Hoje o total não aparece, porque nenhum produto tem preço. Quando houver preço, quem editar o `localStorage` só altera a **própria** mensagem. O texto já diz "Total estimado", mas a equipe precisa conferir os preços no WhatsApp antes de fechar. É uma orientação ao cliente, sem mudança de código |

### Itens OK ou que não se aplicam

**OK:**
- **XSS:** não há `innerHTML` nem `dangerouslySetInnerHTML`. A mensagem vai para o link por `encodeURIComponent`.
- **Dados do carrinho:** o `parse` aceita só slugs que existem no catálogo, quantidade inteira entre 1 e 999 e observação de até 500 caracteres.
- **Links externos:** todos usam `rel="noopener noreferrer"`.
- **Source maps:** desligados em produção (padrão do Next).
- **Segredos:** nenhum segredo nem `.env`. `.env*` já está no `.gitignore`.
- **Fontes:** são servidas pelo próprio site (`next/font`). O navegador do visitante não chama o Google.

**Não se aplica:**
- **Rotas de servidor e dados:** validação no servidor, SQL, IDOR, RLS, CORS e upload. Não há backend nem banco.
- **Conta e acesso:** rate limit, anti-robô, senhas e sessão. Não há login nem formulário enviado ao servidor.

### LGPD: o que falta
- **Inventário:** o pedido e a observação ficam no `localStorage` do próprio visitante. A Vercel guarda logs de acesso (IP). A conversa no WhatsApp é tratada pela Nill e pela Meta.
- **Pendências:**
  - política de privacidade (item 2);
  - canal do titular: o WhatsApp da loja serve;
  - aviso de cookies: **não** precisa enquanto não houver analytics nem pixel. Se o cliente pedir Google Analytics ou Meta Pixel, isso muda.
- **Plano de incidente:** risco baixo, porque o site não guarda dados. O atendimento no WhatsApp é responsabilidade do cliente.

### Fora do alcance
Teste de invasão, revisão jurídica da política de privacidade e a segurança do atendimento pelo WhatsApp e dos dispositivos da loja.
