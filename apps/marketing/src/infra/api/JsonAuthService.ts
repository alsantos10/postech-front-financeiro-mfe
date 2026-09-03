import { AuthError } from "@/core/errors/AuthError";
import { User } from "@/core/entities/User";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

export interface JsonUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

export async function findUserByEmail(email: string): Promise<JsonUser | null> {
    const response = await fetch(`${JSON_SERVER_URL}/users?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
        throw new AuthError("Erro ao consultar usuário");
    }
    const users: JsonUser[] = await response.json();
    return users[0] || null;
}

export async function createUser(name: string, email: string, password: string): Promise<User> {
    const response = await fetch(`${JSON_SERVER_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
    });

    if(!response.ok) {
        throw new AuthError("Erro ao criar usuário");
    }
    const user: JsonUser = await response.json();
    return { id: user.id, name: user.name, email: user.email };
}

export async function updatePassword(user: User, password: string): Promise<User> {
    const response = await fetch(`${JSON_SERVER_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
    });

    if(!response.ok) {
        throw new AuthError("Erro ao atualizar senha");
    }
    const userRes: JsonUser = await response.json();
    return { id: userRes.id, name: userRes.name, email: userRes.email };
}

export function validationPassword(inputPass: string, storedPass: string): boolean {
    return inputPass === storedPass;
}