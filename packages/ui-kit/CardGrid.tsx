"use client";

import { Transaction, TypeInvestment, TypeTransaction } from "@dash/core/entities/Transactions"
import { formatCurrency } from "@dash/core/utils/formatting/currency";
import { convertDate, getDateName } from '@dash/core/utils/formatting/convertDate';
import { capitalize } from "@dash/core/utils/formatting/capitalize";
import { Check, PencilLine, Trash2 } from 'lucide-react'; // 1. Adicionado o ícone Trash2
import { useState } from 'react';
import { minAmoutTransactionSchema } from '@/ui/schemas/minAmoutTransactionSchema';


export interface CardTransactionGridProps {
    transactions: Transaction[],
    loading: boolean;
    loadingMore?: boolean;
    editable?: boolean;
    onSaveTransaction?: (transactionId: string, amount: number) => void;
    onDeleteTransaction?: (transactionId: string) => void; // 2. Adicionada a prop de exclusão
}

export function CardTransactionGrid({
    transactions, loading, loadingMore = false, editable = false, onSaveTransaction, onDeleteTransaction,
}: CardTransactionGridProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draftAmount, setDraftAmount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueAsNumber = Number(event.target.value);
        setDraftAmount(valueAsNumber);

        const result = minAmoutTransactionSchema.safeParse(valueAsNumber);

        if (!result.success) {
            setError(result.error.errors[0].message);
        } else {
            setError(null);
        }
    };

    return (
        <div className="xl:w-full w-64">
            <ul className="gap-y-0 mt-4 mb-4">
                {loading ? (
                    <li className="px-4 py-8 text-center text-zinc-500">
                        Carregando...
                    </li>
                ) : transactions.length < 1 ? (
                    <li className="px-4 py-8 text-center text-zinc-500">
                        Nenhum registro encontrado.
                    </li>
                ) : (transactions && transactions.map((item, index) => (
                    <div key={item.id} className="w-full">
                        <div className="flex flex-row justify-between items-stretch w-full py-4 px-2 sm:ml-auto sm:mr-auto">

                            {/* Coluna 1: Informações principais */}
                            <div className="flex flex-col gap-2 flex-1">
                                <span className="text-sm font-semibold text-green-600">
                                    {capitalize(getDateName(item.transactionDate))}
                                </span>
                                <span className="text-base font-medium text-zinc-900">
                                    {capitalize(item.type)}
                                </span>
                                {editable && editingId === item.id ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="0.01"
                                            step="0.01"
                                            value={draftAmount || ''}
                                            onChange={handleInputChange}
                                            className="w-28 rounded-md border border-gray-300 px-2 py-1 text-xs font-bold text-zinc-900"
                                        />

                                        {error && <span className="text-[10px] text-red-500 font-medium">{error}</span>}
                                        <button
                                            type="button"
                                            title="Salvar valor"
                                            onClick={() => {
                                                if (onSaveTransaction) {
                                                    onSaveTransaction(item.id, draftAmount);
                                                }
                                                setEditingId(null);
                                            }}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                                            aria-label="Salvar valor"
                                        >
                                            <Check size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <span className={`text-md font-bold ${[TypeTransaction.DEPOSIT.toString(), TypeTransaction.INVESTMENT.toString()].includes(item.type)
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                        }`}>
                                        {(TypeTransaction.DEPOSIT, TypeTransaction.INVESTMENT).includes(item.type)
                                            ? '+'
                                            : '-'}{formatCurrency(item.amount)}
                                    </span>
                                )}
                            </div>

                            {/* Coluna 2: Data e Ações à direita */}
                            <div className="text-right ml-4 flex flex-col items-end justify-between gap-2">
                                <span className="text-xs text-gray-500 font-normal">
                                    {convertDate(item.transactionDate || '')}
                                </span>
                                
                                {/* 3. Área de botões de ação */}
                                {editable && editingId !== item.id && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            title="Editar valor"
                                            onClick={() => {
                                                setEditingId(item.id);
                                                setDraftAmount(item.amount);
                                            }}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#004D61] text-white hover:bg-[#006879] transition"
                                            aria-label="Editar valor"
                                        >
                                            <PencilLine size={14} />
                                        </button>

                                        {/* Botão de Excluir */}
                                        {onDeleteTransaction && (
                                            <button
                                                type="button"
                                                title="Excluir transação"
                                                onClick={() => onDeleteTransaction(item.id)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                                                aria-label="Excluir transação"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {index < transactions.length - 1 && (
                            <hr className="border-none h-px bg-gray-200 mx-2 sm:w-64 sm:ml-auto sm:mr-auto" />
                        )}
                    </div>
                ))
                )}
            </ul>
            {loadingMore && (
                <div className="flex items-center justify-center gap-2 px-4 py-4 text-xs text-zinc-500" role="status" aria-live="polite">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600" aria-hidden="true" />
                    <span>Carregando mais transações...</span>
                </div>
            )}
        </div>
    )
}
