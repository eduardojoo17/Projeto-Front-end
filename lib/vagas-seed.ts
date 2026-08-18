import { Vaga } from "./types";

export const vagasSeed: Omit<Vaga, "id">[] = [
  { titulo: "Estágio Frontend", empresa: "TechNova", area: "Frontend", modalidade: "remoto", salario: 1800 },
  { titulo: "Estágio Backend", empresa: "DataFlow", area: "Backend", modalidade: "híbrido", salario: 1700 },
  { titulo: "Estágio Design", empresa: "Criativa", area: "Design", modalidade: "presencial", salario: 1500 },
  { titulo: "Estágio em React", empresa: "Nexus Software", area: "Frontend", modalidade: "remoto", salario: 1900 },
  { titulo: "Estágio em Node.js", empresa: "CloudBase", area: "Backend", modalidade: "remoto", salario: 1750 },
  { titulo: "Estágio em UX/UI", empresa: "Pixel Studio", area: "Design", modalidade: "híbrido", salario: 1600 },
  { titulo: "Estágio em Ciência de Dados", empresa: "InsightLab", area: "Dados", modalidade: "presencial", salario: 2000 },
  { titulo: "Estágio Mobile Android", empresa: "AppWorks", area: "Mobile", modalidade: "híbrido", salario: 1700 },
  { titulo: "Estágio em Testes de Software", empresa: "QualityFirst", area: "QA", modalidade: "remoto", salario: 1500 },
  { titulo: "Estágio Frontend Vue", empresa: "Orbit Tech", area: "Frontend", modalidade: "presencial", salario: 1650 },
  { titulo: "Estágio em APIs", empresa: "ServerHub", area: "Backend", modalidade: "híbrido", salario: 1800 },
  { titulo: "Estágio em Identidade Visual", empresa: "Brandly", area: "Design", modalidade: "remoto", salario: 1400 },
  { titulo: "Estágio em Análise de Dados", empresa: "MetricsPro", area: "Dados", modalidade: "remoto", salario: 1900 },
  { titulo: "Estágio Mobile iOS", empresa: "AppWorks", area: "Mobile", modalidade: "presencial", salario: 1750 },
  { titulo: "Estágio em Automação de Testes", empresa: "QualityFirst", area: "QA", modalidade: "híbrido", salario: 1600 },
  { titulo: "Estágio em Next.js", empresa: "Nexus Software", area: "Frontend", modalidade: "híbrido", salario: 1850 },
  { titulo: "Estágio em Banco de Dados", empresa: "DataFlow", area: "Backend", modalidade: "presencial", salario: 1700 },
  { titulo: "Estágio em Design de Produto", empresa: "Pixel Studio", area: "Design", modalidade: "remoto", salario: 1550 },
  { titulo: "Estágio em Business Intelligence", empresa: "InsightLab", area: "Dados", modalidade: "híbrido", salario: 1950 },
  { titulo: "Estágio em Suporte Técnico", empresa: "CloudBase", area: "QA", modalidade: "presencial", salario: 1450 },
];