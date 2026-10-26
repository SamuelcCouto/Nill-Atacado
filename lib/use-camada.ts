'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * Comportamento de painel aberto (gaveta do carrinho, menu de categorias):
 * resto da página `inert` (regiões marcadas com `data-regiao`), rolagem travada,
 * Esc fecha e Tab dá a volta só na camada do topo, foco volta para quem abriu.
 * Painéis formam pilha: a página só destrava quando o último fecha.
 */
const FOCAVEIS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const pilha: { id: number; manter: string[] }[] = [];
let proximoId = 0;

function aplicarTopo() {
  const regioes = document.querySelectorAll<HTMLElement>('[data-regiao]');
  const topo = pilha[pilha.length - 1];
  regioes.forEach((el) => {
    el.inert = topo ? !topo.manter.includes(el.dataset.regiao ?? '') : false;
  });
  document.documentElement.classList.toggle('rolagem-travada', !!topo);
}

export function useCamada(
  aberto: boolean,
  fechar: () => void,
  painel: RefObject<HTMLElement | null>,
  { manter = [] as string[], focoInicial, retorno }: { manter?: string[]; focoInicial?: string; retorno?: string } = {},
) {
  const fecharRef = useRef(fechar);
  useEffect(() => {
    fecharRef.current = fechar;
  }, [fechar]);

  const manterChave = manter.join(',');

  useEffect(() => {
    if (!aberto) return;

    const quemAbriu = document.activeElement as HTMLElement | null;
    const id = ++proximoId;
    pilha.push({ id, manter: manterChave ? manterChave.split(',') : [] });
    aplicarTopo();

    const alvo =
      (focoInicial && painel.current?.querySelector<HTMLElement>(focoInicial)) ||
      painel.current?.querySelector<HTMLElement>(FOCAVEIS) ||
      painel.current;
    const quadro = requestAnimationFrame(() => alvo?.focus({ preventScroll: true }));

    const noTopo = () => pilha[pilha.length - 1]?.id === id;

    const aoTeclar = (e: KeyboardEvent) => {
      if (!noTopo()) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        fecharRef.current();
        return;
      }
      if (e.key !== 'Tab' || !painel.current) return;
      const lista = Array.from(painel.current.querySelectorAll<HTMLElement>(FOCAVEIS)).filter(
        (el) => el.offsetParent !== null,
      );
      if (lista.length === 0) return;
      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    document.addEventListener('keydown', aoTeclar);

    return () => {
      cancelAnimationFrame(quadro);
      document.removeEventListener('keydown', aoTeclar);
      const i = pilha.findIndex((c) => c.id === id);
      if (i >= 0) pilha.splice(i, 1);
      aplicarTopo();
      quemAbriu?.focus?.({ preventScroll: true });
      if (document.activeElement !== quemAbriu && retorno) {
        document.querySelector<HTMLElement>(retorno)?.focus({ preventScroll: true });
      }
    };
  }, [aberto, painel, manterChave, focoInicial, retorno]);
}
