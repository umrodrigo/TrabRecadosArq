import { Router } from 'express';
import { middlewareAdapter, routeMvcAdapter, TypeActionMvc } from '../../../../core/presentation';
import { UserIdMiddleware } from '../../../users/presentation/middlewares';
import { NoteRepository } from '../../infra';
import { NoteController } from '../controllers';
import { NoteMiddleware } from '../middlewares';

const makeControler = () => { // factory Method
    const repository  =new NoteRepository();
    return new NoteController(repository);
}

export default class NoteRoutes {
    public init(router: Router) {

        router.post('/note/:id', middlewareAdapter(new NoteMiddleware()), middlewareAdapter(new UserIdMiddleware()), routeMvcAdapter(makeControler(), TypeActionMvc.STORE)); // id do user
        router.get('/note', routeMvcAdapter(makeControler(), TypeActionMvc.INDEX));
        router.get('/note/:id', middlewareAdapter(new UserIdMiddleware()), middlewareAdapter(new NoteMiddleware()), routeMvcAdapter(makeControler(), TypeActionMvc.SHOW)); // id do user
        router.put('/note/:id', middlewareAdapter(new NoteMiddleware()), routeMvcAdapter(makeControler(), TypeActionMvc.UPDATE));
        router.delete('/note/:id', routeMvcAdapter(makeControler(), TypeActionMvc.DELETE));
    };
};