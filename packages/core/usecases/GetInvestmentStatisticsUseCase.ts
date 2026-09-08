import { TypeInvestment, TypeTransaction } from "../entities/Transactions";
import { TransactionRepository } from "../ports/TransactionRepository";
import { TransactionChartData } from "./GetTransferenceStatisticsUseCase";

export interface InvestmentStatistics {
    total: number;
    data: TransactionChartData[];
}

export class GetInvestmentStatisticsUseCase {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async execute(userId: string): Promise<InvestmentStatistics> {
        const limit = 100;
        const firstPage = await this.transactionRepository.listTransactions({
            userId,
            page: 1,
            limit,
            type: TypeTransaction.INVESTMENT,
        });
        const pages = [firstPage];

        for (let page = 2; page <= firstPage.totalPages; page += 1) {
            pages.push(await this.transactionRepository.listTransactions({
                userId,
                page,
                limit,
                type: TypeTransaction.INVESTMENT,
            }));
        }

        const totals = new Map<TypeInvestment, number>();
        for (const transaction of pages.flatMap((result) => result.items)) {
            if (!transaction.subtype) continue;
            const subtype = transaction.subtype as TypeInvestment;
            totals.set(subtype, (totals.get(subtype) || 0) + transaction.amount);
        }

        const data = Object.values(TypeInvestment).map((subtype) => ({
            name: subtype,
            value: totals.get(subtype) || 0,
        }));

        return {
            total: data.reduce((sum, item) => sum + item.value, 0),
            data,
        };
    }
}
