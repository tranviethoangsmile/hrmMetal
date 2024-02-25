import { Request, Response, Router } from 'express';
import moment from 'moment';
import {
    create_checkin_controller,
    is_checked_controller,
    update_checkin_controller,
} from '../../../controllers/checkin/checkin.controller';

const createCheckin: Router = Router();

createCheckin.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({
                success: false,
                message: 'Data is empty',
            });
        }

        const check_field = {
            user_id: data.user_id,
            date: data.date,
        };
        const isChecked = await is_checked_controller(check_field);
        if (!isChecked?.success) {
            let time_in;
            if (data.work_shift === 'NIGHT') {
                time_in = moment
                    .max(
                        moment(data.check_time, 'HH:mm'),
                        moment('20:00', 'HH:mm'),
                    )
                    .format('HH:mm');
            } else {
                time_in = moment
                    .max(
                        moment(data.check_time, 'HH:mm'),
                        moment('08:00', 'HH:mm'),
                    )
                    .format('HH:mm');
            }

            const field: object = {
                user_id: data.user_id,
                date: data.date,
                time_in: time_in,
                work_shift: data.work_shift,
            };

            const create_check = await create_checkin_controller(field);
            if (create_check.success) {
                return res.status(201).json({
                    success: true,
                    data: create_check?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: create_check?.message,
                });
            }
        } else {
            let time_out;
            let over_time;
            let work_time;
            let time_in = isChecked?.data?.time_in;
            if (data.work_shift === 'NIGHT') {
                if (
                    moment(data.check_time, 'HH:mm') < moment('20:00', 'HH:mm')
                ) {
                    time_out = moment(data.check_time, 'HH:mm').format('HH:mm');
                } else {
                    time_out = moment
                        .max(
                            moment(data.check_time, 'HH:mm'),
                            moment('05:00', 'HH:mm').add(1, 'day'),
                        )
                        .format('HH:mm');
                }
            } else {
                if (
                    moment(data.check_time, 'HH:mm') < moment('16:45', 'HH:mm')
                ) {
                    time_out = moment(data.check_time, 'HH:mm').format('HH:mm');
                } else {
                    time_out = moment
                        .max(
                            moment(data.check_time, 'HH:mm'),
                            moment('16:45', 'HH:mm'),
                        )
                        .format('HH:mm');
                }
            }
            if (data.work_shift === 'NIGHT') {
                work_time =
                    moment
                        .duration(
                            moment(time_out, 'hh:mm')
                                .add(1, 'day')
                                .diff(moment(time_in, 'hh:mm')),
                        )
                        .asHours() - 1;
            } else {
                work_time =
                    moment
                        .duration(
                            moment(time_out, 'hh:mm').diff(
                                moment(time_in, 'hh:mm'),
                            ),
                        )
                        .asHours() - 0.75;
            }
            if (work_time >= 8) {
                over_time = work_time - 8.25;
            } else {
                over_time = 0;
            }

            switch (true) {
                case over_time < 0.25:
                    over_time = 0;
                    break;
                case over_time < 0.5:
                    over_time = 0.25;
                    break;
                case over_time < 0.75:
                    over_time = 0.5;
                    break;
                case over_time < 1:
                    over_time = 0.75;
                    break;
                case over_time < 1.25:
                    over_time = 1;
                    break;
                case over_time < 1.5:
                    over_time = 1.25;
                    break;
                case over_time < 1.75:
                    over_time = 1.5;
                    break;
                case over_time < 2:
                    over_time = 1.75;
                    break;
                case over_time < 2.25:
                    over_time = 2;
                    break;
                case over_time < 2.5:
                    over_time = 2.25;
                    break;
                case over_time < 2.75:
                    over_time = 2.5;
                    break;
                case over_time < 3:
                    over_time = 2.75;
                    break;
                case over_time < 3.25:
                    over_time = 3;
                    break;
                case over_time < 3.5:
                    over_time = 3.25;
                    break;
                default:
                    break;
            }
            const field: object = {
                user_id: data.user_id,
                date: data.date,
                time_out: time_out,
                work_time: work_time > 8 ? 8 : work_time,
                over_time: over_time,
                work_shift: data.work_shift,
            };

            const create_check = await update_checkin_controller(field);
            if (create_check.success) {
                return res.status(201).json({
                    success: true,
                    data: create_check?.data,
                });
            } else {
                return res.status(200).json({
                    success: false,
                    message: create_check?.message,
                });
            }
        }
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + error?.message,
        });
    }
});

export default createCheckin;
