import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

const veyrTimeCheck = (req: Request, res: Response, next: NextFunction) => {
    const server_time = moment().format('HH:mm');
    const client_time = req.body.check_time;
    if (server_time === client_time) {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'time  is not very',
        });
    }
};

export default veyrTimeCheck;
