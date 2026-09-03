import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha é obrigatória"),
    confirmPassword: z.string().min(6, "Confirmação da senha é obrigatória")
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'], // Direciona o erro para o campo de confirmação
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;