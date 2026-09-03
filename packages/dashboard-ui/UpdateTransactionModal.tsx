
"use client";

import { TRANSACTION_OPTIONS, TypeTransaction } from "@/core/entities/Transactions";
import Modal from "@/ui/modal";
import { Input } from "../shared/Input";
import { TransactionFormData, transactionSchema } from "@/ui/schemas/transactionSchema";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { findTransactionId, updateTransaction } from "@/infra/api/JsonTransactionService";
import { Button } from "../shared/Button";
import { useAuth } from "@/ui/hooks/useAuth";
import { User } from '../../../core/entities/User';
import { NumericFormat } from "react-number-format";

interface UpdateTransactionProps {
    onClose: () => void;
}

export function UpdateTransactionModal({
    onClose
}: UpdateTransactionProps) {

     const { user } = useAuth();

    const [ error, setError ] = useState<string | null>(null);
    const [ transactionId, setTransactionId ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const notify = () => toast.success("Transação criada com sucesso!")
    const options = TRANSACTION_OPTIONS;

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
        control
    } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            description: "",
            amount: 0,
            type: TypeTransaction.DEPOSIT
        }
    });

    useEffect(() => {
        async function loadTransactionData() {
            try {
                setIsLoading(true);

                const pathname = window.location.pathname;
                const parts = pathname.split('/');
                const transactionId = parts[parts.length - 1];
                
                // Substitua pela sua chamada real de API (ex: axios ou fetch)
                if (!transactionId) {
                    setError("ID da transação inválido")
                }
                setTransactionId(transactionId)
                const data = await findTransactionId(transactionId || null);
                reset({
                    description: data?.description,
                    type: data?.type,
                    amount: data?.amount
                });
            } catch (err) {
                setError("Não foi possível carregar os dados da transação.");
            } finally {
                setIsLoading(false);
            }
        }

        loadTransactionData();
    }, [reset]);
    
    const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
        try {
            setError(null);
            await updateTransaction(transactionId!, data.description, data.amount, data.type, user as User);
            notify();
            reset();
            onClose();
            window.location.href = "/painel/transactions";
        } catch(err) {
            setError(err instanceof Error ? err.message : "Erro ao atualizar transação");
        }
    }
        
    return (
        <Modal title="Atualizar Transação" onClose={onClose}>
            {/* <div className="flex flex-col items-center p-4">
                <Image src="/IlustraCadastro.svg" alt="Ilustração de login" width={220} height={220} preload={true} />
            </div> */}

        <section className="flex flex-col items-center p-4">
            <h3 className="text-lg font-medium text-gray-900 text-center">Editar Transação</h3>

            {/* {isLoading ? ( */}
                {/* <div className="text-center py-4">Carregando dados...</div> */}
            {/* ) : ( */}
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
                    
                    <div className="flex flex-col gap-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Valor
                        </label>
                        <Controller
                            name="amount" // Define o nome do campo aqui
                            control={control}
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                            <NumericFormat
                                className={`mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                value={value === 0 ? "" : value}
                                onBlur={onBlur}
                                getInputRef={ref}
                                // O onValueChange captura o valor numérico limpo e passa para o formulário
                                onValueChange={(values) => onChange(values.floatValue || 0)} 
                                thousandSeparator="."
                                decimalSeparator=","
                                prefix="R$ "
                                decimalScale={2}
                                fixedDecimalScale
                                allowNegative={false}
                                placeholder="R$ 0,00"
                            />
                            )}
                        />
                        {error && <span className="mt-2 text-sm text-red-600">{error}</span>}
                    </div>


                    {error && <span className="mt-2 text-sm text-red-600">{error}</span>}

                    <div className="flex justify-center mt-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <Button type="submit" disabled={isSubmitting} className="p-4 py-3 text-sm font-semibold min-w-[144] rounded-md bg-custom-green text-white shadow-sm hover:bg-custom-green-500 focus:outline-none focus:ring-2 focus:ring-custom-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto disabled:bg-custom-red-900 cursor-pointer">
                            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                        </Button>
                    </div>
                </form>
            {/* // )} */}
            </section>
        </Modal>
    )
}