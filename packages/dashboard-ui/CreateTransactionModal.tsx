
"use client";

import { Transaction, TRANSACTION_OPTIONS } from "@/core/entities/Transactions";
import Modal from "@/ui/modal";
import Image from "next/image";
import { Input } from "../shared/Input";
import { TransactionFormData, transactionSchema } from "@/ui/schemas/transactionSchema";
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTransaction } from "@/infra/api/JsonTransactionService";
import { Button } from "../shared/Button";
import { useAuth } from "@/ui/hooks/useAuth";
import { User } from './../../../core/entities/User';

interface CreateTransactionProps {
    transaction?: Transaction;
    onClose: () => void;
    onCreateTransaction?: (transaction: Transaction) => void;
    onEditTransaction?: (transaction: Transaction) => void;
    onDeleteTransaction?: (transactionId: string) => void;
}

export function CreateTransactionModal({
   transaction,
   onClose,
    onCreateTransaction,
    onEditTransaction,
    onDeleteTransaction
}: CreateTransactionProps) {

    const { user } = useAuth();
    const [ error, setError ] = useState<string | null>(null);
    const notify = () => toast.success("Transação criada com sucesso!")
    const options = TRANSACTION_OPTIONS;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
    });
    
    async function onSubmit(data: TransactionFormData) {
        try {
            setError(null);
            await createTransaction(data.description, data.amount, data.type, user as User);
            notify();
            reset();
            onClose();
            window.location.href = "/painel/transactions";
        } catch(err) {
            setError(err instanceof Error ? err.message : "Erro ao realizar login");
        }
    }

    return (
        <Modal title="Nova Transação" onClose={onClose}>
            {/* <div className="flex flex-col items-center p-4">
                <Image src="/IlustraCadastro.svg" alt="Ilustração de login" width={220} height={220} preload={true} />
            </div> */}

        <section className="flex flex-col items-center p-4">
            <h3 className="text-lg font-medium text-gray-900 text-center">Nova Transação</h3>


            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <Input 
                    label="Transação" 
                    type="text" 
                    placeholder="Descrição da transação" 
                    {...register("description")}
                    error={errors.description?.message} />

                <div className="flex flex-col gap-2">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Tipo de Transação
                    </label>
                    <select
                        {...register("type")}
                        className="border border-gray-300 rounded-md p-2">
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    </div>
                {errors.type && <span className="text-red-500">{errors.type.message}</span>}
                <Input 
                    label="Valor" 
                    type="number" 
                    placeholder="0,00" 
                    {...register("amount", { valueAsNumber: true })}
                    error={errors.amount?.message} />

                {error && <span className="mt-2 text-sm text-red-600">{error}</span>}

                <div className="flex justify-center mt-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button type="submit" disabled={isSubmitting} className="p-4 py-3 text-sm font-semibold min-w-[144] rounded-md bg-custom-green text-white shadow-sm hover:bg-custom-green-500 focus:outline-none focus:ring-2 focus:ring-custom-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto disabled:bg-custom-red-900 cursor-pointer">
                        {isSubmitting ? "Entrando..." : "Salvar"}
                    </Button>
                </div>
            </form>
            </section>
        </Modal>
    )
}