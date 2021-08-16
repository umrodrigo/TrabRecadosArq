import { HttpRequest, HttpResponse, MvcController, notFound, ok, serverError } from "../../../../core/presentation";
import { NoteRepository } from "../../infra";

export class NoteController implements MvcController {
    readonly #repository: NoteRepository;
    //injeção de dependencia // usado na rota
    constructor(repository: NoteRepository) {
        this.#repository = repository;
    }
    async store(request: HttpRequest): Promise<HttpResponse> {
        try {
            const note = await this.#repository.create(request.params, request.body);
            return ok(note);
        } catch (error) {
            return serverError();
        };
    };
    async update(request: HttpRequest): Promise<HttpResponse> {
        try {
            const id = request.params;
            const note = await this.#repository.updateNote(id, request.body)
            return ok(note);
        } catch (error) {
            return serverError();
        };
    };
    async delete(request: HttpRequest): Promise<HttpResponse> {        
        try {
            const note = await this.#repository.noteDelete(request.body);
            return ok(note)
        } catch (error) {
            return serverError();
        };
    };
    async index(request: HttpRequest): Promise<HttpResponse> {
        try {
            const notes = await this.#repository.getNotes();

            if (notes.length === 0) return notFound(new Error());

            return ok(notes);
        } catch (error) {
            return serverError();
        }
    }
    async show(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = request.params;

            const note = await this.#repository.getUserNotes(id);
            if (!note) return notFound(new Error());

            return ok(note);
        } catch (error) {
            return serverError();
        }
    }
}