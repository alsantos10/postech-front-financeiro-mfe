import { User } from '../entities/User';
import { AuthRepository } from './../ports/AuthRepository';

export class GetProfileUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(): Promise<User> {
        return this.authRepository.getProfile();
    }    
}