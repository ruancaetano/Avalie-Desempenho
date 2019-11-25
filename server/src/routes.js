import { Router } from 'express';
import UsersController from './app/controllers/UsersController';
import SessionsController from './app/controllers/SessionsController';
import EvaluationsController from './app/controllers/EvaluationsController';
import NewAppraisersController from './app/controllers/NewAppraisersController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/sessions', SessionsController.store);

routes.get('/users', AuthMiddleware, UsersController.index);
routes.post('/users', AuthMiddleware, UsersController.store);
routes.put('/users/:id', AuthMiddleware, UsersController.update);
routes.delete('/users/:id', AuthMiddleware, UsersController.delete);

routes.get('/evaluations', AuthMiddleware, EvaluationsController.index);
routes.post('/evaluations', AuthMiddleware, EvaluationsController.store);
routes.put('/evaluations/:id', AuthMiddleware, EvaluationsController.update);
routes.delete('/evaluations/:id', AuthMiddleware, EvaluationsController.delete);

routes.get(
  '/appraisers/:appraisedId',
  AuthMiddleware,
  NewAppraisersController.index
);

export default routes;
