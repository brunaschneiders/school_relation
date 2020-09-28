import { Router } from 'express';
import cors from 'cors';

import UserController from './app/controllers/UserController';
import EvaluationController from './app/controllers/EvaluationController';
import NoteController from './app/controllers/NoteController';
import AuthContoller from './app/controllers/AuthController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
routes.use(cors());

routes.get('/', (req, res) => res.json({ result: 'TEST-API' }));

// ROUTES PARA USER
routes.post('/users', UserController.store);

// ROUTES PARA AUTH
routes.post('/login', AuthContoller.store);

routes.use(authMiddleware);

// ROUTES PARA USER(auth)
routes.put('/users/:uid', UserController.update);
routes.get('/users/:uid', UserController.show);
routes.get('/users', UserController.index);

// ROUTES PARA EVALUATION(auth)
routes.post('/evaluations', EvaluationController.store);
routes.get('/evaluations', EvaluationController.index);
routes.get('/evaluations/:uid', EvaluationController.show);

// ROUTES PARA NOTE(auth)
routes.post('/notes', NoteController.store);
routes.get('/notes', NoteController.index);
routes.get('/notes/:uid', NoteController.show);

export default routes;
