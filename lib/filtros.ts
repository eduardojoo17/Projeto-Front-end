import { Vaga } from "./types";

export type Filtros = {
  busca: string;
  area: string;
  modalidade: string;
};

// Campo vazio = "não filtra por isso".
export const FILTROS_VAZIOS: Filtros = { busca: "", area: "", modalidade: "" };

const ACENTOS = new RegExp("[\\u0300-\\u036f]", "g");

// Tira acento e caixa alta pra busca achar "ciencia" em "Ciência de Dados".
export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(ACENTOS, "").toLowerCase();
}

/**
 * Valores distintos de um campo, em ordem alfabética, pra montar as opções
 * dos selects. Sempre recebe a lista completa de vagas — se recebesse a lista
 * já filtrada, a opção escolhida sumiria do próprio dropdown.
 */
export function opcoesUnicas(
  vagas: Vaga[],
  campo: "area" | "modalidade"
): string[] {
  return [...new Set(vagas.map((vaga) => vaga[campo]))].sort();
}

export function temFiltroAtivo(filtros: Filtros): boolean {
  return (
    filtros.busca !== "" || filtros.area !== "" || filtros.modalidade !== ""
  );
}

export function filtrarVagas(vagas: Vaga[], filtros: Filtros): Vaga[] {
  const termo = normalizar(filtros.busca.trim());

  return vagas.filter((vaga) => {
    const combinaTitulo = !termo || normalizar(vaga.titulo).includes(termo);
    const combinaArea = !filtros.area || vaga.area === filtros.area;
    const combinaModalidade =
      !filtros.modalidade || vaga.modalidade === filtros.modalidade;

    return combinaTitulo && combinaArea && combinaModalidade;
  });
}
