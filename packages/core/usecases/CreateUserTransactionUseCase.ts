import { Transaction, TypeTransaction } from '../entities/Transactions';
import { TransactionRepository } from '../ports/TransactionRepository';

export class CreateUserTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async execute(amount: number, type: TypeTransaction, description: string): Promise<Transaction> {
        return this.transactionRepository.createTransactionForUser({ amount, type, description });
    }
}