import { AuthRepository } from "../ports/AuthRepository";

export class ForgotPasswordUseCase {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(email: string, newPassword: string): Promise<void> {
        return this.authRepository.forgotPassword(email, newPassword);
    }
}