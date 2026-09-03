import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@ui/modal";
import { Input } from "../shared/Input";
import Button from "../shared/Button";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../../schemas/forgotPasswordSchema";
import { useAuth } from "@/ui/context/AuthContext";

interface ForgotPasswordModalProps {
    onClose: () => void;
    onOpenLogin: () => void;
}

export function ForgotPasswordModal({onClose, onOpenLogin}: ForgotPasswordModalProps) {
    const { forgotPassword } = useAuth();
    const [ message, setMessage ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    async function onSubmit(data: ForgotPasswordFormData) {
        try {
            setError(null);
            setMessage(null);
            await forgotPassword(data.email, data.password, data.confirmPassword);
            // setMessage("E e-mail estiver cadastrado, enviaremos instruções.")
            setSuccess("Alteração de senha realizada com sucesso!")
            reset();
            setTimeout(() => {
                onClose();
                onOpenLogin();
            }, 1500)

        } catch(err) {
            setError(err instanceof Error ? err.message : "Erro ao recuperar a senha");
        }
    }

    return (
        <Modal onClose={onClose} title="Esqueci a senha">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input 
                    label="E-mail" 
                    type="email" 
                    placeholder="seu@email.com" 
                    {...register("email")}
                    error={errors.email?.message}/>

                 <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="******" 
                    {...register("password")}
                    error={errors.password?.message} />

                 <Input 
                    label="Confirme a Senha" 
                    type="password" 
                    placeholder="******" 
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message} />
                    
                    {success && <span className="text-sm text-green-600">{success}</span>}
                    {message && <span className="text-sm text-green-600">{message}</span>}
                    {error && <span className="text-sm text-red-500">{error}</span>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar"}
                </Button>
            </form>
        </Modal>
    )
}