import { Router } from 'express';
import updateStatusTaxDependentRouter from './updateStatusTaxDependent.router';
const taxDependentRouter: Router = Router();
taxDependentRouter.use(
    '/update-status-tax-dependent',
    updateStatusTaxDependentRouter
);
export default taxDependentRouter;
