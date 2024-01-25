import express, { Request, Response, NextFunction, Router } from 'express';

const router: Router = express.Router();
import apiRouter from './api';

router.use('/api', apiRouter);
export default router;
