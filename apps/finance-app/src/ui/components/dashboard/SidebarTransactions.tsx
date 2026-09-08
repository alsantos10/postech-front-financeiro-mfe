'use client'

import { CardTransactionGrid } from "@dash/ui-kit/CardGrid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/core/stores";
import { fetchTransactionsAsync } from "@/core/features/transactions/transactionSlice";
import { useAuth } from "@/ui/hooks/useAuth";
import { OrderType } from "@dash/core/entities/DataGrid";
import { TypeTransaction } from "@dash/core/entities/Transactions";
import { useEffect, useCallback } from "react";


interface SidebarTransactionsProps {
  type?: TypeTransaction;
}

export function SidebarTransactions({ type }: SidebarTransactionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { items: transactions, loading, error, page, limit, totalPages } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    if (user) {
      dispatch(fetchTransactionsAsync({
        user,
        page: 1,
        limit: 10,
        sort: "",
        order: OrderType.ASC,
        term: "",
        type,
        append: false,
      }));
    }
  }, [dispatch, user, type]);

  const loadMore = useCallback(() => {
    if (!user || loading || page >= totalPages) return;

    dispatch(fetchTransactionsAsync({
      user,
      page: page + 1,
      limit,
      sort: "",
      order: OrderType.ASC,
      term: "",
      type,
      append: true,
    }));
  }, [dispatch, limit, loading, page, totalPages, type, user]);

  useEffect(() => {
    function handleWindowScroll() {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition >= documentHeight - 200) {
        loadMore();
      }
    }

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, [loadMore]);

  return (
    <aside className="w-full shrink-0 xl:py-6 pr-4 xl:w-70">
      <section className="w-full md:w-auto items-center p-4 md:p-6 rounded-xl bg-[#F5F5F5] border-t md:border-t-0 md:border-l border-gray-200 flex flex-col gap-4">

        <h2 className="text-2xl font-bold">
          Extrato
        </h2>

        {/* 1. Componente Grid de Transações solicitado */}
        <CardTransactionGrid
          transactions={transactions || []}
            loading={loading && transactions.length === 0}
            loadingMore={loading && transactions.length > 0}
        />

        {/* Exibição de Erro Amigável na UI se necessário */}
        {error && (
          <div className="text-xs text-red-500 text-center py-2 bg-red-50 rounded">
            {error}
          </div>
        )}
      </section>
    </aside>
  );
}