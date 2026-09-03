import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  PaginationState,
  SortingState,
} from '@tanstack/react-table';

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  rowCount: number
  loading?: boolean
  pagination: PaginationState
  onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>
  sorting: SortingState
  onSortingChange: React.Dispatch<React.SetStateAction<SortingState>>
  inputValue: string
  onInputValueChange: (value: string) => void
}

export function DataTable<TData>({
  columns,
  data,
  rowCount,
  loading = false,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  inputValue,
  onInputValueChange,
}: DataTableProps<TData>) {

  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    rowCount,
  });

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={e => onInputValueChange(e.target.value)}
          placeholder="Pesquisar..."
          className="border p-2 rounded w-full max-w-md text-sm shadow-sm"
        />
      </div>

      {loading && <div className="text-blue-600 mb-2 font-medium text-xs animate-pulse">Sincronizando dados...</div>}

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-3 text-left cursor-pointer select-none hover:bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' && ' 🔼'}
                      {header.column.getIsSorted() === 'desc' && ' 🔽'}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-8 text-gray-400 text-sm">
                  Nenhum registro mapeado nesta exibição.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de Paginação */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div className="flex gap-1">
          <button className="border border-gray-200 rounded p-1 bg-white hover:bg-gray-50 disabled:opacity-40" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
          <button className="border border-gray-200 rounded p-1 bg-white hover:bg-gray-50 disabled:opacity-40" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
          <button className="border border-gray-200 rounded p-1 bg-white hover:bg-gray-50 disabled:opacity-40" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
          <button className="border border-gray-200 rounded p-1 bg-white hover:bg-gray-50 disabled:opacity-40" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>{'>>'}</button>
        </div>
        <span>Página <strong>{table.getState().pagination.pageIndex + 1} de {table.getPageCount()}</strong></span>
      </div>
    </div>
  )
}
