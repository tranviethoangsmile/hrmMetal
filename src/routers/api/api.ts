import { Router } from 'express';

const apiRouter: Router = Router();
import versionRouter from '../version/version';

apiRouter.use('/version', versionRouter);

export default apiRouter;
