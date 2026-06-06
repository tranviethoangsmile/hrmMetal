"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moment_1 = __importDefault(require("moment"));
const controllers_1 = require("../../../controllers");
const helpers_1 = require("../../../helpers");
const socketIO_1 = require("../../../socket/socketIO");
const useCases_1 = require("../../../useCases");
const middlewares_1 = require("../../../middlewares");
const createCheckin = (0, express_1.Router)();
createCheckin.post('/', middlewares_1.authJwt, (0, middlewares_1.requireRoles)(['MANAGER', 'LEADER', 'SUPERVISOR', 'STAFF']), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    try {
        function handleTime(value) {
            const roundedNumber = Math.floor(value * 4) / 4;
            return roundedNumber.toFixed(2);
        }
        const handleTimeMoment = (value) => {
            return (0, moment_1.default)(value, 'HH:mm');
        };
        const NIGHT_END = (0, moment_1.default)('05:00', 'HH:mm');
        const DAY_END = (0, moment_1.default)('16:45', 'HH:mm');
        const position = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.position) || '';
        const data = req.body;
        if (!data || !data.user_id || !data.date || !data.check_time || !data.work_shift) {
            const missingFields = [
                (!(data === null || data === void 0 ? void 0 : data.user_id) || ((_b = data === null || data === void 0 ? void 0 : data.user_id) === null || _b === void 0 ? void 0 : _b.trim()) === '') && 'user_id',
                (!(data === null || data === void 0 ? void 0 : data.date) || ((_c = data === null || data === void 0 ? void 0 : data.date) === null || _c === void 0 ? void 0 : _c.trim()) === '') && 'date',
                (!(data === null || data === void 0 ? void 0 : data.check_time) || ((_d = data === null || data === void 0 ? void 0 : data.check_time) === null || _d === void 0 ? void 0 : _d.trim()) === '') && 'check_time',
                (!(data === null || data === void 0 ? void 0 : data.work_shift) || ((_e = data === null || data === void 0 ? void 0 : data.work_shift) === null || _e === void 0 ? void 0 : _e.trim()) === '') && 'work_shift',
            ]
                .filter(Boolean)
                .join(', ');
            return (0, helpers_1.errorResponse)(res, 400, `Missing required ${missingFields}`);
        }
        const check_field = {
            user_id: data.user_id,
            date: data.date,
        };
        const dayOffs = yield (0, controllers_1.get_all_day_off_controller)();
        const isDayOff = (_f = dayOffs.data) === null || _f === void 0 ? void 0 : _f.some((dayOff) => {
            return dayOff.date === data.date;
        });
        const isWeekend = (0, moment_1.default)(data.date, 'YYYY-MM-DD').isoWeekday() === 6 ||
            (0, moment_1.default)(data.date, 'YYYY-MM-DD').isoWeekday() === 7 ||
            isDayOff;
        if (!isWeekend) {
            const isChecked = yield (0, controllers_1.is_checked_controller)(check_field);
            if (!(isChecked === null || isChecked === void 0 ? void 0 : isChecked.success)) {
                let time_in;
                if (data.work_shift === 'NIGHT') {
                    const checkMoment = handleTimeMoment(data.check_time);
                    // Night shift checkout is not allowed without a previous check-in.
                    // check if checkin time is between 00:00 and 12:00
                    // checkin today is not allowed if checkin time is between 00:00 and 12:00
                    if (checkMoment >= handleTimeMoment('00:00') && checkMoment <= handleTimeMoment('12:00')) {
                        return (0, helpers_1.errorResponse)(res, 200, 'You cannot check out from the night shift because there is no check-in recorded for the previous day. Please contact your supervisor or HR to correct your attendance.');
                    }
                    time_in = moment_1.default
                        .max((0, moment_1.default)(data.check_time, 'HH:mm'), (0, moment_1.default)('20:00', 'HH:mm'))
                        .format('HH:mm');
                }
                else {
                    time_in = moment_1.default
                        .max((0, moment_1.default)(data.check_time, 'HH:mm'), (0, moment_1.default)('08:00', 'HH:mm'))
                        .format('HH:mm');
                }
                const field = {
                    user_id: data.user_id,
                    date: data.date,
                    time_in: time_in,
                    work_shift: data.work_shift,
                    position: position,
                };
                // check if checkin time is after 12:45 for day shift
                // checkin today is not allowed if checkin time is after 12:45 for day shift
                if (field.work_shift === 'DAY' && handleTimeMoment(time_in) >= handleTimeMoment('12:45')) {
                    return (0, helpers_1.errorResponse)(res, 200, 'Checkin time must be before 12:45 for day shift');
                }
                const create_check = yield (0, controllers_1.create_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, controllers_1.findById)(data.user_id);
                    if (user === null || user === void 0 ? void 0 : user.success) {
                        socketIO_1.io.emit('userChecked', {
                            data: {
                                avatar: user === null || user === void 0 ? void 0 : user.data,
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
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.successResponse)(res, 201, create_check === null || create_check === void 0 ? void 0 : create_check.data);
                }
                else {
                    try {
                        const field_notification = {
                            title: 'checkin',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkin unSuccess',
                        };
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.errorResponse)(res, 400, (create_check === null || create_check === void 0 ? void 0 : create_check.message) || 'Failed to create checkin');
                }
            }
            else if ((isChecked === null || isChecked === void 0 ? void 0 : isChecked.success) && !((_g = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _g === void 0 ? void 0 : _g.is_checked)) {
                let time_out;
                let over_time;
                let work_time;
                let time_in = (_h = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _h === void 0 ? void 0 : _h.time_in;
                time_out = (0, moment_1.default)(data.check_time, 'HH:mm').format('HH:mm');
                if (data.work_shift === 'NIGHT') {
                    //START night
                    if (handleTimeMoment(time_out) >=
                        handleTimeMoment('00:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('01:00')) {
                        work_time = moment_1.default
                            .duration((0, moment_1.default)('00:00', 'HH:mm')
                            .add(1, 'day')
                            .diff((0, moment_1.default)(time_in, 'HH:mm')))
                            .asHours();
                        over_time = 0;
                    }
                    else if (handleTimeMoment(time_out) <= NIGHT_END) {
                        work_time =
                            moment_1.default
                                .duration((0, moment_1.default)(time_out, 'HH:mm')
                                .add(1, 'day')
                                .diff((0, moment_1.default)(time_in, 'HH:mm')))
                                .asHours() - 1;
                        over_time = 0;
                    }
                    else if (handleTimeMoment(time_out) > NIGHT_END &&
                        handleTimeMoment(time_out) <= handleTimeMoment('05:15')) {
                        work_time =
                            moment_1.default
                                .duration(NIGHT_END.add(1, 'day').diff(handleTimeMoment(time_in)))
                                .asHours() - 1;
                        over_time = 0;
                    }
                    else if (handleTimeMoment(time_out) >
                        handleTimeMoment('05:15') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('20:00')) {
                        work_time =
                            moment_1.default
                                .duration(NIGHT_END.add(1, 'day').diff(handleTimeMoment(time_in)))
                                .asHours() - 1;
                        over_time = moment_1.default
                            .duration(handleTimeMoment(time_out).diff(handleTimeMoment('05:15')))
                            .asHours();
                    }
                    else {
                        work_time = moment_1.default
                            .duration(handleTimeMoment(time_out).diff(handleTimeMoment(time_in)))
                            .asHours();
                        over_time = 0;
                    }
                    //END NIGHT
                }
                else {
                    //DAY
                    if (handleTimeMoment(time_out) <= handleTimeMoment(time_in)) {
                        work_time =
                            moment_1.default
                                .duration(DAY_END.diff(handleTimeMoment(time_in)))
                                .asHours() - 0.75;
                        over_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out)
                                .add(1, 'day')
                                .diff(DAY_END))
                                .asHours() - 0.25;
                    }
                    else if (handleTimeMoment(time_out) <= handleTimeMoment('12:00')) {
                        work_time = moment_1.default
                            .duration(handleTimeMoment(time_out).diff(handleTimeMoment(time_in)))
                            .asHours();
                        over_time = 0;
                    }
                    else if (handleTimeMoment(time_out) >
                        handleTimeMoment('12:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('12:45')) {
                        work_time = moment_1.default
                            .duration(handleTimeMoment('12:00').diff(handleTimeMoment(time_in)))
                            .asHours();
                        over_time = 0;
                    }
                    else if (handleTimeMoment(time_out) >
                        handleTimeMoment('12:45') &&
                        handleTimeMoment(time_out) <= DAY_END) {
                        work_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out).diff(handleTimeMoment(time_in)))
                                .asHours() - 0.75;
                        over_time = 0;
                    }
                    else if (handleTimeMoment(time_out) > DAY_END &&
                        handleTimeMoment(time_out) <= handleTimeMoment('17:00')) {
                        work_time =
                            moment_1.default
                                .duration(DAY_END.diff(handleTimeMoment(time_in)))
                                .asHours() - 0.75;
                        over_time = 0;
                    }
                    else {
                        work_time =
                            moment_1.default
                                .duration(DAY_END.diff(handleTimeMoment(time_in)))
                                .asHours() - 0.75;
                        over_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out).diff(DAY_END))
                                .asHours() - 0.25;
                    }
                    // day end
                }
                const field = {
                    user_id: data.user_id,
                    date: data.date,
                    time_out: time_out,
                    work_time: handleTime(work_time),
                    over_time: handleTime(over_time),
                    work_shift: data.work_shift,
                    is_checked: true,
                };
                const create_check = yield (0, controllers_1.update_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, controllers_1.findById)(data.user_id);
                    if (user === null || user === void 0 ? void 0 : user.success) {
                        socketIO_1.io.emit('userChecked', {
                            data: {
                                avatar: user === null || user === void 0 ? void 0 : user.data,
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
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.successResponse)(res, 200, undefined, 'Checkout successful');
                }
                else {
                    try {
                        const field_notification = {
                            title: 'checkout',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkout unSuccess',
                        };
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.errorResponse)(res, 400, (create_check === null || create_check === void 0 ? void 0 : create_check.message) || 'Failed to checkout');
                }
            }
            else {
                try {
                    const field_notification = {
                        title: 'checkin',
                        user_id: data.user_id,
                        type: 'ERROR',
                        message: 'checkin exist',
                    };
                    const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                    if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                        throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                    }
                }
                catch (error) {
                    console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                }
                return (0, helpers_1.errorResponse)(res, 400, 'Already checked in');
            }
        }
        else {
            const isChecked = yield (0, controllers_1.is_checked_controller)(check_field);
            if (!(isChecked === null || isChecked === void 0 ? void 0 : isChecked.success)) {
                let time_in;
                if (data.work_shift === 'NIGHT') {
                    const checkMoment = handleTimeMoment(data.check_time);
                    // check if checkin time is between 00:00 and 12:00
                    // checkin today is not allowed if checkin time is between 00:00 and 12:00
                    if (checkMoment >= handleTimeMoment('00:00') && checkMoment <= handleTimeMoment('12:00')) {
                        return (0, helpers_1.errorResponse)(res, 200, 'You cannot check out from the night shift because there is no check-in recorded for the previous day. Please contact your supervisor or HR to correct your attendance.');
                    }
                    time_in = moment_1.default
                        .max((0, moment_1.default)(data.check_time, 'HH:mm'), (0, moment_1.default)('20:00', 'HH:mm'))
                        .format('HH:mm');
                }
                else {
                    time_in = moment_1.default
                        .max((0, moment_1.default)(data.check_time, 'HH:mm'), (0, moment_1.default)('08:00', 'HH:mm'))
                        .format('HH:mm');
                }
                const field = {
                    user_id: data.user_id,
                    date: data.date,
                    time_in: time_in,
                    work_shift: data.work_shift,
                    is_weekend: isWeekend,
                    position: position,
                };
                // check if checkin time is after 12:45 for day shift
                // checkin today is not allowed if checkin time is after 12:45 for day shift
                if (field.work_shift === 'DAY' && handleTimeMoment(time_in) >= handleTimeMoment('12:45')) {
                    return (0, helpers_1.errorResponse)(res, 200, 'Checkin time must be before 12:45 for day shift');
                }
                const create_check = yield (0, controllers_1.create_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, controllers_1.findById)(data.user_id);
                    if (user === null || user === void 0 ? void 0 : user.success) {
                        socketIO_1.io.emit('userChecked', {
                            data: {
                                avatar: user === null || user === void 0 ? void 0 : user.data,
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
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.successResponse)(res, 201, create_check === null || create_check === void 0 ? void 0 : create_check.data);
                }
                else {
                    try {
                        const field_notification = {
                            title: 'checkin weekend',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkin weekend unSuccess',
                        };
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.errorResponse)(res, 400, (create_check === null || create_check === void 0 ? void 0 : create_check.message) || 'Failed to create checkin');
                }
            }
            else if ((isChecked === null || isChecked === void 0 ? void 0 : isChecked.success) && !((_j = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _j === void 0 ? void 0 : _j.is_checked)) {
                let time_out;
                let work_time;
                let time_in = (_k = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _k === void 0 ? void 0 : _k.time_in;
                time_out = (0, moment_1.default)(data.check_time, 'HH:mm').format('HH:mm');
                if (data.work_shift === 'NIGHT') {
                    if (handleTimeMoment(time_out) >=
                        handleTimeMoment('00:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('01:00')) {
                        work_time = moment_1.default
                            .duration(handleTimeMoment('00:00')
                            .add(1, 'day')
                            .diff(handleTimeMoment(time_in)))
                            .asHours();
                    }
                    else if (handleTimeMoment(time_out) <= NIGHT_END) {
                        work_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out)
                                .add(1, 'day')
                                .diff(handleTimeMoment(time_in)))
                                .asHours() - 1;
                    }
                    else if (handleTimeMoment(time_out) > NIGHT_END &&
                        handleTimeMoment(time_out) < handleTimeMoment('05:15')) {
                        work_time =
                            moment_1.default
                                .duration(NIGHT_END.add(1, 'day').diff(handleTimeMoment(time_in)))
                                .asHours() - 1;
                    }
                    else if (handleTimeMoment(time_out) >
                        handleTimeMoment('05:15') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('20:00')) {
                        work_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out)
                                .add(1, 'day')
                                .diff(handleTimeMoment(time_in)))
                                .asHours() - 1.25;
                    }
                    else {
                        work_time = moment_1.default
                            .duration(handleTimeMoment(time_out).diff(handleTimeMoment(time_in)))
                            .asHours();
                    }
                    // night weekend end
                }
                else {
                    // day start weekend
                    if (handleTimeMoment(time_out) <= handleTimeMoment(time_in)) {
                        work_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out)
                                .add(1, 'day')
                                .diff(handleTimeMoment(time_in)))
                                .asHours() - 1.25;
                    }
                    else if (handleTimeMoment(time_out) <= handleTimeMoment('12:00')) {
                        work_time = moment_1.default
                            .duration(handleTimeMoment(time_out).diff(handleTimeMoment(time_in)))
                            .asHours();
                    }
                    else if (handleTimeMoment(time_out) >
                        handleTimeMoment('12:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('12:45')) {
                        work_time = moment_1.default
                            .duration(handleTimeMoment('12:00').diff(handleTimeMoment(time_in)))
                            .asHours();
                    }
                    else if (handleTimeMoment(time_out) >
                        handleTimeMoment('12:45') &&
                        handleTimeMoment(time_out) <= DAY_END) {
                        work_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out).diff(handleTimeMoment(time_in)))
                                .asHours() - 0.75;
                    }
                    else if (handleTimeMoment(time_out) >
                        handleTimeMoment('16:45') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('17:00')) {
                        work_time =
                            moment_1.default
                                .duration(DAY_END.diff(handleTimeMoment(time_in)))
                                .asHours() - 0.75;
                    }
                    else {
                        work_time =
                            moment_1.default
                                .duration(handleTimeMoment(time_out).diff(handleTimeMoment(time_in)))
                                .asHours() - 1;
                    }
                    // end day weekend
                }
                const field = {
                    user_id: data.user_id,
                    date: data.date,
                    time_out: time_out,
                    work_time: handleTime(work_time),
                    over_time: 0,
                    work_shift: data.work_shift,
                    is_checked: true,
                };
                const create_check = yield (0, controllers_1.update_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, controllers_1.findById)(data.user_id);
                    if (user === null || user === void 0 ? void 0 : user.success) {
                        socketIO_1.io.emit('userChecked', {
                            data: {
                                avatar: user === null || user === void 0 ? void 0 : user.data,
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
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.successResponse)(res, 200, undefined, 'Checkout successful');
                }
                else {
                    try {
                        const field_notification = {
                            title: 'checkout weekend',
                            user_id: data.user_id,
                            type: 'ERROR',
                            message: 'checkout weekend unSuccess',
                        };
                        const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                        if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                            throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                        }
                    }
                    catch (error) {
                        console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                    }
                    return (0, helpers_1.errorResponse)(res, 400, (create_check === null || create_check === void 0 ? void 0 : create_check.message) || 'Failed to checkout');
                }
            }
            else {
                try {
                    const field_notification = {
                        title: 'checkin in weekend',
                        user_id: data.user_id,
                        type: 'ERROR',
                        message: 'checkin exist',
                    };
                    const notification = yield (0, useCases_1.create_notification_usecase)(field_notification);
                    if (!(notification === null || notification === void 0 ? void 0 : notification.success)) {
                        throw new Error(notification === null || notification === void 0 ? void 0 : notification.message);
                    }
                }
                catch (error) {
                    console.log(`notification: ${error === null || error === void 0 ? void 0 : error.message}`);
                }
                return (0, helpers_1.errorResponse)(res, 400, 'Already checked in');
            }
        }
    }
    catch (error) {
        return (0, helpers_1.errorResponse)(res, 500, (error === null || error === void 0 ? void 0 : error.message) || 'Internal server error');
    }
}));
exports.default = createCheckin;
