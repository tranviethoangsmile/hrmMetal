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
        function handleTime(value: any) {
            const roundedWorkTime = Math.floor(value * 4) / 4; // làm tròn đến 2 chữ số thập phân
            return Math.min(roundedWorkTime, 8); // giới hạn giá trị tối đa là 8 giờ
        }
        const NIGHT_END = moment('05:00', 'HH:mm');
        const DAY_END = moment('16:45', 'HH:mm');
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
        const isWeekend =
            moment(data.date, 'YYYY-MM-DD').isoWeekday() === 6 ||
            moment(data.date, 'YYYY-MM-DD').isoWeekday() === 7;
        if (!isWeekend) {
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
            } else if (isChecked?.success && !isChecked?.data?.is_checked) {
                let time_out;
                let over_time;
                let work_time;
                let time_in = isChecked?.data?.time_in;
                if (data.work_shift === 'NIGHT') {
                    if (
                        moment(data.check_time, 'HH:mm') <
                        moment('20:00', 'HH:mm')
                    ) {
                        time_out = moment(data.check_time, 'HH:mm').format(
                            'HH:mm',
                        );
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
                        moment(data.check_time, 'HH:mm') <
                        moment('16:45', 'HH:mm')
                    ) {
                        time_out = moment(data.check_time, 'HH:mm').format(
                            'HH:mm',
                        );
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
                                moment(NIGHT_END, 'hh:mm')
                                    .add(1, 'day')
                                    .diff(moment(time_in, 'hh:mm')),
                            )
                            .asHours() - 1;
                } else {
                    work_time =
                        moment
                            .duration(
                                moment(DAY_END, 'hh:mm').diff(
                                    moment(time_in, 'hh:mm'),
                                ),
                            )
                            .asHours() - 0.75;
                }

                if (data.work_shift === 'NIGHT') {
                    over_time =
                        moment
                            .duration(
                                moment(time_out, 'HH:mm').diff(
                                    moment(NIGHT_END),
                                ),
                            )
                            .asHours() - 0.25;
                } else {
                    over_time =
                        moment
                            .duration(
                                moment(time_out, 'HH:mm').diff(moment(DAY_END)),
                            )
                            .asHours() - 0.25;
                }
                const field: object = {
                    user_id: data.user_id,
                    date: data.date,
                    time_out: time_out,
                    work_time: handleTime(work_time),
                    over_time: handleTime(over_time),
                    work_shift: data.work_shift,
                    is_checked: true,
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
            } else {
                return res.status(201).json({
                    success: !isChecked?.success,
                    message: 'checked',
                });
            }
        } else {
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
                    is_weekend: isWeekend,
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
            } else if (isChecked?.success && !isChecked?.data?.is_checked) {
                let time_out;
                let work_time;
                let over_time;
                let time_in = isChecked?.data?.time_in;
                if (data.work_shift === 'NIGHT') {
                    if (
                        moment(data.check_time, 'HH:mm') <
                        moment('20:00', 'HH:mm')
                    ) {
                        time_out = moment(data.check_time, 'HH:mm').format(
                            'HH:mm',
                        );
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
                        moment(data.check_time, 'HH:mm') <
                        moment('16:45', 'HH:mm')
                    ) {
                        time_out = moment(data.check_time, 'HH:mm').format(
                            'HH:mm',
                        );
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
                                moment(NIGHT_END, 'hh:mm')
                                    .add(1, 'day')
                                    .diff(moment(time_in, 'hh:mm')),
                            )
                            .asHours() - 1;
                } else {
                    work_time =
                        moment
                            .duration(
                                moment(DAY_END, 'hh:mm').diff(
                                    moment(time_in, 'hh:mm'),
                                ),
                            )
                            .asHours() - 0.75;
                }
                if (data.work_shift === 'NIGHT') {
                    over_time =
                        moment
                            .duration(
                                moment(time_out, 'HH:mm').diff(
                                    moment(NIGHT_END),
                                ),
                            )
                            .asHours() - 0.25;
                } else {
                    over_time =
                        moment
                            .duration(
                                moment(time_out, 'HH:mm').diff(moment(DAY_END)),
                            )
                            .asHours() - 0.25;
                }
                const field: object = {
                    user_id: data.user_id,
                    date: data.date,
                    time_out: time_out,
                    work_time: Math.floor((work_time + over_time) * 4) / 4,
                    over_time: 0,
                    work_shift: data.work_shift,
                    is_checked: true,
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
            } else {
                return res.status(201).json({
                    success: false,
                    message: 'checked',
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
