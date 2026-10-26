import Link from 'next/link';

export default function NaoEncontrado() {
  return (
    <div className="container pagina vazio">
      <h1>Página não encontrada</h1>
      <p>Esse endereço não existe mais. Os produtos continuam na vitrine.</p>
      <Link href="/#vitrine" className="botao botao--azul">
        Ver produtos
      </Link>
    </div>
  );
}
