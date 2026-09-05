import { User } from "@dash/core/entities/User";
import { AuthError } from "@dash/core/errors/AuthError";
import { AuthRepository } from "@dash/core/ports/AuthRepository";

export class NextAuthRepository implements AuthRepository {

    async login(email: string, password: string): Promise<User> {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new AuthError(error.message || "Credenciais inválidas");
        }
        const { user } = await response.json();
        console.log("NextAuthRepository login response user:", user);
        return user;
    }

    async register(name: string, email: string, password: string): Promise<User> {
         const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, email, password})
        });
        if (!response.ok) {
            const error = await response.json();
            throw new AuthError(error.message || "Erro ao cadastrar");
        }
        return response.json();
    }

    async logout(): Promise<void> {
        await fetch("/api/auth/logout", {method: "POST"});
    }

    async forgotPassword(email: string, password: string): Promise<void> {
         const response = await fetch("/api/auth/forgot-password", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password})
        });
        if (!response.ok) {
            const error = await response.json();
            throw new AuthError(error.message || "Erro ao atualizar a senha");
        }
    }

    async getProfile(): Promise<User> {
        const response = await fetch("/api/auth/profile");
        if (!response.ok) {
            const error = await response.json();
            throw new AuthError(error.message || "Erro ao buscar perfil");
        }
        return response.json();
    }

}