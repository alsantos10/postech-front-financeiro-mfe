import { UserError } from "@/core/errors/UserError";
import { UserRepository } from "@/core/ports/UserRepository";
import { Paginated } from './../../core/entities/Paginated';
import { User } from "@/core/entities/User";
import { IListDatagridFilters } from "@/core/entities/DataGrid";

export class NextUserRepository implements UserRepository {

    async listUsers(params: IListDatagridFilters): Promise<Paginated<User>> {
        const query = new URLSearchParams();

        if (params.page) query.set("page", String(params.page));
        if (params.limit) query.set("limit", String(params.limit));
        if (params.sort) query.set("sort", String(params.sort));
        if (params.order) query.set("order", String(params.order));
        if (params.term) query.set("term", String(params.term));

        const response = await fetch(`/api/users?${query.toString()}`, {
            cache: "no-store"
        })    
       
        if (!response.ok) {
            const error = await response.json();
            throw new UserError(error.message || "Erro ao listar Usuários");
        }
        return response.json();
    }
}