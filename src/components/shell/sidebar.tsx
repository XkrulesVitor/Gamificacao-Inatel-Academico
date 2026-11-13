"use client";

import { useRouter } from "next/navigation";
import { Power } from "lucide-react";
import { useSession } from "@/components/session-provider";
import { NavList } from "@/components/shell/nav-list";
import { UserBlock } from "@/components/shell/user-block";
import { InatelLogo } from "@/components/ui/primitives";

/** Sidebar fixa do desktop: o menu do app real sempre aberto. */
export function Sidebar() {
  const router = useRouter();
  const { sair } = useSession();
  return (
    <aside
      aria-label="Menu principal"
      className="hidden w-[232px] shrink-0 flex-col border-r border-black/40 bg-drawer lg:flex xl:w-[264px]"
    >
      <div className="flex h-16 shrink-0 items-center gap-2.5 bg-header px-5">
        <InatelLogo className="text-[26px] leading-none" />
        <span className="pt-1 text-[15px] text-white/80">Acadêmico</span>
      </div>
      <div className="app-scroll flex-1">
        <UserBlock />
        <NavList compact />
      </div>
      <button
        type="button"
        onClick={() => {
          sair();
          router.replace("/");
        }}
        className="flex h-12 shrink-0 items-center gap-5 border-t border-white/[0.07] px-5 text-left text-[15px] text-[#e4e4e7] transition-colors hover:bg-white/[0.04]"
      >
        <Power className="size-5 text-[#c9c9cf]" strokeWidth={1.75} aria-hidden />
        Sair
      </button>
    </aside>
  );
}
