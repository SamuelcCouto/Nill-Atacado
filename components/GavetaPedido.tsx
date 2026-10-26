'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Icone } from '@/components/Icone';
import { WHATSAPP, formatarPreco } from '@/lib/catalogo';
import {
  carrinho,
  gaveta,
  linhasDo,
  linkWhatsApp,
  mensagemDoPedido,
  totalEstimado,
  totalUnidades,
  useCarrinho,
  useGaveta,
} from '@/lib/carrinho';
import { useCamada } from '@/lib/use-camada';

/** Gaveta do pedido + barra fixa no celular + aviso de "adicionado" (aria-live sempre montado). */
export function GavetaPedido() {
  const aberta = useGaveta();
  const pedido = useCarrinho();
  const linhas = linhasDo(pedido);
  const unidades = totalUnidades(pedido);
  const total = totalEstimado(linhas);
  const painel = useRef<HTMLDivElement>(null);

  useCamada(aberta, gaveta.fechar, painel, { retorno: '[data-pedido-alvo]' });

  // Aviso curto a cada item somado. O texto anterior fica guardado para o fade de saída.
  const [aviso, setAviso] = useState({ texto: '', visivel: false, n: 0 });
  useEffect(() => {
    let tempo: ReturnType<typeof setTimeout>;
    const somou = () => {
      setAviso((a) => ({ texto: 'Adicionado ao pedido', visivel: true, n: a.n + 1 }));
      clearTimeout(tempo);
      tempo = setTimeout(() => setAviso((a) => ({ ...a, visivel: false })), 2200);
    };
    window.addEventListener('nill:somou', somou);
    return () => {
      window.removeEventListener('nill:somou', somou);
      clearTimeout(tempo);
    };
  }, []);

  const mensagem = mensagemDoPedido(pedido);

  return (
    <>
      <div className="aviso" role="status" data-visivel={aviso.visivel || undefined}>
        {aviso.visivel && (
          <>
            <Icone nome="check" /> {aviso.texto}
          </>
        )}
      </div>

      {unidades > 0 && !aberta && (
        <div className="barra-pedido">
          <button type="button" className="barra-pedido__botao" onClick={gaveta.abrir}>
            <span>
              Ver pedido <small>({linhas.length} {linhas.length === 1 ? 'produto' : 'produtos'})</small>
            </span>
            <span className="barra-pedido__total">{total !== null ? formatarPreco(total) : `${unidades} un.`}</span>
          </button>
        </div>
      )}

      <div className="gaveta-fundo" data-aberta={aberta || undefined} onClick={gaveta.fechar} aria-hidden="true" />
      <div
        ref={painel}
        className="gaveta"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gaveta-titulo"
        data-aberta={aberta || undefined}
        inert={!aberta}
        tabIndex={-1}
      >
        <div className="gaveta__topo">
          <h2 id="gaveta-titulo">Seu pedido</h2>
          <button type="button" className="botao-icone" onClick={gaveta.fechar} aria-label="Fechar pedido">
            <Icone nome="fechar" />
          </button>
        </div>

        {linhas.length === 0 ? (
          <div className="gaveta__vazia">
            <p>Seu pedido está vazio. Comece pelos produtos da vitrine.</p>
            <Link href="/#vitrine" className="botao botao--azul" onClick={gaveta.fechar}>
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <ul className="gaveta__itens">
              {linhas.map(({ produto, qtd }) => (
                <li key={produto.slug} className="linha">
                  <Image src={produto.fotos[0].src} alt="" width={72} height={72} className="linha__foto" />
                  <div className="linha__info">
                    <Link href={`/produto/${produto.slug}`} onClick={gaveta.fechar} className="linha__nome">
                      {produto.nome}
                    </Link>
                    <span className="linha__unidade">{produto.unidade}</span>
                    <span className="linha__preco">
                      {produto.preco !== null ? formatarPreco(produto.preco * qtd) : 'Preço sob consulta'}
                    </span>
                  </div>
                  <div className="linha__acoes">
                    <div className="qtd qtd--pequena" role="group" aria-label={`Quantidade de ${produto.nome}`}>
                      <button
                        type="button"
                        onClick={() => carrinho.definir(produto.slug, qtd - 1)}
                        aria-label={qtd === 1 ? `Remover ${produto.nome}` : 'Diminuir quantidade'}
                      >
                        <Icone nome={qtd === 1 ? 'lixeira' : 'menos'} />
                      </button>
                      <output aria-live="polite">{qtd}</output>
                      <button type="button" onClick={() => carrinho.definir(produto.slug, qtd + 1)} aria-label="Aumentar quantidade">
                        <Icone nome="mais" />
                      </button>
                    </div>
                    <button type="button" className="linha__remover" onClick={() => carrinho.remover(produto.slug)}>
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="gaveta__rodape">
              <label htmlFor="obs" className="campo-rotulo">
                Observação para a Nill <span>(opcional)</span>
              </label>
              <textarea
                id="obs"
                rows={2}
                maxLength={500}
                placeholder="Ex.: entregar pela manhã"
                value={pedido.obs}
                onChange={(e) => carrinho.observacao(e.target.value)}
              />

              <div className="gaveta__total">
                <span>{unidades} {unidades === 1 ? 'unidade' : 'unidades'}</span>
                <strong>{total !== null ? formatarPreco(total) : 'Total confirmado no WhatsApp'}</strong>
              </div>

              <a
                className="botao botao--pedido"
                href={linkWhatsApp(mensagem)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icone nome="whatsapp" />
                Enviar pedido pelo WhatsApp
              </a>
              <p className="gaveta__nota">
                Abre o WhatsApp com a lista pronta para {WHATSAPP.exibicao}. Nada é cobrado aqui.
              </p>
              <button type="button" className="link-discreto" onClick={carrinho.limpar}>
                Esvaziar pedido
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
