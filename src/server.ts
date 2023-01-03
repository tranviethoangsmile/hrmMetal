import express, { Application, Request, Response, NextFunction, urlencoded } from 'express';
import { User, Department } from './models';
import cors from 'cors';
import userRouters from './routers/user.router';
import departmentRouters from './routers/department.router';

const App: Application = express();
App.use(cors());
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(express.static('public'))

App.use('/users',userRouters);
App.use('/departments',departmentRouters);


App.listen(3000, () => {
    console.warn('listening port 3000');
});

