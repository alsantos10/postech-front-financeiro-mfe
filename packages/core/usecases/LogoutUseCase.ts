import { AuthRepository } from './../ports/AuthRepository';

export class LogoutUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(): Promise<void> {
        return this.authRepository.logout();
    }    
}