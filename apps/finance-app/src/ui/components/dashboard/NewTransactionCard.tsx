"use client";

import {
    INVESTMENT_OPTIONS,
    TRANSFERENCE_OPTIONS,
    TypeInvestment,
    TypeTransaction,
    TypeTransference,
} from "@dash/core/entities/Transactions";
import { TransactionFormData, transactionSchema } from "@/ui/schemas/transactionSchema";
import { RootState } from "@/core/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@dash/ui-kit/Input";
import { Select } from "@dash/ui-kit/Select";
import Button from "@dash/ui-kit/Button";
import { useSelector } from "react-redux";

interface NewTransactionCardProps {
    onCreateTransaction: (
        description: string,
        amount: number,
        type: TypeTransaction,
        subtype?: TypeInvestment | TypeTransference,
    ) => Promise<void>
}

export function NewTransactionCard({ onCreateTransaction }: NewTransactionCardProps) {
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema)
    });

    async function onSubmit(data: TransactionFormData) {
        try {
            setError(null);
            await onCreateTransaction(data.description, data.amount, data.type, data.subtype);
            reset({
                type: TypeTransaction.DEPOSIT
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao realizar login");
        }
    }

    const options = useSelector((state: RootState) => state.transactionTypes.types);
    const selectedType = watch("type");
    const subtypeOptions = selectedType === TypeTransaction.INVESTMENT
        ? INVESTMENT_OPTIONS
        : selectedType === TypeTransaction.TRANSFER
            ? TRANSFERENCE_OPTIONS
            : [];

    return (
        <div className="rounded-2xl bg-zinc-300 p-6 mt-3">
            <h2 className="text-lg font-semibold text-zinc-900">Nova transação</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <Input
                    label="Transação"
                    type="text"
                    placeholder="Descrição da transação"
                    {...register("description")}
                    error={errors.description?.message} />

                <Select
                    label="Tipo de Transação"
                    {...register("type")}
                    error={errors.type?.message}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Select>

                {subtypeOptions.length > 0 && (
                    <Select
                        id="subtype"
                        label={selectedType === TypeTransaction.INVESTMENT ? "Tipo de investimento" : "Tipo de transferência"}
                        {...register("subtype")}
                        defaultValue=""
                        error={errors.subtype?.message}
                    >
                        <option value="">Selecione uma opção</option>
                        {subtypeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Select>
                )}

                <Input
                    label="Valor"
                    type="number"
                    placeholder="0,00"
                    {...register("amount", { valueAsNumber: true })}
                    error={errors.amount?.message} />

                {error && <span className="mt-2 text-sm text-red-600">{error}</span>}

                <div className="flex justify-center mt-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button type="submit" disabled={isSubmitting || !isValid} className="p-4 py-3 text-sm font-semibold min-w-[144] rounded-md bg-custom-green text-white shadow-sm hover:bg-custom-green-500 focus:outline-none focus:ring-2 focus:ring-custom-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto disabled:bg-custom-red-900 cursor-pointer">
                        {isSubmitting ? "Entrando..." : "Salvar"}
                    </Button>
                </div>
            </form>
        </div>
    )
}