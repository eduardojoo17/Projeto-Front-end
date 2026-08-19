"use client";

import { Filtros, FILTROS_VAZIOS, temFiltroAtivo } from "@/lib/filtros";

/**
 * Barra de busca e filtros. Não guarda estado próprio: recebe os filtros
 * atuais e avisa quem usa a cada mudança, pra a página continuar dona da
 * lista filtrada.
 */
export default function FiltrosVagas({
  filtros,
  areas,
  modalidades,
  aoMudar,
}: {
  filtros: Filtros;
  areas: string[];
  modalidades: string[];
  aoMudar: (filtros: Filtros) => void;
}) {
  // Cada campo troca só a sua chave e mantém o resto do filtro.
  function mudar(campo: keyof Filtros, valor: string) {
    aoMudar({ ...filtros, [campo]: valor });
  }

  // Mesma aparência nos três campos — fica num único lugar pra não sair do
  // ar quando um deles mudar.
  const classeCampo =
    "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <label className="flex min-w-56 flex-1 flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Buscar por título
        </span>
        <input
          type="search"
          value={filtros.busca}
          onChange={(e) => mudar("busca", e.target.value)}
          placeholder="Ex: React, dados, design..."
          className={classeCampo}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Área
        </span>
        <select
          value={filtros.area}
          onChange={(e) => mudar("area", e.target.value)}
          className={`${classeCampo} cursor-pointer`}
        >
          <option value="">Todas as áreas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Modalidade
        </span>
        <select
          value={filtros.modalidade}
          onChange={(e) => mudar("modalidade", e.target.value)}
          className={`${classeCampo} cursor-pointer capitalize`}
        >
          <option value="">Todas as modalidades</option>
          {modalidades.map((modalidade) => (
            <option key={modalidade} value={modalidade}>
              {modalidade}
            </option>
          ))}
        </select>
      </label>

      {temFiltroAtivo(filtros) && (
        <button
          type="button"
          onClick={() => aoMudar(FILTROS_VAZIOS)}
          className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
