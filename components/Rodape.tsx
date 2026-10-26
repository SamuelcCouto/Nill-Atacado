import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Icone } from '@/components/Icone';
import { WHATSAPP, categorias } from '@/lib/catalogo';

export function Rodape() {
  return (
    <footer className="rodape" data-regiao="rodape">
      <div className="container rodape__grade">
        <div>
          <Logo className="rodape__logo" />
          <p>Atacado para o seu negócio. Monte o pedido no site e feche com a gente pelo WhatsApp.</p>
        </div>
        <nav aria-label="Categorias no rodapé">
          <h2>Categorias</h2>
          <ul>
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/categoria/${c.slug}`}>{c.nome}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2>Atendimento</h2>
          <a className="rodape__whats" href={`https://wa.me/${WHATSAPP.numero}`} target="_blank" rel="noopener noreferrer">
            <Icone nome="whatsapp" /> {WHATSAPP.exibicao}
          </a>
        </div>
      </div>
      <p className="container rodape__fim">© Nill Atacado</p>
    </footer>
  );
}
