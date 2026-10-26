'use client';

import Image from 'next/image';
import { useState } from 'react';

export function Galeria({ fotos }: { fotos: { src: string; alt: string }[] }) {
  const [atual, setAtual] = useState(0);
  const foto = fotos[atual] ?? fotos[0];

  return (
    <div className="galeria">
      <div className="galeria__principal">
        <Image src={foto.src} alt={foto.alt} width={1024} height={1024} sizes="(max-width: 860px) 100vw, 560px" priority />
      </div>
      {fotos.length > 1 && (
        <div className="galeria__miniaturas" role="group" aria-label="Fotos do produto">
          {fotos.map((f, i) => (
            <button
              key={f.src}
              type="button"
              aria-label={`Foto ${i + 1}: ${f.alt}`}
              aria-pressed={i === atual}
              onClick={() => setAtual(i)}
            >
              <Image src={f.src} alt="" width={96} height={96} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
