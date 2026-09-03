'use client'

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { GetNavigationLinksUseCase } from '@/core/usecases/GetNavigationLinksUseCase';
import { NavbarMobile } from './NavibarMobile';
import { SidebarTransactions } from './SidebarTransactions';
import { UserMenu } from './UserMenu';
import { NavLink } from 'react-router-dom';
import { usePathname } from 'next/navigation';

export default function MainDashboard({ children }: { children: React.ReactNode }) {
  const [menuAberto, setMenuAberto] = useState(false);

  // Instanciação/Injeção do Caso de Uso (Pode ser feito via Container de DI se preferir)
  const getLinksUseCase = useMemo(() => new GetNavigationLinksUseCase(), []);
  const links = useMemo(() => getLinksUseCase.execute(), [getLinksUseCase]);

  const pathname = usePathname();

  const baseLink = "block py-4 font-medium hover:text-custom-green-500 border-b border-transparent hover:border-custom-green-500 transition-colors";
  const baseLinkDesktop = "block py-4 font-medium hover:text-custom-green-500 border-b hover:border-custom-green-500 last:border-b-0 transition-colors";
  const activeLink = "text-custom-green-500 border-custom-green-500";
  const inactiveLink = "border-black";

  return (
    <div className="min-h-screen flex flex-col bg-[#E4EDE3]">

      {/* HEADER / BARRA PRINCIPAL */}
      <header className="relative w-full h-16 border-b border-gray-200 bg-[#004D61] px-4 flex items-center justify-between z-50">
        <div>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 rounded focus:outline-none cursor-pointer text-gray-100 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuAberto ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          {/* MOBILE (Injetando a regra desacoplada) */}
          <NavbarMobile links={links} isOpen={menuAberto} onClose={() => setMenuAberto(false)} />
        </div>

        <div className="flex items-center gap-4">
          <UserMenu />
        </div>
      </header>

      {/* TABLET */}
      <div className="hidden md:flex xl:hidden w-full justify-center border-b border-gray-200 py-3">
        <nav className="w-150 flex justify-between items-center px-4">
          {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}
                    className={`${baseLink} ${isActive ? activeLink : inactiveLink}`}>
                    {link.label}
                  </Link>
                )
              })}
        </nav>
      </div>

      {/* ÁREA DO CONTEÚDO (Grid Desktop 180px | 690px | 282px) */}
      <div className="flex-1 w-full max-w-[1152] mx-auto flex flex-col xl:flex-row">

        {/* DESKTOP: Esquerda (180px) */}
        <aside className="hidden xl:block py-6 text-center">
          <div className="mb-6 block bg-[#F5F5F5] pt-6 w-45 min-w-45 rounded-lg mx-auto h-full">
            <nav className="flex flex-col justify-center pr-6 pl-6">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}
                    className={`${baseLinkDesktop} ${isActive ? activeLink : inactiveLink}`}>
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* CORPO CENTRAL */}
        <div className="flex flex-1 flex-col md:flex-row w-full">
          {/* Centro (690px) */}
          <main className="w-full xl:w-173 xl:min-w-173">
            {children}
          </main>

          {/* Direita (282px) */}
          <aside className="w-full md:w-auto xl:w-[282] xl:min-w-[282] p-4 border-t md:border-t-0 md:border-l border-gray-200">
            <div className="text-sm font-semibold mb-2">

              <SidebarTransactions />
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}