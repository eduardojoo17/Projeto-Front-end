export type Modalidade = "presencial" | "remoto" | "híbrido";

export type Vaga = {
  id: number;
  titulo: string;
  empresa: string;
  area: string;
  modalidade: Modalidade;
  salario: number;
};