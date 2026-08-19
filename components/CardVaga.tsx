import { Vaga } from "@/lib/types";

export default function CardVaga({ vaga }: { vaga: Vaga }) {
  return (
    // flex-col + h-full: o cartão ocupa toda a altura da coluna, então
    // cartões da mesma linha ficam do mesmo tamanho mesmo com títulos
    // de tamanhos diferentes.
    <div className="flex h-full w-full flex-col rounded-lg border p-4 shadow-sm transition hover:shadow-md sm:p-5">
      {/* wrap-break-word evita que um nome comprido de empresa estoure o
          cartão na tela do celular. */}
      <h3 className="font-semibold wrap-break-word">{vaga.titulo}</h3>
      <p className="text-sm wrap-break-word text-gray-600">{vaga.empresa}</p>

      {/* flex-wrap: se as duas etiquetas não couberem lado a lado, a segunda
          desce pra linha de baixo em vez de espremer o cartão. */}
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <span className="rounded bg-gray-100 px-2 py-1">{vaga.area}</span>
        <span className="rounded bg-gray-100 px-2 py-1 capitalize">
          {vaga.modalidade}
        </span>
      </div>

      {/* mt-auto empurra o salário pro rodapé do cartão: todos ficam
          alinhados na mesma altura dentro da linha. */}
      <p className="mt-auto pt-3 text-sm font-medium">R$ {vaga.salario}</p>
    </div>
  );
}
