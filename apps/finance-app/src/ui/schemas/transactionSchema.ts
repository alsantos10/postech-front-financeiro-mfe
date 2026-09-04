import { TRANSACTION_OPTIONS, TypeTransaction } from "@/core/entities/Transactions";
import { z } from "zod";

export const transactionSchema = z.object({
    description: z.string().min(2, "Descrição deve conter no mínimo 2 caracteres"),
    amount: z
        .number({message: "O valor deve ser um número" })
        .positive("O valor deve ser maior que ZERO"),
    // .string()
    // .refine((val) => val !== '', {message: "O valor é obrigatório"})
    // .transform((val) => parseFloat(val))
    // .refine((val) => val > 0, {message: "O valor deve ser maior que ZERO"}),
    type: z.enum(TRANSACTION_OPTIONS)
});

// Use z.input para capturar os tipos antes da transformação (amount como string)
export type TransactionFormData = z.input<typeof transactionSchema>;

// Use z.output para o tipo final que vai para a API (amount como number)
// export type TransactionFormOutput = z.output<typeof transactionSchema>;
