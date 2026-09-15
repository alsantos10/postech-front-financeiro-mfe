import { z } from 'zod';

export const minAmoutTransactionSchema = z
    .number("Por favor, insira um número válido")
    .positive("O valor deve ser maior que zero") // Garante que é positivo (> 0)
    .gte(0.01, "O valor mínimo é R$ 0,01");