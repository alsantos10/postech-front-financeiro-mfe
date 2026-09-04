import { TRANSACTION_OPTIONS } from "@dash/core/entities/Transactions";
import { createSlice } from "@reduxjs/toolkit";

const transactionTypeSlice = createSlice({
    name: "transactionTypes",
    initialState: { types: TRANSACTION_OPTIONS },
    reducers: {}
});

export default transactionTypeSlice.reducer;
