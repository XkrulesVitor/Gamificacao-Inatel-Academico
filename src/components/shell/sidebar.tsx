"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useSession } from "@/components/session-provider";
import { NavList } from "@/components/shell/nav-list";
import { UserCard } from "@/components/shell/user-block";
import { InatelLogo } from "@/components/ui/primitives";

/** Sidebar fixa do desktop: marca, 6 itens e o cartão do aluno com o anel de nível. */
export function Sidebar() {
  const router = useRouter();
  const { sair } = useSession();
  return (
    <aside
      aria-label="Menu principal"
      className="hidden w-[248px] shrink-0 flex-col border-r border-line bg-sidebar lg:flex xl:w-[264px]"
    >
      <div className="flex h-16 shrink-0 items-center gap-2.5 bg-gradient-to-r from-header to-header-2 px-5">
        <InatelLogo className="text-[26px] leading-none !text-white" />
        <span className="pt-1 text-[15px] text-on-header-muted">Acadêmico</span>
      </div>
      <div className="app-scroll flex-1">
        <NavList />
      </div>
      <div className="shrink-0 border-t border-line p-3">
        <UserCard />
        <button
          type="button"
          onClick={() => {
            sair();
            router.replace("/");
          }}
          className="mt-1 flex h-10 w-full items-center gap-3.5 rounded-control px-3 text-left text-sm text-sidebar-muted transition-colors hover:bg-sidebar-active hover:text-fg"
        >
          <LogOut className="size-[18px]" strokeWidth={1.75} aria-hidden />
          Sair
        </button>
      </div>
    </aside>
  );
}
