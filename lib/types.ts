export type Modalidade = "presencial" | "remoto" | "híbrido";

export type Vaga = {
  id: number;
  titulo: string;
  empresa: string;
  area: string;
  modalidade: Modalidade;
  salario: number;
  // Opcionais: as vagas do seed ainda não têm esses campos.
  descricao?: string;
  requisitos?: string[];
};

export type Candidatura = {
  id: number;
  vagaId: number;
  nome: string;
  email: string;
  telefone: string;
  portfolio: string;
  carta: string;
};
