export interface User {
    id: string;
    name: string;
    email: string;
}

export class AuthUser {
    id?: string | undefined;
    name: string;
    email: string;
    password: string;

    constructor() {
        this.id = "";
        this.name = "";
        this.email = "";
        this.password = "";
    }
}