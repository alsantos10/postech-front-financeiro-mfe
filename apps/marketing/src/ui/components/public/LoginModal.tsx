import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/ui/modal";
import { Input } from "../shared/Input";
import Button from "../shared/Button";
import { useAuth } from "@/ui/context/AuthContext";
import { LoginFormData, loginSchema } from "@/ui/schemas/loginSchema";
import Image from "next/image";
import { toast } from "react-toastify";

interface LoginModalProps {
    onClose: () => void;
    onOpenForgotPassword: () => void;
}

export function LoginModal({
    onClose,
    onOpenForgotPassword
}: LoginModalProps) {
    const { login } = useAuth();
    const [ error, setError ] = useState<string | null>(null);
    const notify = () => toast.success("Login realizado com sucesso!")

    const {
        register,
        handleSubmit,
        formState: {errors, isValid, isSubmitting},
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    async function onSubmit(data: LoginFormData) {
        try {
            setError(null);
            await login(data.email, data.password);
            notify();
            reset();
            onClose();
            window.location.href = "/painel";
        } catch(err) {
            setError(err instanceof Error ? err.message : "Erro ao realizar login");
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col items-center p-4">
                <Image src="/IlustraCadastro.svg" alt="Ilustração de login" width={220} height={220} preload={true} />
            </div>

            <h3 className="text-lg font-medium text-gray-900 text-center">Login</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                <Input 
                    label="E-mail" 
                    type="email" 
                    placeholder="seu@email.com" 
                    {...register("email")}
                    error={errors.email?.message} />
                <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="******" 
                    {...register("password")}
                    error={errors.password?.message} />

                {error && <span className="mt-2 text-sm text-red-600">{error}</span>}
                    
                <div className="flex flex-row">
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            onOpenForgotPassword()
                        }}
                        className="font-medium cursor-pointer text-custom-green underline hover:text-custom-green-500">
                        Esqueci a senha
                    </button>
                </div>

                <div className="flex justify-center mt-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button type="submit" disabled={isSubmitting || !isValid} className="p-4 py-3 text-sm font-semibold min-w-[144] rounded-md bg-custom-green text-white shadow-sm hover:bg-custom-green-500 focus:outline-none focus:ring-2 focus:ring-custom-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto disabled:bg-custom-red-900 cursor-pointer">
                        {isSubmitting ? "Entrando..." : "Acessar"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}