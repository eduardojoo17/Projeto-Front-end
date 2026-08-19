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
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
    >
      <div
        ref={caixaRef}
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        tabIndex={-1}
        onClick={(evento) => evento.stopPropagation()}
        className="animate-surgir max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/60 bg-white p-6 shadow-2xl shadow-slate-900/20 outline-none sm:p-7"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          {titulo ? (
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{titulo}</h2>
          ) : (
            <span />
          )}
          <button
            onClick={aoFechar}
            aria-label="Fechar"
            className="shrink-0 cursor-pointer rounded-full border border-slate-200 px-2.5 py-1.5 text-sm leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
