import { Request, Response, Router } from 'express';

const mediaRouter: Router = Router();

mediaRouter.get('/uploads/:filename', (req: Request, res: Response) => {
    const filename: string = req.params.filename;
    const media_path = '/media/uploads/' + filename;
    res.status(200).sendFile(media_path);
});

export default mediaRouter;
