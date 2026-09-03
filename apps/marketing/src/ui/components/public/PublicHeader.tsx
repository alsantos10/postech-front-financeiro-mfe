"use client"

import Link from 'next/link';
import Button from '../shared/Button';
import { useAuth } from '@/ui/hooks/useAuth';
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface PublicHeaderProps {
    onOpenLogin: () => void;
    onOpenRegister: () => void;
}

export function PublicHeader({onOpenLogin, onOpenRegister}: PublicHeaderProps) {
    const {isAuthenticated} = useAuth();
    let [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const goToPanel = () => {
        setIsLoading(true);
        setIsOpen(false);
        redirect(`/painel`);
    };

    const handleNav = async (href: string) => {
        setIsLoading(true);
        setIsOpen(false);
         try {
            await router.push(href);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <header className='bg-black shadow-2xl'>
            <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:flex-row'>

                {/* Mobile: menu a esqueda */}
                <button className='sm:hidden text-white cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Logo: mobile a direita, desktop a esquerda */}
                <Link href="/" className='hidden sm:flex md:flex lg:hidden'>
                    <img
                        src="/logo_icon.png"
                        alt="Bytebank"
                        className="h-8 w-8"
                        width={146}
                        height={32}
                    />
                </Link>

                {/* Logo: mobile a direita, desktop a esquerda */}
                <Link href="/" className='sm:hidden lg:flex'>
                    <img
                        src="/Logo.svg"
                        alt="Bytebank"
                        className="h-8 w-auto"
                        width={146}
                        height={32}
                    />
                </Link>
                
                {/* Navegação desktop */}
                <nav className='hidden sm:flex items-center gap-6'>
                    <Link
                        href="/about"
                        className="rounded-none px-0 py-0 text-[18px] font-semibold text-custom-green hover:text-custom-green-500">
                        Sobre
                    </Link>
                    <Link
                        href="/services"
                        className="rounded-none bg-transparent px-0 py-0 text-[18px] font-semibold text-custom-green hover:text-custom-green-500">
                        Serviços
                    </Link>
                </nav>

                {/* Botoes de autenticação */}
                <div className='hidden sm:flex items-center gap-2'>
                    {isAuthenticated ? (
                        <Button variant='primary' size='md' onClick={goToPanel}>
                            Painel de Controle
                        </Button>
                    ):(
                        <>
                            <Button variant="primary" size="md" onClick={() => handleNav("/register")}>
                                Abrir sua Conta
                            </Button>
                            <Button variant="secondary" size="md" onClick={() => handleNav("/login")}>
                                Já tenho Conta
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Backdrop */}
            {isOpen && (
                <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-40"
                onClick={() => setIsOpen(false)}
                />
            )}

            {/* Menu Mobile expansivel */}
            <div className={`
                sm:hidden hover fixed top-0 left-0 h-full w-64 bg-black shadow-lg z-50
                transform transition-all duration-300 ease-in-out
                ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
                `}>

                {/* Cabeçalho do menu com botão close */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
                    <span className="text-white font-bold">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="text-white cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {/* Links e Botoes */}
                <div className='px-6 py-8 space-y-6'>
                    <button onClick={() => handleNav("/about")} className="block text-lg text-white cursor-pointer hover:text-custom-green text-left w-full">
                        Sobre
                    </button>
                    <button onClick={() => handleNav("/services")} className="block text-lg text-white cursor-pointer hover:text-custom-green text-left w-full">
                        Serviços
                    </button>
                {isAuthenticated ? (
                    <Button variant="primary" size="md" fullWidth onClick={goToPanel}>
                        Painel de Controle
                    </Button>
                ) : (
                    <div className="space-y-4">
                        <Button variant="primary" size="md" fullWidth onClick={() => handleNav("/register")}>
                            Abrir sua Conta
                        </Button>
                        <Button variant="secondary" size="md" fullWidth onClick={() => handleNav("/login")}>
                            Já tenho Conta
                        </Button>
                    </div>
                )}
                </div>
            </div>

            {/* Loading overlay */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-green"></div>
                </div>
            )}
        </header>
    )
}