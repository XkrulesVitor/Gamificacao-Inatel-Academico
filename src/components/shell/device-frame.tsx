import { BatteryFull, Signal, Smartphone, Trophy, Wifi } from "lucide-react";

/** Rodapé: indicador de home falso no desktop (moldura) e safe-area inferior real no PWA. */
function HomeIndicator() {
  return (
    <>
      <div className="h-[env(safe-area-inset-bottom)] shrink-0 bg-bg md:hidden" />
      <div className="hidden h-6 shrink-0 items-center justify-center bg-bg md:flex" aria-hidden>
        <span className="h-[5px] w-32 rounded-full bg-white/70" />
      </div>
    </>
  );
}

/** Barra de status: falsa no desktop (moldura) e safe-area real no PWA instalado. */
function StatusBar() {
  return (
    <>
      <div className="h-[env(safe-area-inset-top)] shrink-0 bg-status md:hidden" />
      <div className="hidden h-11 shrink-0 items-center justify-between bg-status px-7 text-[13px] font-semibold text-fg md:flex">
        <span>09:41</span>
        <span className="flex items-center gap-1.5" aria-hidden>
          <Signal className="size-3.5" />
          <Wifi className="size-3.5" />
          <BatteryFull className="size-4" />
        </span>
      </div>
    </>
  );
}

/**
 * No celular: o app ocupa a tela inteira (100dvh).
 * No desktop (md+): o app é exibido dentro de uma moldura de smartphone 390×844,
 * para apresentação do protótipo. O elemento #app-frame é o "viewport" do app:
 * overlays (menu lateral, bottom sheets) devem usar position:absolute relativo a ele
 * (use o componente <Portal> de components/ui/portal.tsx).
 */
export function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden md:bg-[radial-gradient(ellipse_at_top,#12305a_0%,#05070d_55%,#000_100%)]">
      {/* Painel lateral de apresentação (somente desktop largo) */}
      <aside className="pointer-events-none absolute left-10 top-1/2 hidden max-w-xs -translate-y-1/2 select-none xl:block">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Protótipo · S05 IHM</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight text-fg">
          App Acadêmico <span className="italic text-brand">Inatel</span>
          <br />+ Gamificação
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Conquistas por medalhas e ranking proporcional por créditos e presença em laboratórios — dentro da
          navegação padrão do app.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-muted">
          <li className="flex items-center gap-3">
            <Trophy className="size-4 text-gold" aria-hidden /> Conta demo: Lucas, Eng. de Software, 4º período
          </li>
          <li className="flex items-center gap-3">
            <Smartphone className="size-4 text-brand" aria-hidden /> Abra no celular e instale como app (PWA)
          </li>
        </ul>
        <p className="mt-8 text-xs text-subtle">Protótipo acadêmico não oficial · dados fictícios</p>
      </aside>

      <div
        id="device"
        className="relative h-full w-full md:h-[min(844px,calc(100dvh-48px))] md:w-[390px] md:rounded-[52px] md:bg-[#0d0d0f] md:p-[10px] md:shadow-[0_0_0_2px_#2a2a2e,0_40px_120px_-20px_rgba(31,111,209,0.45)]"
      >
        <div
          id="app-frame"
          className="relative isolate flex h-full w-full flex-col overflow-hidden bg-bg md:rounded-[42px]"
        >
          <StatusBar />
          {children}
          <HomeIndicator />
        </div>
      </div>
    </div>
  );
}
