import { Router, Request, Response} from "express";
import { create, find } from '../controllers/food.controller';
const foodRouter = Router();

foodRouter.post('/', async (req: Request, res: Response) => {
    try {   
        const data: object | null = req.body
        if(data != null) {
            const food = await create(data);
            if(food?.success) {
                res.status(201).json({
                    success: true,
                    data: food?.data
                });
            }else {
                res.status(200).json({
                    success: false,
                    message: food?.message,
                });
            }
        }else {
            res.status(400).send ({
                success: false,
                message: 'data not empty',
            })
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: 'server error'
        })
    }
})

foodRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: string | null = req.params.id;
        if(id != null) {
            const food = await find(id);
            if( food?.success ) {
                res.status(201).json({
                    success: true,
                    data: food?.data,
                });
            }else {
                res.status(200).json({
                    success: false,
                    message: food?.message,
                });
            }
        }else {
            res.status(400).json({
                success: false,
                message: 'id not empty',
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'server error'
        })
    }
});

export default foodRouter;