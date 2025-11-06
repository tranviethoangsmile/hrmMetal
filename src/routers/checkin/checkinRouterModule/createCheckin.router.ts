import { Request, Response, Router } from 'express';
import moment from 'moment';
import {
    create_checkin_controller,
    is_checked_controller,
    update_checkin_controller,
} from '../../../controllers';
const createCheckin: Router = Router();
import { io } from '../../../socket/socketIO';
import { findById } from '../../../controllers/user/user.controller';
import { check_value_request_checkin } from '../../../interfaces';
import { create_notification_usecase } from '../../../useCases';
import { get_all_day_off_controller } from '../../../controllers';
createCheckin.post('/', async (req: Request, res: Response) => {
    try {
        function handleTime(value: any) {
            const roundedNumber = Math.floor(value * 4) / 4;
            return roundedNumber.toFixed(2);
        }
        const handleTimeMoment = (value: any) => {
            return moment(value, 'HH:mm');
        };
        const NIGHT_END = moment('05:00', 'HH:mm');
        const DAY_END = moment('16:45', 'HH:mm');
        const data: check_value_request_checkin = req.body;
        if (
            !data ||
            !data?.check_time ||
            !data?.date ||
            !data?.user_id ||
            !data?.work_shift
        ) {
            throw new Error('data not empty');
        }

        const check_field = {
            user_id: data.user_id,
            date: data.date,
        };

        const dayOffs = await get_all_day_off_controller();
        const isDayOff = dayOffs.data?.some((dayOff: any) => {
            return dayOff.date === data.date;
        });
        const isWeekend =
            moment(data.date, 'YYYY-MM-DD').isoWeekday() === 6 ||
            moment(data.date, 'YYYY-MM-DD').isoWeekday() === 7 ||
            isDayOff;
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
                    const user = await findById(data.user_id);
                    if (user?.success) {
                        io.emit('userChecked', {
                            data: {
                                avatar: user?.data,
                                message: 'in',
                            },
                        });
                    }

                    try {
                        const field_notification = {
                            title: 'checkin',
                            user_id: data.user_id,
                            type: 'SUCCESS',
                            message: 'checkin success',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }

                    return res.status(201).json({
                        success: true,
                        data: create_check?.data,
                    });
                } else {
                    try {
                        const field_notification = {
                            title: 'checkin',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkin unSuccess',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }
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
                time_out = moment(data.check_time, 'HH:mm').format('HH:mm');
                if (data.work_shift === 'NIGHT') {
                    //START night
                    if (
                        handleTimeMoment(time_out) >=
                            handleTimeMoment('00:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('01:00')
                    ) {
                        work_time = moment
                            .duration(
                                moment('00:00', 'HH:mm')
                                    .add(1, 'day')
                                    .diff(moment(time_in, 'HH:mm')),
                            )
                            .asHours();
                        over_time = 0;
                    } else if (handleTimeMoment(time_out) <= NIGHT_END) {
                        work_time =
                            moment
                                .duration(
                                    moment(time_out, 'HH:mm')
                                        .add(1, 'day')
                                        .diff(moment(time_in, 'HH:mm')),
                                )
                                .asHours() - 1;
                        over_time = 0;
                    } else if (
                        handleTimeMoment(time_out) > NIGHT_END &&
                        handleTimeMoment(time_out) <= handleTimeMoment('05:15')
                    ) {
                        work_time =
                            moment
                                .duration(
                                    NIGHT_END.add(1, 'day').diff(
                                        handleTimeMoment(time_in),
                                    ),
                                )
                                .asHours() - 1;
                        over_time = 0;
                    } else if (
                        handleTimeMoment(time_out) >
                            handleTimeMoment('05:15') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('20:00')
                    ) {
                        work_time =
                            moment
                                .duration(
                                    NIGHT_END.add(1, 'day').diff(
                                        handleTimeMoment(time_in),
                                    ),
                                )
                                .asHours() - 1;
                        over_time = moment
                            .duration(
                                handleTimeMoment(time_out).diff(
                                    handleTimeMoment('05:15'),
                                ),
                            )
                            .asHours();
                    } else {
                        work_time = moment
                            .duration(
                                handleTimeMoment(time_out).diff(
                                    handleTimeMoment(time_in),
                                ),
                            )
                            .asHours();
                        over_time = 0;
                    }
                    //END NIGHT
                } else {
                    //DAY
                    if (
                        handleTimeMoment(time_out) <= handleTimeMoment(time_in)
                    ) {
                        work_time =
                            moment
                                .duration(
                                    DAY_END.diff(handleTimeMoment(time_in)),
                                )
                                .asHours() - 0.75;
                        over_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out)
                                        .add(1, 'day')
                                        .diff(DAY_END),
                                )
                                .asHours() - 0.25;
                    } else if (
                        handleTimeMoment(time_out) <= handleTimeMoment('12:00')
                    ) {
                        work_time = moment
                            .duration(
                                handleTimeMoment(time_out).diff(
                                    handleTimeMoment(time_in),
                                ),
                            )
                            .asHours();
                        over_time = 0;
                    } else if (
                        handleTimeMoment(time_out) >
                            handleTimeMoment('12:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('12:45')
                    ) {
                        work_time = moment
                            .duration(
                                handleTimeMoment('12:00').diff(
                                    handleTimeMoment(time_in),
                                ),
                            )
                            .asHours();
                        over_time = 0;
                    } else if (
                        handleTimeMoment(time_out) >
                            handleTimeMoment('12:45') &&
                        handleTimeMoment(time_out) <= DAY_END
                    ) {
                        work_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out).diff(
                                        handleTimeMoment(time_in),
                                    ),
                                )
                                .asHours() - 0.75;
                        over_time = 0;
                    } else if (
                        handleTimeMoment(time_out) > DAY_END &&
                        handleTimeMoment(time_out) <= handleTimeMoment('17:00')
                    ) {
                        work_time =
                            moment
                                .duration(
                                    DAY_END.diff(handleTimeMoment(time_in)),
                                )
                                .asHours() - 0.75;
                        over_time = 0;
                    } else {
                        work_time =
                            moment
                                .duration(
                                    DAY_END.diff(handleTimeMoment(time_in)),
                                )
                                .asHours() - 0.75;
                        over_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out).diff(DAY_END),
                                )
                                .asHours() - 0.25;
                    }
                    // day end
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
                    const user = await findById(data.user_id);
                    if (user?.success) {
                        io.emit('userChecked', {
                            data: {
                                avatar: user?.data,
                                message: 'out',
                            },
                        });
                    }
                    try {
                        const field_notification = {
                            title: 'checkout',
                            user_id: data.user_id,
                            type: 'SUCCESS',
                            message: 'checkout Success',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }
                    return res.status(202).json({
                        success: true,
                    });
                } else {
                    try {
                        const field_notification = {
                            title: 'checkout',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkout unSuccess',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }
                    return res.status(200).json({
                        success: false,
                        message: create_check?.message,
                    });
                }
            } else {
                try {
                    const field_notification = {
                        title: 'checkin',
                        user_id: data.user_id,
                        type: 'ERROR',
                        message: 'checkin exist',
                    };
                    const notification = await create_notification_usecase(
                        field_notification,
                    );
                    if (!notification?.success) {
                        throw new Error(notification?.message);
                    }
                } catch (error: any) {
                    console.log(`notification: ${error?.message}`);
                }
                return res.status(202).json({
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
                    const user = await findById(data.user_id);
                    if (user?.success) {
                        io.emit('userChecked', {
                            data: {
                                avatar: user?.data,
                                message: 'in',
                            },
                        });
                    }
                    try {
                        const field_notification = {
                            title: 'checkin weekend',
                            user_id: data.user_id,
                            type: 'SUCCESS',
                            message: 'checkin weekend Success',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }
                    return res.status(201).json({
                        success: true,
                        data: create_check?.data,
                    });
                } else {
                    try {
                        const field_notification = {
                            title: 'checkin weekend',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkin weekend unSuccess',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }
                    return res.status(200).json({
                        success: false,
                        message: create_check?.message,
                    });
                }
            } else if (isChecked?.success && !isChecked?.data?.is_checked) {
                let time_out;
                let work_time;
                let time_in = isChecked?.data?.time_in;
                time_out = moment(data.check_time, 'HH:mm').format('HH:mm');
                // Night start  weekend from 22:30 ---------------------------------
                if (data.work_shift === 'NIGHT') {
                    if (
                        handleTimeMoment(time_out) >=
                            handleTimeMoment('00:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('01:00')
                    ) {
                        work_time = moment
                            .duration(
                                handleTimeMoment('00:00')
                                    .add(1, 'day')
                                    .diff(handleTimeMoment(time_in)),
                            )
                            .asHours();
                    } else if (handleTimeMoment(time_out) <= NIGHT_END) {
                        work_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out)
                                        .add(1, 'day')
                                        .diff(handleTimeMoment(time_in)),
                                )
                                .asHours() - 1;
                    } else if (
                        handleTimeMoment(time_out) > NIGHT_END &&
                        handleTimeMoment(time_out) < handleTimeMoment('05:15')
                    ) {
                        work_time =
                            moment
                                .duration(
                                    NIGHT_END.add(1, 'day').diff(
                                        handleTimeMoment(time_in),
                                    ),
                                )
                                .asHours() - 1;
                    } else if (
                        handleTimeMoment(time_out) >
                            handleTimeMoment('05:15') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('20:00')
                    ) {
                        work_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out)
                                        .add(1, 'day')
                                        .diff(handleTimeMoment(time_in)),
                                )
                                .asHours() - 1.25;
                    } else {
                        work_time = moment
                            .duration(
                                handleTimeMoment(time_out).diff(
                                    handleTimeMoment(time_in),
                                ),
                            )
                            .asHours();
                    }
                    // night weekend end
                } else {
                    // day start weekend
                    if (
                        handleTimeMoment(time_out) <= handleTimeMoment(time_in)
                    ) {
                        work_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out)
                                        .add(1, 'day')
                                        .diff(handleTimeMoment(time_in)),
                                )
                                .asHours() - 1.25;
                    } else if (
                        handleTimeMoment(time_out) <= handleTimeMoment('12:00')
                    ) {
                        work_time = moment
                            .duration(
                                handleTimeMoment(time_out).diff(
                                    handleTimeMoment(time_in),
                                ),
                            )
                            .asHours();
                    } else if (
                        handleTimeMoment(time_out) >
                            handleTimeMoment('12:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('12:45')
                    ) {
                        work_time = moment
                            .duration(
                                handleTimeMoment('12:00').diff(
                                    handleTimeMoment(time_in),
                                ),
                            )
                            .asHours();
                    } else if (
                        handleTimeMoment(time_out) >
                            handleTimeMoment('12:45') &&
                        handleTimeMoment(time_out) <= DAY_END
                    ) {
                        work_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out).diff(
                                        handleTimeMoment(time_in),
                                    ),
                                )
                                .asHours() - 0.75;
                    } else if (
                        handleTimeMoment(time_out) >
                            handleTimeMoment('16:45') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('17:00')
                    ) {
                        work_time =
                            moment
                                .duration(
                                    DAY_END.diff(handleTimeMoment(time_in)),
                                )
                                .asHours() - 0.75;
                    } else {
                        work_time =
                            moment
                                .duration(
                                    handleTimeMoment(time_out).diff(
                                        handleTimeMoment(time_in),
                                    ),
                                )
                                .asHours() - 1;
                    }
                    // end day weekend
                }

                const field: object = {
                    user_id: data.user_id,
                    date: data.date,
                    time_out: time_out,
                    work_time: handleTime(work_time),
                    over_time: 0,
                    work_shift: data.work_shift,
                    is_checked: true,
                };

                const create_check = await update_checkin_controller(field);
                if (create_check.success) {
                    const user = await findById(data.user_id);
                    if (user?.success) {
                        io.emit('userChecked', {
                            data: {
                                avatar: user?.data,
                                message: 'out',
                            },
                        });
                    }
                    try {
                        const field_notification = {
                            title: 'checkout weekend',
                            user_id: data.user_id,
                            type: 'SUCCESS',
                            message: 'checkout weekend Success',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }
                    return res.status(202).json({
                        success: true,
                    });
                } else {
                    try {
                        const field_notification = {
                            title: 'checkout weekend',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkout weekend unSuccess',
                        };
                        const notification = await create_notification_usecase(
                            field_notification,
                        );
                        if (!notification?.success) {
                            throw new Error(notification?.message);
                        }
                    } catch (error: any) {
                        console.log(`notification: ${error?.message}`);
                    }
                    return res.status(200).json({
                        success: false,
                        message: create_check?.message,
                    });
                }
            } else {
                try {
                    const field_notification = {
                        title: 'checkin in weekend',
                        user_id: data.user_id,
                        type: 'ERROR',
                        message: 'checkin exist',
                    };
                    const notification = await create_notification_usecase(
                        field_notification,
                    );
                    if (!notification?.success) {
                        throw new Error(notification?.message);
                    }
                } catch (error: any) {
                    console.log(`notification: ${error?.message}`);
                }
                return res.status(200).json({
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
