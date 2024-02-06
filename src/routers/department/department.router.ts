import { Request, Response, Router } from 'express';
const router: Router = Router();
import {
    createDep,
    departmentList,
    getDepartmentById,
} from '../../controllers/department/department.controller';

router.get('/', async (req: Request, res: Response) => {
    try {
        const departments = await departmentList();
        if (departments?.success) {
            res.status(201).send({
                success: true,
                data: departments?.data,
            });
        } else {
            res.status(200).send({
                success: false,
                message: departments?.message,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

/**
 * @openapi
 * /department:
 * post:
 *  tags:
 *      -Department
 *  summary: Create Department
 *  reqestBody:
 *      requied: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref:
 *          responses:
 *              201:
 *                  description: success
 *              200:
 *                  description: success
 *
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const dep: object | null = req.body;
        if (dep != null) {
            const department = await createDep(dep);
            if (department?.success) {
                res.status(201).send({
                    success: true,
                    data: department?.data,
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: department?.message,
                });
            }
        } else {
            res.status(200).json({
                success: false,
                message: 'data not empty',
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const department = await getDepartmentById(id);
        if (department?.success) {
            res.status(201).send({
                success: true,
                data: department?.data,
            });
        } else {
            res.status(200).send({
                success: false,
                message: department?.message,
            });
        }
    } catch (error: any) {
        res.status(500).send({
            success: false,
            message: 'server error: ' + error?.message,
        });
    }
});

export default router;
