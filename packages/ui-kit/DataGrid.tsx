"use client";

import { DataGridColumn, DataGridProps, OrderType } from "@/core/entities/DataGrid";
import { FormEvent, useState } from "react";
import { Input } from "./Input";
import Button from "./Button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react";
import { TypeTransaction } from "@/core/entities/Transactions";

export function DataGrid<T> ({
    columns,
    data,
    pagination,
    loading = false,
    sort,
    order = OrderType.ASC,
    term = "",
    onPageChange,
    onLimitChange,
    onSort,
    onSearch,
    searchPlaceholder = "Buscar...",
    keyExtractor
}: DataGridProps<T>) {

    const [searchValue, setSearchValue] = useState(term);

    function handleSort(column: DataGridColumn<T>) {
        if (column.sortable || !onSort) {
            return;
        }
        const newOrder = sort === column.key && order === OrderType.ASC ? OrderType.ASC : OrderType.DESC;
        onSort(column.key, newOrder);
    }

    function handleSearchSubmit(event: FormEvent) {
        event.preventDefault();
        onSearch?.(searchValue);
    }

    function renderColor(type: string, item: T) {
        const debitTypes = ["TRANSFERENCIA", "PAGAMENTO"];
        const value = item['type' as keyof T];
        return (debitTypes.includes(value as string)) ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-700';
    }

    const startItem = (pagination.page - 1) * pagination.limit + 1;
    const endItem   = Math.min(startItem + pagination.limit -1, pagination.total);

    return(
        <div className="flex flex-col gap-4">
            {onSearch && (
                <form onSubmit={handleSearchSubmit} className="flex gap-2">
                    <Input
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} className="max-w-sm"
                    />
                    <Button type="submit" variant="secondary">
                        <Search size={18} />
                    </Button>
                </form>
            )}

            <div className="overflow-hidden rounded roudend-lg border border-zinc-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-100">
                        <tr>
                            {columns && columns.map((col)  => (
                                <th 
                                    key={col.key}
                                    className={`tx-4 py-3 font-medium text-zinc-700 ${
                                        col.sortable ? "cursor-pointer select-none" : ""
                                    }`}
                                    style={{width: col.width}}
                                    onClick={() => handleSort(col)}>
                                    <div className="flex items-center gap-1">
                                        {col.header}
                                        {col.sortable && sort === col.key && (
                                            <span className="text-xs">{order === OrderType.ASC ? ">":"<"}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-8 text-center text-zinc-500">
                                    carregando...
                                </td>
                            </tr>
                        ) : data.length < 1 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-8 text-center text-zinc-500">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        ) : (
                            data.map((item) => (
                                <tr key={keyExtractor(item)}
                                    className={`border-t border-zinc-100 hover:bg-zinc-50`}>
                                        {columns.map((col) => (
                                            <td key={col.key} className={`px-4 py-3 ${renderColor(col.key, item)}`}>
                                                {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? "")}
                                            </td>
                                        ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <span className="text-sm text-zinc-600">
                    {pagination.total > 0 ? (
                        <>Mostrando {startItem} a {endItem} de {pagination.total} registro(s)</>
                    ): (
                        "Nenhum registro encontrado"
                    )}
                </span>

                <div className="flex items-center gap-2">
                    {onLimitChange && (
                        <select
                            value={pagination.limit}
                            onChange={(e) => onLimitChange(Number(e.target.value))}
                            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    )}

                    <Button
                        variant="ghost"
                        onClick={() => onPageChange(1)}
                        disabled={pagination.page <= 1}
                        aria-label="Primeira página">
                        <ChevronsLeft size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        aria-label="Primeira anterior">
                        <ChevronLeft size={18} />
                    </Button>
                    <span className="text-sm text-zinc-700">
                        Página {pagination.page} de {pagination.totalPages || 1}
                    </span>
                    <Button
                        variant="ghost"
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        aria-label="Próxima Página">
                        <ChevronRight size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => onPageChange(pagination.totalPages)}
                        disabled={pagination.page >= pagination.totalPages}
                        aria-label="Última Página">
                        <ChevronsRight size={18} />
                    </Button>
                </div>
            </div>
        </div>
    );
}