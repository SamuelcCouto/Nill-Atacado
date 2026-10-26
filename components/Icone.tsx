type Nome = 'lupa' | 'carrinho' | 'mais' | 'menos' | 'lixeira' | 'fechar' | 'whatsapp' | 'check' | 'seta-esq' | 'seta-dir';

const caminhos: Record<Exclude<Nome, 'whatsapp'>, string> = {
  lupa: 'M10.5 4a6.5 6.5 0 1 0 3.98 11.64l4.44 4.44 1.42-1.42-4.44-4.44A6.5 6.5 0 0 0 10.5 4Zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z',
  carrinho:
    'M2 3h2.6l2.3 11.2A2 2 0 0 0 8.86 16H18v-2H8.86l-.3-1.5H18.7a1 1 0 0 0 .97-.76l1.6-6.5A1 1 0 0 0 20.3 4H6.06L5.6 1.8A1 1 0 0 0 4.62 1H2v2Zm4.47 3h12.55l-1.1 4.5H7.4L6.47 6ZM9 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
  mais: 'M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z',
  menos: 'M5 11h14v2H5z',
  lixeira: 'M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 12H7L6 9Zm4 2v8h1.5v-8H10Zm3.5 0v8H15v-8h-1.5Z',
  fechar: 'M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5Z',
  check: 'M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7 9.5 16.2Z',
  'seta-esq': 'M15.4 5.4 14 4l-8 8 8 8 1.4-1.4L8.8 12l6.6-6.6Z',
  'seta-dir': 'M8.6 18.6 10 20l8-8-8-8-1.4 1.4 6.6 6.6-6.6 6.6Z',
};

export function Icone({ nome, className }: { nome: Nome; className?: string }) {
  if (nome === 'whatsapp') {
    return (
      <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.06.89.9-2.98-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.3 4.1c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48 2.48 1.07 2.98.86 3.52.8.54-.05 1.74-.71 1.98-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.2-.57-.35-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.65-1.6-.91-2.2-.24-.57-.48-.5-.67-.5h-.55Z"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path fill="currentColor" d={caminhos[nome]} />
    </svg>
  );
}
