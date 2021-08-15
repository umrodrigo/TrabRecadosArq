import { Router } from 'express';
import { middlewareAdapter, routeMvcAdapter, TypeActionMvc } from '../../../../core/presentation';
import { UserRepository } from '../../infra';
import { UserController } from '../controllers';
import { UserIdMiddleware, UserMiddleware } from '../middlewares';

const makeControler = () => { // factory Method
    const repository  =new UserRepository();
    return new UserController(repository);
}

export default class UserRoutes {
    public init(router: Router) {   

        router.post('/users', middlewareAdapter(new UserMiddleware()), routeMvcAdapter(makeControler(), TypeActionMvc.STORE));
        router.get('/users', middlewareAdapter(new UserMiddleware()), routeMvcAdapter(makeControler(), TypeActionMvc.INDEX));
        router.get('/users/:id', middlewareAdapter(new UserIdMiddleware()), routeMvcAdapter(makeControler(), TypeActionMvc.SHOW));
    
    };
};