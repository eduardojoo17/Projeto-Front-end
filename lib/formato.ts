/** Formata um número como moeda brasileira: 1800 -> "R$ 1.800,00". */
export function formatarSalario(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
