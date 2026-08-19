import { Modalidade, Vaga } from "@/lib/types";
import { formatarSalario } from "@/lib/formato";

// Cada modalidade tem a sua cor, então dá pra bater o olho na lista e
// identificar remoto/presencial/híbrido sem ler a etiqueta.
const CORES_MODALIDADE: Record<Modalidade, string> = {
  remoto: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  presencial: "bg-amber-50 text-amber-700 ring-amber-200",
  híbrido: "bg-sky-50 text-sky-700 ring-sky-200",
};

export default function CardVaga({ vaga }: { vaga: Vaga }) {
  return (
    // flex-col + h-full: o cartão ocupa toda a altura da coluna, então
    // cartões da mesma linha ficam do mesmo tamanho mesmo com títulos
    // de tamanhos diferentes.
    <div className="group flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100">
      {/* wrap-break-word evita que um nome comprido de empresa estoure o
          cartão na tela do celular. */}
      <h3 className="font-semibold wrap-break-word text-slate-900">
        {vaga.titulo}
      </h3>
      <p className="mt-0.5 text-sm wrap-break-word text-slate-500">
        {vaga.empresa}
      </p>

      {/* flex-wrap: se as duas etiquetas não couberem lado a lado, a segunda
          desce pra linha de baixo em vez de espremer o cartão. */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 ring-1 ring-slate-200">
          {vaga.area}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 capitalize ring-1 ${CORES_MODALIDADE[vaga.modalidade]}`}
        >
          {vaga.modalidade}
        </span>
      </div>

      {/* mt-auto empurra o rodapé do cartão pra baixo: os salários ficam
          alinhados na mesma altura dentro da linha. */}
      <div className="mt-auto flex items-end justify-between gap-2 border-t border-slate-100 pt-4">
        <p className="text-base font-bold text-slate-900">
          {formatarSalario(vaga.salario)}
        </p>
        <span className="sem-impressao text-xs font-semibold text-indigo-600 opacity-0 transition group-hover:opacity-100">
          Ver vaga →
        </span>
      </div>
    </div>
  );
}
