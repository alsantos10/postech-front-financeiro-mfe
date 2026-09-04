import { Account } from "@dash/core/entities/Account";
import { DataGridPagination, IListDatagridFilters, OrderType } from "@dash/core/entities/DataGrid";
import { Transaction, TypeTransaction } from "@dash/core/entities/Transactions";
import { Paginated } from "@dash/core/entities/Paginated";
import { User } from "@dash/core/entities/User";
import { UserTransaction } from "@dash/core/entities/UserTransactions";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NextTransactionRepository } from "@/infra/repositories/NextTransactionRepository";

interface TransactionsState extends DataGridPagination {
    items: Transaction[];
    loading: boolean;
    error: string | null;
    account: Account | null;
}

interface FetchTransactionsParams extends IListDatagridFilters {
    user: User;
}

interface CreateTransactionParams {
    user: User;
    description: string;
    amount: number;
    type: TypeTransaction;
    page?: number;
    limit?: number;
}

const repository = new NextTransactionRepository();

export const fetchTransactionsAsync = createAsyncThunk(
    "transactions/fetchTransactions",
    async ({ user, ...filters }: FetchTransactionsParams) => repository.listTransactions({
        ...filters,
        userId: user.id
    })
);

export const createTransactionAsync = createAsyncThunk(
    "transactions/createTransaction",
    async (params: CreateTransactionParams, { dispatch }) => {
        const transaction = new UserTransaction(params.user);
        transaction.description = params.description;
        transaction.amount = params.amount;
        transaction.type = params.type;
        await repository.createTransactionForUser(transaction);
        await dispatch(fetchTransactionsAsync({
            user: params.user,
            page: params.page || 1,
            limit: params.limit || 10,
            sort: "",
            order: OrderType.ASC,
            term: ""
        })).unwrap();
    }
);

const initialState: TransactionsState = {
    items: [], loading: false, error: null, total: 0,
    page: 1, limit: 10, totalPages: 1, account: null
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => { state.page = action.payload; },
        setLimit: (state, action: PayloadAction<number>) => { state.limit = action.payload; },
        clearError: (state) => { state.error = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsAsync.fulfilled, (state, action: PayloadAction<Paginated<UserTransaction>>) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
                state.account = action.payload.account || null;
            })
            .addCase(fetchTransactionsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao carregar transações";
            })
            .addCase(createTransactionAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransactionAsync.fulfilled, (state) => { state.loading = false; })
            .addCase(createTransactionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao criar transação";
            });
    }
});

export const { setPage, setLimit, clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
