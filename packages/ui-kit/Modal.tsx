'use client'

import { useEffect, useRef, useState } from 'react'


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
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
            role="dialog"
            aria-modal="true">
                <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
                    {title && (
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='text-lg font-semibold text-zinc-900'>{title}</h2>
                            <button
                                onClick={onClose}
                                aria-label='Fechar'
                                className='text-zinc-500 hover:text-zinc-700'>X</button>
                        </div>
                    )}
                    {children}
                </div>
            
        </div>
  )
}
