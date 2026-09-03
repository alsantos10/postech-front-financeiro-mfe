import { Paginated } from '../entities/Paginated';
import { UserTransaction } from '../entities/UserTransactions';
import { ListTransactionsParams, TransactionRepository } from '../ports/TransactionRepository';

export class ListUserTransactionsUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async execute(params: ListTransactionsParams): Promise<Paginated<UserTransaction>> {
        return this.transactionRepository.listTransactions(params);
    }    
}