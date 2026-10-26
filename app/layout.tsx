import type { Metadata, Viewport } from 'next';
import { Atkinson_Hyperlegible_Next, Rubik } from 'next/font/google';
import { Cabecalho } from '@/components/Cabecalho';
import { GavetaPedido } from '@/components/GavetaPedido';
import { Rodape } from '@/components/Rodape';
import './globals.css';

const rubik = Rubik({
  variable: '--fonte-titulo',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
});

const atkinson = Atkinson_Hyperlegible_Next({
  variable: '--fonte-texto',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Nill Atacado — doces, salgadinhos e muito mais para o seu negócio', template: '%s | Nill Atacado' },
  description:
    'Atacado de doces, salgadinhos e muito mais. Monte o pedido no site e envie pelo WhatsApp com a lista pronta.',
};

export const viewport: Viewport = {
  themeColor: '#0033C4',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" className={`${rubik.variable} ${atkinson.variable}`}>
      <body>
        <Cabecalho />
        <main id="conteudo" data-regiao="conteudo" tabIndex={-1}>
          {children}
        </main>
        <Rodape />
        <GavetaPedido />
      </body>
    </html>
  );
}
