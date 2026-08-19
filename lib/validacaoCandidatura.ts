export type CamposFormulario = {
  nome: string;
  email: string;
  telefone: string;
  portfolio: string;
  carta: string;
};

export type Erros = Partial<Record<keyof CamposFormulario, string>>;

export const MIN_CARTA = 50;

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

function validarNome(valor: string): string | undefined {
  const nome = valor.trim();
  if (!nome) return "Informe seu nome completo.";
  if (nome.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
  if (!nome.includes(" ")) return "Informe nome e sobrenome.";
}

function validarEmail(valor: string): string | undefined {
  const email = valor.trim();
  if (!email) return "Informe seu e-mail.";
  if (!REGEX_EMAIL.test(email)) return "E-mail inválido. Exemplo: nome@email.com";
}

function validarTelefone(valor: string): string | undefined {
  const digitos = apenasDigitos(valor);
  if (!digitos) return "Informe seu telefone.";
  if (digitos.length < 10 || digitos.length > 11) {
    return "Telefone inválido. Use DDD + número, ex: (11) 91234-5678";
  }
}

function validarPortfolio(valor: string): string | undefined {
  const link = valor.trim();
  // Campo opcional: vazio passa. Se preencheu, tem que ser um link válido.
  if (!link) return;

  const comProtocolo = /^https?:\/\//i.test(link) ? link : `https://${link}`;
  try {
    const url = new URL(comProtocolo);
    if (!url.hostname.includes(".")) throw new Error("sem domínio");
  } catch {
    return "Link inválido. Exemplo: https://seuportfolio.com";
  }
}

function validarCarta(valor: string): string | undefined {
  const carta = valor.trim();
  if (!carta) return "Escreva uma carta de apresentação.";
  if (carta.length < MIN_CARTA) {
    return `A carta deve ter pelo menos ${MIN_CARTA} caracteres (faltam ${
      MIN_CARTA - carta.length
    }).`;
  }
}

export function validarCampos(dados: CamposFormulario): Erros {
  const erros: Erros = {};

  const nome = validarNome(dados.nome);
  if (nome) erros.nome = nome;

  const email = validarEmail(dados.email);
  if (email) erros.email = email;

  const telefone = validarTelefone(dados.telefone);
  if (telefone) erros.telefone = telefone;

  const portfolio = validarPortfolio(dados.portfolio);
  if (portfolio) erros.portfolio = portfolio;

  const carta = validarCarta(dados.carta);
  if (carta) erros.carta = carta;

  return erros;
}
