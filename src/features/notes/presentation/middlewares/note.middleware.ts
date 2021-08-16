import { badRequest, HttpRequest, HttpResponse, Middleware, MissingParamError, ok } from "../../../../core/presentation";
import { Note } from "../../domain";

export class NoteMiddleware implements Middleware {
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const description: Note = request.body;
        if (!description) {
            return badRequest(new MissingParamError('A descrição não pode estar em branco.'));                       
        };
        return ok({})
    };
};