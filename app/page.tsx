"use client";

import { listar, criar } from "@/lib/api";
import { vagasSeed } from "@/lib/vagas-seed";
import { Vaga } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import CardVaga from "@/components/CardVaga";

export default function Home() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [carregando, setCarregando] = useState(true);
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
    <main>
      <h1 className="text-center">Portal de Vagas</h1>
      <div className="flex flex-wrap gap-4">
        {vagas.map((vaga) => (
          <CardVaga key={vaga.id} vaga={vaga} />
        ))}
      </div>
    </main>
  );
}