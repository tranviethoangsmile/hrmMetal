import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import {
    createDep,
    departmentList,
    getDepartmentById
} from '../controllers/department.controller';

router.get('/', async (req: Request, res: Response) => {
    const departments = await departmentList();
    if (departments) {
        return res.status(200).json(departments);
    } else {
        return res.status(404).json({ message: 'department not found' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const department = req.body;
    const data = await createDep(department);
    if (data) {
        res.status(201).send(data);
    } else {
        res.status(400).json({ message: 'Invalid Data' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = await getDepartmentById(id);
    if (data) {
        res.status(200).send(data);
    }else {
        res.status(404).json({ message: 'department not found' });
    }
})

export default router;
