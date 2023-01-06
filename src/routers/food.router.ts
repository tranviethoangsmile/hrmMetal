import { Router, Request, Response} from "express";
import { create, find } from '../controllers/food.controller';
const foodRouter = Router();

foodRouter.post('/', async (req: Request, res: Response) => {
    try {   
        const data = req.body
        const food = await create(data);
        if( food ) {
            res.status(201).json(food);
        }else {
            res.status(400).json({
                success: false,
                message: 'Food create failed',
            });
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