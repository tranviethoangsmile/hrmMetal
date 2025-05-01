import { Request, Response, Router } from 'express';
import { search_event_by_id_controller } from '../../../controllers';

const searchEventById: Router = Router();

searchEventById.post('/', async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id;
        if (!id) {
            return res.status(400).json({ message: 'id is required' });
        }
        const event = await search_event_by_id_controller(id);
        if (!event?.success) {
            throw new Error(event?.message);
        }
        return res.status(202).json({
            success: true,
            data: event?.data,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: `server: ${error?.message}`,
        });
    }
});

export default searchEventById;
