import { User } from "./User";

export interface AuthToken {
    token: string;
    user: User;
}