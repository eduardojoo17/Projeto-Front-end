"use client";

import { listar, criar } from "@/lib/api";
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
        for (const vaga of vagasSeed) {
          await criar<Vaga>("vagas", vaga);
        }
        lista = await listar<Vaga>("vagas");
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

  if (carregando) return <p>Carregando vagas...</p>;

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
          <h1 className="text-center text-2xl font-bold">Portal de Vagas</h1>

          <div className="mt-6">
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
                  className="cursor-pointer text-left hover:opacity-80"
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
