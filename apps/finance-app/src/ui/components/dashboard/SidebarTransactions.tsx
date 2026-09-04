'use client'

import { CardTransactionGrid } from "../shared/CardGrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/core/stores";
import { fetchTransactionsAsync } from "@/core/features/transactions/transactionSlice";
import { useAuth } from "@/ui/hooks/useAuth";
import { OrderType } from "@/core/entities/DataGrid";
import { useEffect } from "react";


export function SidebarTransactions() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { items: transactions, loading, error, page, limit } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    if (user) {
      dispatch(fetchTransactionsAsync({
        user,
        page: 1,
        limit: 10,
        sort: "",
        order: OrderType.ASC,
        term: ""
      }));
    }
  }, [dispatch, user]);

  return (
    <aside className="w-full md:w-auto items-center p-4 md:p-6 rounded-xl bg-[#F5F5F5] border-t md:border-t-0 md:border-l border-gray-200 flex flex-col gap-4">

      <h2 className="text-2xl font-bold">
        Extrato
      </h2>

      {/* 1. Componente Grid de Transações solicitado */}
      <CardTransactionGrid
        transactions={transactions || []}
        loading={loading}
      />

      {/* Exibição de Erro Amigável na UI se necessário */}
      {error && (
        <div className="text-xs text-red-500 text-center py-2 bg-red-50 rounded">
          {error}
        </div>
      )}
    </aside>
  );
}