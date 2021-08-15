import { UserEntity } from "../../../../core/infra";
import { User } from "../../domain";


export class UserRepository {
    async create(params: User): Promise<User> {
        const { username, password  } = params;
        const user = await UserEntity.create({
            username,
            password,
        }).save();
        return Object.assign({}, params, user);
    };
    async getUser(id: string): Promise<User | undefined> {
        const user = await UserEntity.findOne(id);
        if (!user) return undefined;
        return {
            id: user.id,
            username: user.username,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
    async getUsers(): Promise<User[]> {
        const users = await UserEntity.find();
        return users.map(
            (user) => 
                ({            
                    id: user.id,
                    username: user.username,
                    password: user.password,
                    createdAt: user.createdAt,  
                } as User)
        );
    };
    async login(): Promise<void> {}
    async updateUser(): Promise<void> {}
    async deleteUser(): Promise<void> {}
}