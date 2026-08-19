/**
 * Rascunho do formulário: guarda o que a pessoa já digitou pra ela não
 * perder o texto se recarregar a página ou fechar o modal sem enviar (R9).
 *
 * As funções são genéricas de propósito (<T>): esta "gaveta" não sabe — nem
 * precisa saber — o formato do formulário. Quem chama é que diz o tipo:
 *
 *   salvarRascunho<CamposFormulario>(dados);
 *   const salvo = recuperarRascunho<CamposFormulario>(); // CamposFormulario | null
 *   apagarRascunho();
 *
 * Diferente do lib/api.ts, aqui não tem async nem delay de 700ms: o rascunho
 * é salvo a cada tecla digitada, então precisa ser instantâneo.
 */

// Chave combinada com o grupo: "vagas" e "candidaturas" são a base
// compartilhada; "rascunho" é o canto individual do formulário.
const CHAVE = "rascunho";

/** Grava o rascunho por cima do anterior — só existe um salvo por vez. */
export function salvarRascunho<T>(dados: T): void {
  // localStorage só guarda texto, por isso o JSON.stringify.
  localStorage.setItem(CHAVE, JSON.stringify(dados));
}

/** Devolve o rascunho salvo, ou null quando não há nada guardado. */
export function recuperarRascunho<T>(): T | null {
  const texto = localStorage.getItem(CHAVE);
  if (texto === null) return null;

  try {
    // JSON.parse devolve um valor sem tipo definido; o `as T` diz ao
    // TypeScript qual formato esperamos — o mesmo que foi salvo.
    return JSON.parse(texto) as T;
  } catch {
    // Se o texto guardado não for JSON válido (alguém editou o localStorage
    // na mão), tratamos como "não tem rascunho" em vez de quebrar a tela.
    return null;
  }
}

/** Apaga o rascunho — chamar depois que a candidatura foi enviada. */
export function apagarRascunho(): void {
  localStorage.removeItem(CHAVE);
}
