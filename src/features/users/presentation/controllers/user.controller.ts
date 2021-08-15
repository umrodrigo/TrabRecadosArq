import { Response, Request } from "express";
import { UserEntity } from "../../../../core/infra";
import { HttpRequest, HttpResponse, MvcController } from "../../../../core/presentation";
import { UserRepository } from "../../infra";

export class UserController implements MvcController {
    readonly #repository: UserRepository;
    //injeção de dependencia // usado na rota
    constructor(repository: UserRepository) {
        this.#repository = repository;
    }
    store(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    update(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    delete(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    index(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }
    show(request: HttpRequest): Promise<HttpResponse> {
        throw new Error("Method not implemented.");
    }

    
    
};