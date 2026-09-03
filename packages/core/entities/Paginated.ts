import { Account } from "./Account";

export interface Paginated<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    account?: Account;
}