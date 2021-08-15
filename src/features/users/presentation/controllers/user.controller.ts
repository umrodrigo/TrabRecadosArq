import { UserEntity } from "../../../../core/infra";
import { HttpRequest, HttpResponse, MvcController, notFound, ok, serverError } from "../../../../core/presentation";
import { UserRepository } from "../../infra";

export class UserController implements MvcController {
    readonly #repository: UserRepository;
    //injeção de dependencia // usado na rota
    constructor(repository: UserRepository) {
        this.#repository = repository;
    }
    async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const user = await this.#repository.create(request.body);
            return ok(user);
        } catch (error) {
            return serverError();
        };
    };
    update(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    delete(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    async index(request: HttpRequest): Promise<HttpResponse> {
        try {
            const users = await this.#repository.getUsers();

            if (users.length === 0) return notFound(new Error());

            return ok(users);
        } catch (error) {
            return serverError();
        }
    }
    async show(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = request.params;

            const user = await this.#repository.getUser(id);
            if (!user) return notFound(new Error());

            return ok(user);
        } catch (error) {
            return serverError();
        }
    }

    
    
};