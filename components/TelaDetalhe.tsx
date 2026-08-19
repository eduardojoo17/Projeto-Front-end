import { Vaga } from "@/lib/types";

function descricaoPadrao(vaga: Vaga): string {
  return `Vaga de ${vaga.titulo} na ${vaga.empresa}, na área de ${vaga.area}. Modalidade ${vaga.modalidade}.`;
}

function requisitosPadrao(vaga: Vaga): string[] {
  return [`Interesse em ${vaga.area}`, "Vontade de aprender", "Boa comunicação"];
}

function formatarSalario(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function TelaDetalheVaga({
  vaga,
  aoCandidatar,
}: {
  vaga: Vaga;
  aoCandidatar: () => void;
}) {
  const descricao = vaga.descricao ?? descricaoPadrao(vaga);
  const requisitos = vaga.requisitos ?? requisitosPadrao(vaga);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
        {vaga.area} · {vaga.modalidade}
      </p>
      <h2 className="mt-1 text-xl font-bold text-gray-900">{vaga.titulo}</h2>
      <p className="text-sm text-gray-500">{vaga.empresa}</p>
      <p className="mt-2 text-sm font-medium text-gray-700">
        {formatarSalario(vaga.salario)}
      </p>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-900">Descrição</h3>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{descricao}</p>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-900">Requisitos</h3>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-gray-600">
          {requisitos.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={aoCandidatar}
        className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Candidatar-se
      </button>
    </div>
  );
}