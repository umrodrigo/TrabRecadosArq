import { UserEntity } from "../../../../core/infra";
import { badRequest, HttpRequest, HttpResponse, Middleware, MissingParamError, ok } from "../../../../core/presentation";
import { User } from "../../domain";

export class UserPasswordMiddleware implements Middleware{
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const user: User = request.body;
        
        if (!user.password) {
            return badRequest(new MissingParamError('A senha deve ser informada.'));
        }
        if (user.password.trim().length < 4) {
            return badRequest(new MissingParamError('A senha deve conter ao menos 4 caracteres.'));
        }
        if (user.password !== user.password2) {
            return badRequest(new MissingParamError('As senhas não coincidem, tente novamente.'));
        }
        
        return ok({});
    }
}

export class UserIdMiddleware implements Middleware{
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const { id }: User = request.params;
        const user = await UserEntity.findOne(id);
        if (!user) return badRequest(new MissingParamError('Usuário não encontrado.'));        
        return ok({});
    }
}

export class UserUsernameMiddleware implements Middleware{
    async handle(request: HttpRequest): Promise<HttpResponse> {
        const user: User = request.body;
        
        if (!user.username) {
            return badRequest(new MissingParamError('O nome de usuário deve ser informado.'));
        };
        if (user.username.trim().length <= 3) {
            return badRequest(new MissingParamError('Usuário deve conter ao menos 3 caracteres.'));
        }
        let userReal = await UserEntity.findOne({
            where: {
              username: user.username,
            },
        });
        if (userReal) {      
            return badRequest(new MissingParamError('Usuário existente, tente novamente.'));
        };        
        return ok({});
    }
}