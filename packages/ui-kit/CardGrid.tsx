import { Transaction, TypeTransaction } from "@/core/entities/Transactions"
import { formatCurrency } from "@/shared/formatting/currency";
import { convertDate, getDateName } from '@/shared/formatting/convertDate';
import { capitalize } from "@/shared/formatting/capitalize";

export interface CardTransactionGridProps {
    transactions: Transaction[],
    loading: boolean;
}

export function CardTransactionGrid({
    transactions, loading,
}: CardTransactionGridProps) {

    return (

        <ul className="w-full gap-y-0 mt-4 mb-4">
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
                    {/* Container do Item */}
                    <div className="flex flex-row justify-between items-start w-full py-4 px-2 sm:w-64 sm:ml-auto sm:mr-auto">

                        {/* Coluna 1: Informações principais */}
                        <div className="flex flex-col gap-2 flex-1">
                            <span className="text-sm font-semibold text-green-600">
                                {capitalize(getDateName(item.transactionDate))}
                            </span>
                            <span className="text-base font-medium text-zinc-900">
                                {capitalize(item.type)}
                            </span>
                            <span className={`text-lg font-bold ${item.type === TypeTransaction.DEPOSIT
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}>
                                {item.type === TypeTransaction.DEPOSIT
                                    ? '+'
                                    : '-'}{formatCurrency(item.amount)}
                            </span>
                        </div>

                        {/* Coluna 2: Data à direita */}
                        <div className="text-right ml-4">
                            <span className="text-xs text-gray-500 font-normal">
                                {convertDate(item.transactionDate || '')}
                            </span>
                        </div>
                    </div>

                    {/* Linha divisória: renderiza apenas entre os itens (não exibe após o último) */}
                    {index < transactions.length - 1 && (
                        <hr className="border-none h-px bg-gray-200 mx-2 sm:w-64 sm:ml-auto sm:mr-auto" />
                    )}
                </div>
            ))
            )}
        </ul>
    )
}