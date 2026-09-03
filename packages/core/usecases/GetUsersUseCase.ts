import { ListUsersParams, UserRepository } from '../ports/UserRepository';
import { Paginated } from '../entities/Paginated';
import { User } from '../entities/User';

export class ListUsersUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(params: ListUsersParams): Promise<Paginated<User>> {
        return this.userRepository.listUsers(params);
    }    
}