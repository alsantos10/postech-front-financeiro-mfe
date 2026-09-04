'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null
    }

    function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === overlayRef.current) {
            onClose();
        }
    }

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className='fixed inset-0 z-50 overflow-y-auto bg-black/50 p-0'
            role="dialog"
            aria-modal="true">
                <div className='relative mx-auto flex min-h-dvh w-full max-w-md flex-col rounded-none bg-white p-6 shadow-xl'>
                    <button
                        type='button'
                        onClick={onClose}
                        aria-label='Fechar'
                        className='absolute cursor-pointer right-4 top-4 z-10 rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700'>
                        <X size={20} aria-hidden="true" />
                    </button>
                    {title && (
                        <h2 className='mb-4 text-lg font-semibold text-zinc-900'>{title}</h2>
                    )}
                    {children}
                </div>
            
        </div>
  )
}
