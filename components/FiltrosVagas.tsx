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

  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex min-w-56 flex-1 flex-col gap-1">
        <span className="text-sm font-medium">Buscar por título</span>
        <input
          type="search"
          value={filtros.busca}
          onChange={(e) => mudar("busca", e.target.value)}
          placeholder="Ex: React, dados, design..."
          className="rounded-lg border px-3 py-2 text-sm"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Área</span>
        <select
          value={filtros.area}
          onChange={(e) => mudar("area", e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          <option value="">Todas as áreas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Modalidade</span>
        <select
          value={filtros.modalidade}
          onChange={(e) => mudar("modalidade", e.target.value)}
          className="rounded-lg border px-3 py-2 text-sm capitalize"
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
          className="cursor-pointer rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}
