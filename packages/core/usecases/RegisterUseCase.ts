import { User } from '../entities/User';
import { AuthRepository } from './../ports/AuthRepository';

export class RegisterUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(name: string, email: string, password: string): Promise<User> {
        return this.authRepository.register(name, email, password);
    }    
}