"use client";

import { useState } from "react";
import { Vaga } from "@/lib/types";
import { CamposFormulario, Erros, validarCampos } from "@/lib/validacaoCandidatura";
import { criarCandidatura, jaCandidatou } from "@/lib/candidatura";

const CAMPOS_INICIAIS: CamposFormulario = {
  nome: "",
  email: "",
  telefone: "",
  portfolio: "",
  carta: "",
};

function CampoTexto({
  label,
  nome,
  valor,
  aoMudar,
  erro,
  tipo = "text",
  placeholder,
}: {
  label: string;
  nome: keyof CamposFormulario;
  valor: string;
  aoMudar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  erro?: string;
  tipo?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700" htmlFor={nome}>
        {label}
      </label>
      <input
        id={nome}
        name={nome}
        type={tipo}
        value={valor}
        onChange={aoMudar}
        placeholder={placeholder}
        className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
          erro
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-300 focus:ring-indigo-200"
        }`}
      />
      {erro && <p className="mt-1 text-xs text-red-600">{erro}</p>}
    </div>
  );
}

export default function FormularioCandidatura({
  vaga,
  aoVoltar,
}: {
  vaga: Vaga;
  aoVoltar: () => void;
}) {
  const [dados, setDados] = useState<CamposFormulario>(CAMPOS_INICIAIS);
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [enviada, setEnviada] = useState(false);

  function aoMudarCampo(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setDados((atual) => ({ ...atual, [name]: value }));
    if (erros[name as keyof CamposFormulario]) {
      setErros((atual) => ({ ...atual, [name]: undefined }));
    }
    setErroGeral(null);
  }

  async function aoSubmeter(e: React.FormEvent) {
    e.preventDefault();
    if (enviando) return;

    const novosErros = validarCampos(dados);
    setErros(novosErros);
    setErroGeral(null);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    try {
      // Uma pessoa não pode se candidatar duas vezes na mesma vaga
      // com o mesmo e-mail.
      if (await jaCandidatou(vaga.id, dados.email)) {
        setErros({ email: "Você já se candidatou a esta vaga com este e-mail." });
        return;
      }

      await criarCandidatura({
        vagaId: vaga.id,
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        telefone: dados.telefone.trim(),
        portfolio: dados.portfolio.trim(),
        carta: dados.carta.trim(),
      });
      setEnviada(true);
    } catch {
      setErroGeral("Não foi possível enviar sua candidatura. Tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviada) {
    return (
      <div>
        <h2 className="text-lg font-bold text-gray-900">Candidatura enviada!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Recebemos sua candidatura para <strong>{vaga.titulo}</strong> na{" "}
          {vaga.empresa}. Boa sorte!
        </p>
        <button
          type="button"
          onClick={aoVoltar}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Voltar para a vaga
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={aoSubmeter}>
      <button
        type="button"
        onClick={aoVoltar}
        disabled={enviando}
        className="mb-3 text-xs font-medium text-indigo-600 hover:underline disabled:text-gray-400 disabled:no-underline"
      >
        ← Voltar para a vaga
      </button>

      <h2 className="text-lg font-bold text-gray-900">Candidatar-se</h2>
      <p className="text-sm text-gray-500">
        {vaga.titulo} · {vaga.empresa}
      </p>

      <div className="mt-4 space-y-4">
        <CampoTexto
          label="Nome completo"
          nome="nome"
          valor={dados.nome}
          aoMudar={aoMudarCampo}
          erro={erros.nome}
          placeholder="Seu nome"
        />
        <CampoTexto
          label="E-mail"
          nome="email"
          tipo="email"
          valor={dados.email}
          aoMudar={aoMudarCampo}
          erro={erros.email}
          placeholder="voce@email.com"
        />
        <CampoTexto
          label="Telefone"
          nome="telefone"
          tipo="tel"
          valor={dados.telefone}
          aoMudar={aoMudarCampo}
          erro={erros.telefone}
          placeholder="(11) 91234-5678"
        />
        <CampoTexto
          label="Portfólio (opcional)"
          nome="portfolio"
          tipo="url"
          valor={dados.portfolio}
          aoMudar={aoMudarCampo}
          erro={erros.portfolio}
          placeholder="https://seuportfolio.com"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="carta">
            Carta de apresentação
          </label>
          <textarea
            id="carta"
            name="carta"
            rows={4}
            value={dados.carta}
            onChange={aoMudarCampo}
            placeholder="Conte por que você se encaixa nessa vaga"
            className={`mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
              erros.carta
                ? "border-red-400 focus:ring-red-200"
                : "border-gray-300 focus:ring-indigo-200"
            }`}
          />
          {erros.carta && <p className="mt-1 text-xs text-red-600">{erros.carta}</p>}
        </div>
      </div>

      {erroGeral && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {erroGeral}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {enviando ? "Enviando..." : "Enviar candidatura"}
      </button>
    </form>
  );
}