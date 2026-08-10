import { Router } from 'express';
import createUserRouter from './createUser.router';
import getUsersRouter from './getUsersRouter';
const userRouter: Router = Router();

userRouter.use('/create-user', createUserRouter);
userRouter.use('/get-users', getUsersRouter);

export default userRouter;
