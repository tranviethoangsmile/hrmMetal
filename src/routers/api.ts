import express, { Router } from 'express';

const apiRouter: Router = express.Router();
import versionRouter from './version';

apiRouter.use('/version', versionRouter);

export default apiRouter;
