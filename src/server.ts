import express, { Application, Request, Response, NextFunction, urlencoded } from 'express';
import { User, Department } from './models';
import cors from 'cors';
import router from './routers';

const App: Application = express();
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.static('public'))

App.use(router)

App.listen(3000, () => {
    console.warn('listening port 3000');
});

