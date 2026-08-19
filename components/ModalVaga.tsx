"use client";

import { useState } from "react";
import { Vaga } from "@/lib/types";
import Modal from "@/components/Modal";
import TelaDetalheVaga from "@/components/TelaDetalhe";
import FormularioCandidatura from "@/components/FormularioCandidatura";

type Etapa = "detalhe" | "formulario";

function ConteudoVaga({ vaga }: { vaga: Vaga }) {
  const [etapa, setEtapa] = useState<Etapa>("detalhe");

  return etapa === "detalhe" ? (
    <TelaDetalheVaga vaga={vaga} aoCandidatar={() => setEtapa("formulario")} />
  ) : (
    <FormularioCandidatura vaga={vaga} aoVoltar={() => setEtapa("detalhe")} />
  );
}

/**
 * Junta o modal genérico com as duas telas de dentro: detalhe da vaga e
 * formulário de candidatura. Quem usa só precisa dizer qual vaga está
 * aberta (ou `null` pra fechar).
 */
export default function ModalVaga({
  vaga,
  aoFechar,
}: {
  vaga: Vaga | null;
  aoFechar: () => void;
}) {
  return (
    <Modal aberto={vaga !== null} aoFechar={aoFechar}>
      {/* O `key` faz o conteúdo remontar a cada vaga, então a etapa sempre
          recomeça no detalhe — sem precisar zerar nada na mão. */}
      {vaga && <ConteudoVaga key={vaga.id} vaga={vaga} />}
    </Modal>
  );
}
