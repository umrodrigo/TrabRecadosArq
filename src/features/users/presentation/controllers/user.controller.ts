import { HttpRequest, HttpResponse, MvcController, notFound, ok, serverError } from "../../../../core/presentation";
import { UserRepository } from "../../infra";

export class UserController implements MvcController {
    readonly #repository: UserRepository;
    //injeção de dependencia // usado na rota
    constructor(repository: UserRepository) {
        this.#repository = repository;
    };
    async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const user = await this.#repository.create(request.body);
            return ok(user);
        } catch (error) {
            return serverError();
        };
    };
    async update(request: HttpRequest): Promise<HttpResponse> {
        try {
            const id = request.params;
            const user = await this.#repository.updateUser(id, request.body);
            return ok(user);
        } catch (error) {
            return serverError();
        }
    };
    async delete(request: HttpRequest): Promise<HttpResponse> {
        try {
            const id = request.params;
            const user = await this.#repository.deleteUser(id);
            return ok(user)
        } catch (error) {
            return serverError();
        }
    };
    async index(request: HttpRequest): Promise<HttpResponse> {
        try {
            const users = await this.#repository.getUsers();

            if (users.length === 0) return notFound(new Error());

            return ok(users);
        } catch (error) {
            return serverError();
        }
    };
    async show(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params;
        try {          
            const user = await this.#repository.getUser(id);
            if (!user) return notFound(new Error());

            return ok(user);
        } catch (error) {
            return serverError();
        }
    };
};