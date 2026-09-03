import { User } from "../entities/User";

export interface AuthRepository {
    login(email: string, password: string): Promise<User>;
    register(name: string, email: string, password: string): Promise<User>;
    logout(): Promise<void>;
    forgotPassword(email: string, newPassword: string): Promise<void>;
    getProfile(): Promise<User>;
}