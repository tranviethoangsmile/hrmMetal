import { Router, Request, Response } from 'express';
import { create_canteen, find_canteen_by_id } from '../controllers/canteen.controller';
const canteenRouter = Router();

canteenRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if(data) {
            const canteen = await create_canteen(data);
            if(canteen?.success) {
                res.status(201).json(canteen);
            }else {
                res.status(400).json(canteen);
            }     
        }else {
            res.status(400).json({
                message: 'data is required'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'server error'
        })
    }

});

canteenRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if(id) {
            const canteen = await find_canteen_by_id(id);
            if(canteen?.success) {
                res.status(201).json(canteen);
            }else {
                res.status(400).json(canteen);
            }     
        }else {
            res.status(400).json({
                message: 'data is required'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'server error'
        })
    }
});

export default canteenRouter;