import { Router, Request, Response } from 'express';
import { ICreateTaxDependent } from '../../../interfaces';
import { createTaxDependentController } from '../../../controllers';

const createTaxDependentRouter: Router = Router();

createTaxDependentRouter.post(
    '/',
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
                return res.status(400).json({
                    success: false,
                    message: `bad request :: Invalid input: Missing required ${missingFields}`,
                });
            }

            // Call controller
            const result = await createTaxDependentController(createValue);

            if (result?.success) {
                return res.status(201).json({
                    success: true,
                    data: result.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: result?.message || 'Failed to create tax dependent',
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: `Server error: ${error?.message}`,
            });
        }
    }
);

export default createTaxDependentRouter;