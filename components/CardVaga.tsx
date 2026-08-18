import { Vaga } from "@/lib/types";

export default function CardVaga({ vaga }: { vaga: Vaga }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold">{vaga.titulo}</h3>
      <p className="text-sm text-gray-600">{vaga.empresa}</p>
      <div className="flex gap-2 text-xs mt-2">
        <span className="bg-gray-100 px-2 py-1 rounded">{vaga.area}</span>
        <span className="bg-gray-100 px-2 py-1 rounded">{vaga.modalidade}</span>
      </div>
      <p className="text-sm mt-1">R$ {vaga.salario}</p>
    </div>
  );
}