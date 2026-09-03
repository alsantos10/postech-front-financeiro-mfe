import { Transaction } from "./Transactions";
import { User } from "./User";

export class UserTransaction extends Transaction {
    user: User;
    
    constructor(user: User) {
        super();
        this.user = user;
    }
}

export class UserTransactions {
    user: User;
    transactions: Transaction[];

    constructor(user: User) {
        this.user = user;
        this.transactions = [];
    }
}