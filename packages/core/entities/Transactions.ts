import { User } from "./User";

export enum TypeTransaction {
    DEPOSIT =  "DEPOSITO", 
    TRANSFER = "TRANSFERENCIA", 
    INVESTMENT = "INVESTIMENTO",
    PAYMENT = "PAGAMENTO",
}

export class Transaction {
    id: string;
    type: TypeTransaction;
    amount: number;
    description: string;
    transactionDate: Date;
    user: User | null;

    constructor(user: User | null = null) {
        this.id = "";
        this.user = user;
        this.type = TypeTransaction.DEPOSIT;
        this.amount = 0;
        this.description = "";
        this.transactionDate = new Date();
    }
}

export const TRANSACTION_OPTIONS = [
    TypeTransaction.DEPOSIT, 
    TypeTransaction.TRANSFER, 
    TypeTransaction.INVESTMENT, 
    TypeTransaction.PAYMENT
];