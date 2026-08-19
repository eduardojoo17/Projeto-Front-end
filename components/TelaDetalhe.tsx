import { Vaga } from "@/lib/types";
import { formatarSalario } from "@/lib/formato";

function descricaoPadrao(vaga: Vaga): string {
  return `Vaga de ${vaga.titulo} na ${vaga.empresa}, na área de ${vaga.area}. Modalidade ${vaga.modalidade}.`;
}

function requisitosPadrao(vaga: Vaga): string[] {
  return [`Interesse em ${vaga.area}`, "Vontade de aprender", "Boa comunicação"];
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
    <div className="animate-surgir">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
        {vaga.area} · {vaga.modalidade}
      </p>
      <h2 className="mt-1 text-xl font-bold text-slate-900">{vaga.titulo}</h2>
      <p className="text-sm text-slate-500">{vaga.empresa}</p>

      {/* O salário ganha uma faixa própria: é a informação que a pessoa mais
          procura ao abrir a vaga. */}
      <p className="mt-3 inline-flex rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
        {formatarSalario(vaga.salario)}
      </p>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-900">Descrição</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{descricao}</p>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-900">Requisitos</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
          {requisitos.map((req, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="text-indigo-500">
                ✓
              </span>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={aoCandidatar}
        className="mt-6 w-full cursor-pointer rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.99]"
      >
        Candidatar-se
      </button>
    </div>
  );
}
