
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
    <footer className="w-full border-t bg-gray-50 px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-500">Projeto SENAI — Portal de Vagas</p>

        {confirmando ? (
          <div className="flex items-center gap-2 text-sm">
            <span>Apagar tudo e restaurar exemplo?</span>
            <button
              onClick={restaurarDados}
              className="rounded-md border px-2 py-1 text-red-600 hover:bg-red-50"
            >
              Sim
            </button>
            <button
              onClick={() => setConfirmando(false)}
              className="rounded-md border px-2 py-1 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmando(true)}
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100"
          >
            Restaurar dados
          </button>
        )}
      </div>
    </footer>
  );
}