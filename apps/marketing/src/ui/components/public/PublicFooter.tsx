import Image from "next/image";
import Link from "next/link";

export function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-black px-6 py-10 text-white">
            <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-center gap-10 text-center md:justify-between md:text-left">
                <div className="min-w-45">
                  <h2 className="mb-3 font-[Inter] text-[16px] font-bold not-italic leading-[120%] tracking-[0%] text-white align-middle">
                    Serviços
                  </h2>
                  <div className="space-y-2 font-[Inter] text-[16px] font-normal not-italic leading-[120%] tracking-[0%] text-white align-middle">
                    <p>Conta corrente</p>
                    <p>Conta PJ</p>
                    <p>Cartão de crédito</p>
                  </div>
                </div>
        
                <div className="min-w-45">
                  <h2 className="mb-3 font-[Inter] text-[16px] font-bold not-italic leading-[120%] tracking-[0%] text-white align-middle">
                    Contato
                  </h2>
                  <div className="space-y-2 font-[Inter] text-[16px] font-normal not-italic leading-[120%] tracking-[0%] text-white align-middle">
                    <p>0800 004 250 08</p>
                    <p>meajuda@bytebank.com.br</p>
                    <p>ouvidoria@bytebank.com.br</p>
                  </div>
                </div>
        
                <div className="min-w-45">
                  <h2 className="mb-3 font-[Inter] text-[16px] font-bold not-italic leading-[120%] tracking-[0%] text-white align-middle">
                        @ {currentYear} Desenvolvido por Alura
                  </h2>
                  <div className="mb-4 flex items-center">
                    <Image
                      src="/Logo.svg"
                      alt="Bytebank"
                      width={140}
                      height={32}
                      className="brightness-0 inver w-full h-auto"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <a href="#" aria-label="Instagram" className="rounded-full border border-white/70 p-1.5">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-white stroke-[1.6]">
                        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                        <circle cx="12" cy="12" r="4.5" />
                        <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
                      </svg>
                    </a>
                    <a href="#" aria-label="Facebook" className="rounded-full border border-white/70 p-1.5">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-white stroke-[1.8]">
                        <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.4l.6-3H13V8.9c0-.5.4-.9.9-.9z" />
                      </svg>
                    </a>
                    <a href="#" aria-label="YouTube" className="rounded-full border border-white/70 p-1.5">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                        <path d="M21.6 7.2a2.7 2.7 0 00-1.9-1.9C18.2 5 12 5 12 5s-6.2 0-7.7.3A2.7 2.7 0 002.4 7.2 28.3 28.3 0 002 12a28.3 28.3 0 00.4 4.8 2.7 2.7 0 001.9 1.9C5.8 19 12 19 12 19s6.2 0 7.7-.3a2.7 2.7 0 001.9-1.9A28.3 28.3 0 0022 12a28.3 28.3 0 00-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
                      </svg>
                    </a>
                  </div>
                </div>
            </div>
        </footer>
    )


/*
    return (
        <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 md:flex-row">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    @ {currentYear} Painel de Controlador Demo
                </span>
            </div>

            <div>
                <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    Home
                </Link>
                <Link href="/other" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    Outro
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <a href="null" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    Facebook
                </a>
                <a href="null" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    Twitter
                </a>
                <a href="null" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
                    Instagran"
                </a>
            </div>
        </footer>
    )
*/
}