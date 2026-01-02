import { Router, Request, Response } from 'express';
import { deleteTaxDependentWithIdController } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';

const deleteTaxDependentRouter: Router = Router();

deleteTaxDependentRouter.post('/', async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id;
        if (!id) {
            return errorResponse(res, 400, 'ID is required');
        }
        const deleteResult = await deleteTaxDependentWithIdController(id);
        if (!deleteResult?.success) {
            return errorResponse(res, 400, deleteResult?.message || 'Delete failed');
        }

        return successResponse(res, 202, undefined, 'Tax dependent deleted successfully');
    } catch (error: any) {
        return errorResponse(res, 500, error?.message || 'Internal server error');
    }
});

export default deleteTaxDependentRouter;