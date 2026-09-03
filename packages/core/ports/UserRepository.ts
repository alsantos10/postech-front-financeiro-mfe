import { OrderType } from "../entities/DataGrid";
import { Paginated } from './../entities/Paginated';
import { User } from "../entities/User";

export interface ListUsersParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: OrderType;
    term?: string;
}

export interface UserRepository {
    listUsers(params: ListUsersParams): Promise<Paginated<User>>;
}