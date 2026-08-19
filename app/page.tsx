"use client";

import { listar, salvarLista } from "@/lib/api";
import { vagasSeed } from "@/lib/vagas-seed";
import { Vaga } from "@/lib/types";
import {
  FILTROS_VAZIOS,
  Filtros,
  filtrarVagas,
  opcoesUnicas,
} from "@/lib/filtros";
import { useEffect, useMemo, useRef, useState } from "react";
import CardVaga from "@/components/CardVaga";
import FiltrosVagas from "@/components/FiltrosVagas";
import Footer from "@/components/Footer";
import Header from "@/components/Heard";
import ModalVaga from "@/components/ModalVaga";

export default function Home() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [vagaAberta, setVagaAberta] = useState<Vaga | null>(null);
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VAZIOS);
  const jaRodou = useRef(false);

  useEffect(() => {
    if (jaRodou.current) return;
    jaRodou.current = true;

    async function carregar() {
      let lista = await listar<Vaga>("vagas");

      if (lista.length === 0) {
        // Grava as 20 vagas de uma vez só. Um loop de `criar` custaria 20
        // leituras de 700ms (~14s), porque cada `criar` chama `listar` por
        // dentro — o AGENTS.md pede `salvarLista` justamente por isso.
        const agora = Date.now();
        // O id sai daqui porque, sem o delay de cada `criar`, todos os
        // Date.now() do mesmo instante seriam iguais; o índice garante que
        // cada vaga fique com um id único.
        lista = vagasSeed.map((vaga, indice) => ({ ...vaga, id: agora + indice }));
        await salvarLista<Vaga>("vagas", lista);
      }
      setVagas(lista);
      setCarregando(false);
    }
    carregar();
  }, []);

  const areas = useMemo(() => opcoesUnicas(vagas, "area"), [vagas]);
  const modalidades = useMemo(() => opcoesUnicas(vagas, "modalidade"), [vagas]);
  const vagasFiltradas = useMemo(
    () => filtrarVagas(vagas, filtros),
    [vagas, filtros]
  );

  if (carregando)
    return <p className="p-6 text-center text-gray-600">Carregando vagas...</p>;

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        {/* px-4 no celular / px-6 no tablet / px-8 no desktop: o conteúdo
            nunca encosta na borda da tela. max-w-6xl + mx-auto centralizam
            em telas grandes. */}
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
          

          {/* sem-impressao: a barra de filtros não vai pro PDF (ver o
              bloco @media print em app/globals.css). */}
          <div className="sem-impressao mt-6">
            <FiltrosVagas
              filtros={filtros}
              areas={areas}
              modalidades={modalidades}
              aoMudar={setFiltros}
            />
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {vagasFiltradas.length} de {vagas.length}{" "}
            {vagas.length === 1 ? "vaga" : "vagas"}
          </p>

          {vagasFiltradas.length === 0 ? (
            <p className="mt-6 text-center text-gray-600">
              Nenhuma vaga encontrada com esses filtros.
            </p>
          ) : (
            <div className="mt-4 flex flex-wrap gap-4">
              {vagasFiltradas.map((vaga) => (
                <button
                  key={vaga.id}
                  type="button"
                  onClick={() => setVagaAberta(vaga)}
                  // Largura do cartão em cada tela (o gap é de 1rem = 16px):
                  // celular  -> w-full  = 1 coluna
                  // tablet   -> metade da largura menos metade do gap = 2 colunas
                  // desktop  -> um terço menos dois terços do gap = 3 colunas
                  className="cartao-clicavel flex w-full cursor-pointer text-left transition hover:opacity-80 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
                >
                  <CardVaga vaga={vaga} />
                </button>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>

      <ModalVaga vaga={vagaAberta} aoFechar={() => setVagaAberta(null)} />
    </>
  );
}
