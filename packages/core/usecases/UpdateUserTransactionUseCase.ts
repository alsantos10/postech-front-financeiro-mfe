import { Transaction, TypeTransaction } from "../entities/Transactions";
import { TransactionRepository } from "../ports/TransactionRepository";

export class UpdateUserTransactionUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}
    
    async execute(transactionId: string, amount: number, type: TypeTransaction, description: string): Promise<Transaction> {
        return this.transactionRepository.updateTransactionForUser(transactionId, { amount, type, description });
    }
}