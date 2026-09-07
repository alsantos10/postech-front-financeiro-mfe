import {
    INVESTMENT_OPTIONS,
    TRANSACTION_OPTIONS,
    TRANSFERENCE_OPTIONS,
    TypeInvestment,
    TypeTransaction,
    TypeTransference,
} from "@dash/core/entities/Transactions";
import { z } from "zod";

const investmentSubtypes = z.enum(INVESTMENT_OPTIONS);
const transferenceSubtypes = z.enum(TRANSFERENCE_OPTIONS);

export const transactionSchema = z
    .object({
        description: z.string().min(2, "Descrição deve conter no mínimo 2 caracteres"),
        amount: z
            .number({ message: "O valor deve ser um número" })
            .positive("O valor deve ser maior que ZERO"),
        type: z.enum(TRANSACTION_OPTIONS),
        subtype: z.union([investmentSubtypes, transferenceSubtypes]).optional(),
    })
    .superRefine((data, context) => {
        if (data.type === TypeTransaction.INVESTMENT && !INVESTMENT_OPTIONS.includes(data.subtype as TypeInvestment)) {
            context.addIssue({ code: "custom", path: ["subtype"], message: "Selecione o tipo de investimento" });
        }

        if (data.type === TypeTransaction.TRANSFER && !TRANSFERENCE_OPTIONS.includes(data.subtype as TypeTransference)) {
            context.addIssue({ code: "custom", path: ["subtype"], message: "Selecione o tipo de transferência" });
        }
    });

// Use z.input para capturar os tipos antes da transformação (amount como string)
export type TransactionFormData = z.input<typeof transactionSchema>;

// Use z.output para o tipo final que vai para a API (amount como number)
// export type TransactionFormOutput = z.output<typeof transactionSchema>;
