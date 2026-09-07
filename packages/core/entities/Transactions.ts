import { User } from "./User";

export enum TypeTransaction {
    DEPOSIT =  "DEPOSITO", 
    TRANSFER = "TRANSFERENCIA", 
    INVESTMENT = "INVESTIMENTO",
    PAYMENT = "PAGAMENTO",
}

export enum TypeInvestment {
    INVESTMENT_FUNDS = "Fundos de investimento",
    TREASURY_BONDS = "Tesouro Direto",
    PRIVATE_PENSION = "Previdência Privada",
    STOCK_EXCHANGE = "Bolsa de Valores",
}

export enum TypeTransference {
    PIX = "PIX",
    DOC = "DOC",
    TED = "TED",
}

export type TransactionType = TypeTransaction | TypeInvestment | TypeTransference;

export class Transaction {
    id: string;
    type: TransactionType;
    subtype?: TypeInvestment | TypeTransference;
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

export class Investment extends Transaction {
    declare type: TypeInvestment;

    constructor(
        type: TypeInvestment = TypeInvestment.INVESTMENT_FUNDS,
        user: User | null = null,
    ) {
        super(user);
        this.type = type;
    }
}

export class Transference extends Transaction {
    declare type: TypeTransference;

    constructor(
        type: TypeTransference = TypeTransference.PIX,
        user: User | null = null,
    ) {
        super(user);
        this.type = type;
    }
}

export const TRANSACTION_OPTIONS: TypeTransaction[] = [
    TypeTransaction.DEPOSIT, 
    TypeTransaction.TRANSFER, 
    TypeTransaction.INVESTMENT, 
    TypeTransaction.PAYMENT
];

export const INVESTMENT_OPTIONS: TypeInvestment[] = [
    TypeInvestment.INVESTMENT_FUNDS,
    TypeInvestment.TREASURY_BONDS,
    TypeInvestment.PRIVATE_PENSION,
    TypeInvestment.STOCK_EXCHANGE,
];

export const TRANSFERENCE_OPTIONS: TypeTransference[] = [
    TypeTransference.PIX,
    TypeTransference.DOC,
    TypeTransference.TED,
];