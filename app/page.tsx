"use client";

import { listar, criar } from "@/lib/api";
import { vagasSeed } from "@/lib/vagas-seed";
import { Vaga } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import CardVaga from "@/components/CardVaga";
import Footer from "@/components/Footer";
import Header from "@/components/Heard";
import ModalVaga from "@/components/ModalVaga";

export default function Home() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [vagaAberta, setVagaAberta] = useState<Vaga | null>(null);
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

  if (carregando) return <p>Carregando vagas...</p>;

  return (
    <>
    <div className="flex min-h-screen flex-col">
      <Header />
    <main>
      <h1 className="text-center">Portal de Vagas</h1>
      <div className="flex flex-wrap gap-4">
        {vagas.map((vaga) => (
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
    </main>
     <Footer />
    </div>

    <ModalVaga vaga={vagaAberta} aoFechar={() => setVagaAberta(null)} />
    </>
  );
}