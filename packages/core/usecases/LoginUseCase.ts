import { User } from '../entities/User';
import { AuthRepository } from './../ports/AuthRepository';

export class LoginUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(email: string, password: string): Promise<User> {
        return this.authRepository.login(email, password);
    }    
}