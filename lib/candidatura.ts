import { listar, criar } from "./api";
import { Candidatura } from "./types";

const CHAVE = "candidaturas";

export async function listarCandidaturas(): Promise<Candidatura[]> {
  return listar<Candidatura>(CHAVE);
}

export async function criarCandidatura(
  dados: Omit<Candidatura, "id">
): Promise<Candidatura> {
  // `criar` é a função genérica da Pessoa 1: gera o id, salva no
  // localStorage e devolve o item completo (com o delay de 700ms).
  return criar<Candidatura>(CHAVE, dados);
}

export async function jaCandidatou(vagaId: number, email: string): Promise<boolean> {
  const todas = await listarCandidaturas();
  return todas.some(
    (c) =>
      c.vagaId === vagaId &&
      c.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
}