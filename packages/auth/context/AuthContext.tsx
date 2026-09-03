"use client";

import { User } from "@/core/entities/User";
import { NextAuthRepository } from "@/infra/repositories/NextAuthRepository";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string, password: string, passwordConfirm: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);
const authRepository = new NextAuthRepository();

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User|null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        authRepository
            .getProfile()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    },[]);

    const login = useCallback(async (email: string, password: string) => {
        const loggedUser = await authRepository.login(email, password);
        setUser(loggedUser);
    }, []);
    
    const register = useCallback(async (name: string, email: string, password: string) => {
        await authRepository.register(name, email, password);
    }, []);
    
    const logout = useCallback(async () => {
        await authRepository.logout();
        setUser(null);
    }, []);

    const forgotPassword = useCallback(async (email: string, password: string) => {
        await authRepository.forgotPassword(email, password);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user, 
                isAuthenticated: !!user,
                loading,
                login,
                register,
                logout,
                forgotPassword
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth deve ser usado dentro do AuthProvider");
    }
    return context;
}