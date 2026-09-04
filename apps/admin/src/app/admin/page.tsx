"use client";

import { User } from "@dash/core/entities/User";
import { DataGrid, DataGridColumn } from '@dash/ui-kit/DataGrid';
import { useUsers } from '@/ui/hooks/useUsers';

const columnsGrid: DataGridColumn<User>[] = [
  {key: "id", header: "ID", sortable: false},
  {key: "name", header: "Nome", sortable: true},
  {key: "email", header: "E-mail", sortable: true},
];

export default function UsersPage() {

  const {
    data, loading, error, page, limit, sort, order, term, 
    handlePageChange, handleLimitChange, handleSort, handleSearch
  } = useUsers();

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold text-zinc-900'>
          Usuários
        </h1>
        <p className='mt-1 text-zinc-600'>
          Gerencie os usuários cadastrados no sistema
        </p>
      </div>

      {error && <span className='text-sm text-red-500'>{error}</span>}

      <DataGrid
        columns={columnsGrid}
        data={data?.items || []}
        pagination={{
          page: data?.page || 1,
          limit: data?.limit || limit,
          total: data?.total || 0,
          totalPages: data?.totalPages || 1,
        }}
        loading={loading}
        sort={sort}
        order={order}
        term={term}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        onSort={handleSort}
        onSearch={handleSearch}
        searchPlaceholder="Buscar por nome ou e-mail..."
        keyExtractor={(item) => item.id}
      />
    </div>
  )
}