import { Router, Request, Response} from "express";
import { create, find } from '../controllers/food.controller';
const foodRouter = Router();

foodRouter.post('/', async (req: Request, res: Response) => {
    try {   
        const data = req.body
        if(data != null) {
            const food = await create(data);
            console.log(food);
            if(food?.success) {
                res.status(201).json({
                    success: true,
                    data: food?.data
                });
            }else {
                res.status(200).json({
                    success: false,
                    message: 'Food create failed',
                });
            }
        }else {
            res.status(400).send ({
                message: 'data not empty',
            })
        }
        
    } catch (err) {
        return res.status(500).send({
            message: 'server error'
        })
    }
})

foodRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const food = await find(id);
        if( food ) {
            res.status(200).json(food);
        }else {
            res.status(404).json({
                success: false,
                message: 'Food not found',
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: 'server error'
        })
    }
});

export default foodRouter;