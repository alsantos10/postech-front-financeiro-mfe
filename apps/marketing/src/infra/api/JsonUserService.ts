import { IListDatagridFilters, OrderType } from "@/core/entities/DataGrid";
import { User } from "@/core/entities/User";
import { UserError } from "@/core/errors/UserError";
import { Paginated } from "@/core/entities/Paginated";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

export interface JsonUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

function compareValues(a: string, b: string, order?: OrderType) {
    const comparizon = a.localeCompare(b, undefined, {sensitivity: "base"});
    return order === OrderType.ASC ? comparizon : -comparizon;
} 

export async function fetchUsers(filters: IListDatagridFilters): Promise<Paginated<User>> {
    const { page, limit, sort, order, term } = filters;
    
    const response = await fetch(`${JSON_SERVER_URL}/users`, {cache: "no-store"});
    if (!response.ok) {
        throw new UserError("Erro ao buscar usuários");
    }
    
    const body = await response.json();
    const allUsers: JsonUser[] = Array.isArray(body) ? body : body.value || [];
    
    const normalizedTerm = term?.trim().toLowerCase();
    const filtered = normalizedTerm ?
    allUsers.filter(
        (user) => 
                user.name?.toLowerCase().includes(normalizedTerm) || user.email?.toLowerCase().includes(normalizedTerm)
        ) : allUsers;

    const sorted = [...filtered].sort((a, b) => {
        const valueA = String(a[sort as keyof JsonUser] ?? "").toLowerCase();
        const valueB = String(b[sort as keyof JsonUser] ?? "").toLowerCase();
        return compareValues(valueA, valueB, order)
    })
    
    // Read the total count to calculate total pages
    const total = sorted.length; 
    const startIndex = (page - 1) * limit; 
    const paginated = sorted.slice(startIndex, startIndex + limit);

    return { 
        items: paginated.map((user) => ({id: user.id, name: user.name, email: user.email})),
        total, page, limit, totalPages: Math.ceil(total/limit) || 1
    };
}