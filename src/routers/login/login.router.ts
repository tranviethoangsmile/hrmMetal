import { Router } from 'express';
import {
    app_login_controller,
    web_login_controller,
} from '../../controllers';

const loginRouter: Router = Router();
loginRouter.post('/app', app_login_controller);
loginRouter.post('/web', web_login_controller);

export default loginRouter;
