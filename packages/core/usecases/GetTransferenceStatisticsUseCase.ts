import { TypeTransaction, TypeTransference } from "../entities/Transactions";
import { TransactionRepository } from "../ports/TransactionRepository";

export interface TransactionChartData {
    name: string;
    value: number;
}

export interface TransferenceStatistics {
    total: number;
    data: TransactionChartData[];
}

export class GetTransferenceStatisticsUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async execute(userId: string): Promise<TransferenceStatistics> {
        const limit = 100;
        const firstPage = await this.transactionRepository.listTransactions({
            userId,
            page: 1,
            limit,
            type: TypeTransaction.TRANSFER,
        });
        const pages = [firstPage];

        for (let page = 2; page <= firstPage.totalPages; page += 1) {
            pages.push(await this.transactionRepository.listTransactions({
                userId,
                page,
                limit,
                type: TypeTransaction.TRANSFER,
            }));
        }

        const totals = new Map<TypeTransference, number>();
        for (const transaction of pages.flatMap((result) => result.items)) {
            if (!transaction.subtype) continue;
            const subtype = transaction.subtype as TypeTransference;
            totals.set(subtype, (totals.get(subtype) || 0) + transaction.amount);
        }

        const data = Object.values(TypeTransference).map((subtype) => ({
            name: subtype,
            value: totals.get(subtype) || 0,
        }));

        return {
            total: data.reduce((sum, item) => sum + item.value, 0),
            data,
        };
    }
}
