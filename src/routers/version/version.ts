import { Router } from 'express';

const versionRouter: Router = Router();
import v1Router from '../v1/v1';
versionRouter.use('/v1', v1Router);

export default versionRouter;
