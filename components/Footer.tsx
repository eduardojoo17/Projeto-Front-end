"use client";

import { useState } from "react";

export default function Footer() {
  const [confirmando, setConfirmando] = useState(false);

  function restaurarDados() {
    localStorage.removeItem("vagas");
    localStorage.removeItem("candidaturas");
    localStorage.removeItem("rascunho");

    window.location.reload();
  }

  return (
    <footer className="w-full border-t bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* flex-col no celular (tudo empilhado e centralizado) e flex-row a
          partir do tablet (texto na esquerda, botões na direita). */}
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-gray-500">Projeto SENAI — Portal de Vagas</p>

        {confirmando ? (
          // flex-wrap + justify-center: em tela estreita a pergunta e os dois
          // botões quebram em mais de uma linha em vez de vazar pro lado.
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <span>Apagar tudo e restaurar exemplo?</span>
            <button
              onClick={restaurarDados}
              className="cursor-pointer rounded-md border px-2 py-1 text-red-600 hover:bg-red-50"
            >
              Sim
            </button>
            <button
              onClick={() => setConfirmando(false)}
              className="cursor-pointer rounded-md border px-2 py-1 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {/* window.print() abre a mesma caixa do Ctrl+P, onde dá pra
                escolher "Salvar como PDF". O que sai no papel é definido
                pelo bloco @media print em app/globals.css. */}
            <button
              onClick={() => window.print()}
              className="cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-gray-100"
            >
              Imprimir / Salvar PDF
            </button>
            <button
              onClick={() => setConfirmando(true)}
              className="cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-gray-100"
            >
              Restaurar dados
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
