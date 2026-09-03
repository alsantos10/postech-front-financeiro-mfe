import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Nome deve conter no mínimo 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter no mínomo 6 caracteres"),
    terms: z.boolean().refine((val) => val === true, "Você precisa aceitar os termos e condições.")
});

export type RegisterFormData = z.infer<typeof registerSchema>;