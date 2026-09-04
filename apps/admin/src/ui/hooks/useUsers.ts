"use client"

import { OrderType } from "@/core/entities/DataGrid";
import { Paginated } from "@/core/entities/Paginated";
import { User } from "@/core/entities/User";
import { ListUsersUseCase } from "@/core/usecases/GetUsersUseCase";
import { NextUserRepository } from "@/infra/repositories/NextUserRepository"
import { useCallback, useEffect, useState } from "react";

const userRepository = new NextUserRepository();
const listUsersUserCase = new ListUsersUseCase(userRepository);

export function useUsers(defaultLimit = 10) {
    const [data, setData] = useState<Paginated<User> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(defaultLimit);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState<OrderType>(OrderType.ASC);
    const [term, setTerm] = useState("");

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await listUsersUserCase.execute({
                page, limit, sort, order, term: term || undefined
            });
            setData(result);
        } catch(error) {    
            setError(error instanceof Error ? error.message : "Erro ao carregar usuários");
        } finally {
            setLoading(false);
        }
    }, [page, limit, sort, order, term]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    function handlePageChange(newPage: number) {
        setPage(newPage);
    }

    function handleLimitChange(newLimit: number) {
        setLimit(newLimit);
        setPage(1);
    }

    function handleSort(newSort: string, newOrder: OrderType) {
        setSort(newSort);
        setOrder(newOrder);
        setPage(1);
    }

    function handleSearch(newTerm: string) {
        setTerm(newTerm);
        setPage(1);
    }

    return {
        data,
        loading,
        error,
        page,
        limit,
        sort,
        order,
        term,
        handlePageChange,
        handleLimitChange,
        handleSort,
        handleSearch,
        refetch: fetchUsers
    }
}

