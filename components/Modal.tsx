"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  aberto: boolean;
  aoFechar: () => void;
  titulo?: string;
  children: React.ReactNode;
};

export default function Modal({ aberto, aoFechar, titulo, children }: ModalProps) {
  const caixaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aberto) return;

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") aoFechar();
    }

    // Trava o scroll do fundo enquanto o modal está aberto.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", aoTeclar);
    caixaRef.current?.focus();

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  return (
    <div
      onClick={aoFechar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        ref={caixaRef}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        tabIndex={-1}
        onClick={(evento) => evento.stopPropagation()}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl outline-none"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          {titulo ? <h2 className="text-lg font-bold sm:text-xl">{titulo}</h2> : <span />}
          <button
            onClick={aoFechar}
            aria-label="Fechar"
            className="shrink-0 rounded-md border px-2 py-1 text-sm leading-none hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
