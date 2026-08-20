/**
 * Indicador de carregamento usado em dois lugares:
 * - na tela inicial, enquanto as vagas vêm do "backend" (lib/api.ts);
 * - dentro do modal, enquanto a candidatura está sendo salva.
 *
 * Como é o mesmo componente nos dois casos, a espera tem sempre a mesma
 * aparência — é isso que passa a sensação de "está salvando".
 */
export default function Carregando({
  mensagem = "Carregando...",
  descricao,
}: {
  mensagem?: string;
  descricao?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-12 text-center"
    >
      {/* Dois anéis sobrepostos: o de baixo é a trilha cinza, o de cima é o
          arco colorido que gira (animate-spin do Tailwind). */}
      <span className="relative inline-flex h-10 w-10">
        <span className="absolute inset-0 rounded-full border-4 border-indigo-100" />
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-600" />
      </span>

      <div>
        <p className="text-sm font-semibold text-slate-800">{mensagem}</p>
        {descricao && (
          <p className="mt-1 text-xs text-slate-500">{descricao}</p>
        )}
      </div>
    </div>
  );
}
