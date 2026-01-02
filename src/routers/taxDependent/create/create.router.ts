import { Router, Request, Response } from 'express';
import { ICreateTaxDependent } from '../../../interfaces';
import { createTaxDependentController } from '../../../controllers';
import { errorResponse, successResponse } from '../../../helpers';
import { create_media_path } from '../../../middlewares';
const createTaxDependentRouter: Router = Router();

createTaxDependentRouter.post(
    '/',
    create_media_path,
    async (req: Request, res: Response) => {
        try {
            const createValue: ICreateTaxDependent = req.body;

            // Check required fields
            if (
                !createValue ||
                !createValue.user_id ||
                !createValue.name ||
                !createValue.dob ||
                !createValue.gender ||
                !createValue.relationship
            ) {
                const missingFields = [
                    !createValue.user_id && 'user_id',
                    !createValue.name && 'name',
                    !createValue.dob && 'dob',
                    !createValue.gender && 'gender',
                    !createValue.relationship && 'relationship',
                ]
                    .filter(Boolean)
                    .join(', ');
                return errorResponse(
                    res,
                    400,
                    `Invalid input: Missing required ${missingFields}`
                );
            }

            // Call controller
            const result = await createTaxDependentController(createValue);

            if (result?.success) {
                return successResponse(res, 201, result.data);
            } else {
                return errorResponse(
                    res,
                    200,
                    result?.message || 'Failed to create tax dependent'
                );
            }
        } catch (error: any) {
            return errorResponse(res, 500, error?.message || 'Internal server error');
        }
    }
);

export default createTaxDependentRouter;