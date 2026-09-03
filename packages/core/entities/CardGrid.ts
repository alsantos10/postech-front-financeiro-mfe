import { ReactNode } from "react";

export enum OrderType {
    ASC = "asc",
    DESC = "desc",
}

export interface DataGridCard<T> {
    key: string;
    cardHeader?: string;
    cardFooter?: string;
    cardTitle: string;
    cardDescription: string;
    cardDate?: Date;
    cardText?: string;
    width?: string;
    render?: (item: T) => ReactNode;
    sortable?: boolean;
}

export interface DataGridPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface DataGridProps<T> {
    card: DataGridCard<T>;
    data: T[];
    pagination: DataGridPagination;
    loading?: boolean;
    sort?: string;
    order?: OrderType;
    term?: string;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    onSort?: (sort: string, order: OrderType) => void;
    onSearch?: (term: string) => void;
    searchPlaceholder?: string;
    keyExtractor: (item: T) => string;
}

export interface IListDatagridFilters {
    page: number;
    limit: number;
    sort: string;
    order: OrderType;
    term?: string;
}