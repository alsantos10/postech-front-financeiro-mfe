import { Account } from "@dash/core/entities/Account";
import { DataGridPagination, IListDatagridFilters, OrderType } from "@dash/core/entities/DataGrid";
import {
    Transaction,
    TypeInvestment,
    TypeTransaction,
    TypeTransference,
} from "@dash/core/entities/Transactions";
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
    append?: boolean;
}

interface CreateTransactionParams {
    user: User;
    description: string;
    amount: number;
    type: TypeTransaction;
    subtype?: TypeInvestment | TypeTransference;
    page?: number;
    limit?: number;
}

interface DeleteTransactionParams {
    user: User;
    transactionId: string;
}

interface UpdateTransactionParams {
    user: User;
    transactionId: string;
    amount: number;
}

const repository = new NextTransactionRepository();

export const fetchTransactionsAsync = createAsyncThunk(
    "transactions/fetchTransactions",
    async ({ user, append: _append, ...filters }: FetchTransactionsParams) => repository.listTransactions({
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
        transaction.subtype = params.subtype;
        await repository.createTransactionForUser(transaction);
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("balance-updated"));
        }
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

export const updateTransactionAsync = createAsyncThunk(
    "transactions/updateTransaction",
    async ({ user, transactionId, amount }: UpdateTransactionParams, { dispatch }) => {
        await repository.updateTransactionForUser(transactionId, { amount });
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("balance-updated"));
        }
        await dispatch(fetchTransactionsAsync({
            user,
            page: 1,
            limit: 10,
            sort: "",
            order: OrderType.ASC,
            term: "",
            append: false,
        })).unwrap();
    }
);

export const deleteTransactionAsync = createAsyncThunk(
    "transactions/deleteTransaction",
    async ({ user, transactionId }: DeleteTransactionParams, { dispatch }) => {
        await repository.deleteTransactionForUser(user.id, transactionId);
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("balance-updated"));
        }
        await dispatch(fetchTransactionsAsync({
            user,
            page: 1,
            limit: 10,
            sort: "",
            order: OrderType.ASC,
            term: "",
            append: false,
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
        clearError: (state) => { state.error = null; },
        clearTransactions: (state) => {
            state.items = [];
            state.total = 0;
            state.page = 1;
            state.totalPages = 1;
            state.account = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
                state.loading = false;
                const append = action.meta.arg.append === true;
                state.items = append
                    ? [...state.items, ...action.payload.items]
                    : action.payload.items;
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
            })
            .addCase(updateTransactionAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransactionAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateTransactionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao atualizar transação";
            })
            .addCase(deleteTransactionAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransactionAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteTransactionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao excluir transação";
            });
    }
});

export const { setPage, setLimit, clearError, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
