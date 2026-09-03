import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@ui/modal";
import { Input } from "../shared/Input";
import Button from "../shared/Button";
import { useAuth } from "@/ui/context/AuthContext";
import { RegisterFormData, registerSchema } from "@/ui/schemas/registerSchema";
import Image from "next/image";
import { InputCheckbox } from "../shared/InputCheckbox";
import { Primary } from "@/stories/Button.stories";

interface RegisterModalProps {
    onClose: () => void;
    onOpenLogin: () => void;
}

export function RegisterModal({
    onClose,
    onOpenLogin
}: RegisterModalProps) {
    const { register: registerUser } = useAuth();
    const [ error, setError ] = useState<string | null>(null);
    const [ success, setSuccess ] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid, isSubmitting},
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange'
    });

    async function onSubmit(data: RegisterFormData) {
        try {
            setError(null);
            setSuccess(null);
            await registerUser(data.name, data.email, data.password);
            setSuccess("Cadastro realizado com sucesso!")
            reset();
            setTimeout(() => {
                onClose();
                onOpenLogin();
                setSuccess(null);
            }, 1500)
        } catch(err) {
            setError(err instanceof Error ? err.message : "Erro ao cadastrar");
        }
    }

    return (
        <Modal onClose={onClose}>
            <div className="flex flex-col items-center p-4">
                <Image src="/IlustraCadastro.svg" alt="Ilustração de Cadastro" width={220} height={220} preload={true} />
            </div>

            <h3 className="text-lg font-medium text-gray-900">
                Preencha os campos abaixo para criar sua conta corrente!
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input 
                    label="Nome" 
                    type="name" 
                    placeholder="Seu Nome" 
                    {...register("name")}
                    error={errors.name?.message} />
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

                <InputCheckbox 
                    label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco." 
                    type="checkbox" 
                    {...register("terms")}
                    error={errors.terms?.message}/>

                
                {success && <span className="text-sm text-green-600">{success}</span>}
                {error && <span className="text-sm text-red-500">{error}</span>}

                <div className="flex justify-center mt-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button type="submit" disabled={isSubmitting || !isValid} variant="orange">
                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}