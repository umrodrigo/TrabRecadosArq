import { Router } from 'express';
import { routeMvcAdapter, TypeActionMvc } from '../../../../core/presentation';
import { UserRepository } from '../../infra';
import { UserController } from '../controllers';

const makeControler = () => { // factory Method
    const repository  =new UserRepository();
    return new UserController(repository);
}


export default class UserRoutes {
    public init(router: Router) {   
         
        //router.post('/users', routeMvcAdapter(makeControler(), TypeActionMvc.STORE));
        //router.get('/users', new UserController(repository).index);
        //router.get('/users/:id',  new UserController(repository).show);
    
    };
};