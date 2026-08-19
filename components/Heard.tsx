import Image from "next/image";

export default function Header() {
  return (
    // sticky + backdrop-blur: o cabeçalho acompanha a rolagem sem tampar o
    // conteúdo, que aparece translúcido por trás dele.
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-base font-bold text-white shadow-sm">
            V
          </span>
          <div>
            <h1 className="text-base font-bold leading-tight text-slate-900 sm:text-lg">
              Portal de Vagas
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Estágios e oportunidades para quem está começando
            </p>
          </div>
        </div>

        {/* O arquivo tem 200x97; o next/image reserva o espaço e evita que o
            cabeçalho "pule" quando a imagem termina de carregar. */}
        <Image
          src="/logo-senai-rj.png"
          alt="Logo SENAI RJ"
          width={200}
          height={97}
          priority
          className="h-8 w-auto sm:h-10"
        />
      </div>
    </header>
  );
}
