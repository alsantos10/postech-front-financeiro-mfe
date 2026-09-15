'use client'

import { CardTransactionGrid } from "@dash/ui-kit/CardGrid";
import Modal from "@dash/ui-kit/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/core/stores";
import { fetchTransactionsAsync, updateTransactionAsync, deleteTransactionAsync } from "@/core/features/transactions/transactionSlice";
import { useAuth } from "@/ui/hooks/useAuth";
import { OrderType } from "@dash/core/entities/DataGrid";
import { TypeTransaction } from "@dash/core/entities/Transactions";
import { useEffect, useCallback, useState } from "react";
import { Download, Edit2, Trash2 } from "lucide-react";

interface SidebarTransactionsProps {
  type?: TypeTransaction;
}

export function SidebarTransactions({ type }: SidebarTransactionsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const { items: transactions, loading, error, page, limit, totalPages } = useSelector((state: RootState) => state.transactions);
  const [transactionToDeleteId, setTransactionToDeleteId] = useState<string | null>(null);

  const handleDeleteClick = useCallback((transactionId: string) => {
    setTransactionToDeleteId(transactionId); // Guarda o ID e consequentemente abre o modal
  }, []);

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

  const exportTransactions = useCallback(() => {
    if (!transactions.length) return;

    const csvRows = [
      ['id', 'type', 'description', 'amount', 'transactionDate'],
      ...transactions.map((item) => [
        item.id,
        item.type,
        item.description || '',
        item.amount,
        item.transactionDate || ''
      ])
    ];

    const csvContent = csvRows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'extrato.csv';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [transactions]);

  const saveTransactionAmount = useCallback((transactionId: string, amount: number) => {
    if (!user) return;

    dispatch(updateTransactionAsync({ user, transactionId, amount })).unwrap()
      .then(() => {
        setNotice('Transação atualizada com sucesso!');
      })
      .catch(() => {
        setNotice('Não foi possível atualizar a transação');
      });
  }, [dispatch, user]);

  const deleteTransactionItem = useCallback(() => {
    if (!user || !transactionToDeleteId) return;

    // Se você tiver uma rota ou Thunk de delete configurada no seu Slice, descomente a linha abaixo:
    dispatch(deleteTransactionAsync({ user, transactionId: transactionToDeleteId  })).unwrap()
      .then(() => {
        setNotice('Transação excluída com sucesso!');
      })
      .catch(() => {
        setNotice('Não foi possível excluir a transação');
      })
      .finally(() => {
        // 2. AJUSTE: Limpa o ID para fechar o modal automaticamente após terminar a requisição
        setTransactionToDeleteId(null);
      });
  }, [dispatch, user, transactionToDeleteId]);


  useEffect(() => {
    if (!notice) return;

    const timeoutId = window.setTimeout(() => setNotice(null), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

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
    <aside className="w-full shrink-0 py-0 px-4 md:py-4 md:p-0 md:pr-4 xl:py-6 xl:w-70">
      <section className="w-full md:w-auto items-center p-4 md:p-6 rounded-xl bg-[#F5F5F5] border-t md:border-t-0 md:border-l border-gray-200 flex flex-col gap-4">

        <div className="w-full flex items-center justify-between gap-2">
          <h2 className="text-2xl font-bold">
            Extrato
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              title={editing ? 'Fechar edição' : 'Editar extrato'}
              onClick={() => setEditing(!editing)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${editing ? 'bg-[#006879] text-white' : 'bg-[#004D61] text-white hover:bg-[#006879]'}`}
              aria-label={editing ? 'Fechar edição' : 'Editar extrato'}
            >
              <Edit2 size={18} />
            </button>

            <button
              type="button"
              title="Exportar extrato"
              onClick={exportTransactions}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#004D61] text-white transition hover:bg-[#006879]"
              aria-label="Exportar extrato"
            >
              <Download size={18} />
            </button>
          </div>
        </div>

        <CardTransactionGrid
          transactions={transactions || []}
          loading={loading && transactions.length === 0}
          loadingMore={loading && transactions.length > 0}
          editable={editing}
          onSaveTransaction={saveTransactionAmount}
          onDeleteTransaction={handleDeleteClick}
        />

        {error && (
          <div className="text-xs text-red-500 text-center py-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {notice && (
          <div className="fixed right-4 bottom-4 z-50 rounded-lg bg-[#004D61] px-4 py-3 text-sm font-medium text-white shadow-lg">
            {notice}
          </div>
        )}
      </section>

      <Modal isOpen={!!transactionToDeleteId} onClose={() => setTransactionToDeleteId(null)} title="Excluir transação">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-zinc-600">
            Deseja realmente excluir a transação?
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setTransactionToDeleteId(null)}
              className="rounded-md px-4 py-2 text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={deleteTransactionItem}
              className="rounded-md px-4 py-2 text-sm font-semibold text-white bg-[#004D61] hover:bg-[#006879] transition"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}