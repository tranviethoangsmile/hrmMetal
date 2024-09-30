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
const checkin_controller_1 = require("../../../controllers/checkin/checkin.controller");
const createCheckin = (0, express_1.Router)();
const socketIO_1 = require("../../../socket/socketIO");
const user_controller_1 = require("../../../controllers/user/user.controller");
const useCases_1 = require("../../../useCases");
createCheckin.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
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
        const data = req.body;
        if (!data ||
            !(data === null || data === void 0 ? void 0 : data.check_time) ||
            !(data === null || data === void 0 ? void 0 : data.date) ||
            !(data === null || data === void 0 ? void 0 : data.user_id) ||
            !(data === null || data === void 0 ? void 0 : data.work_shift)) {
            throw new Error('data not empty');
        }
        const check_field = {
            user_id: data.user_id,
            date: data.date,
        };
        const isWeekend = (0, moment_1.default)(data.date, 'YYYY-MM-DD').isoWeekday() === 6 ||
            (0, moment_1.default)(data.date, 'YYYY-MM-DD').isoWeekday() === 7;
        if (!isWeekend) {
            const isChecked = yield (0, checkin_controller_1.is_checked_controller)(check_field);
            if (!(isChecked === null || isChecked === void 0 ? void 0 : isChecked.success)) {
                let time_in;
                if (data.work_shift === 'NIGHT') {
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
                };
                const create_check = yield (0, checkin_controller_1.create_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, user_controller_1.findById)(data.user_id);
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
                    return res.status(201).json({
                        success: true,
                        data: create_check === null || create_check === void 0 ? void 0 : create_check.data,
                    });
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
                    return res.status(200).json({
                        success: false,
                        message: create_check === null || create_check === void 0 ? void 0 : create_check.message,
                    });
                }
            }
            else if ((isChecked === null || isChecked === void 0 ? void 0 : isChecked.success) && !((_a = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _a === void 0 ? void 0 : _a.is_checked)) {
                let time_out;
                let over_time;
                let work_time;
                let time_in = (_b = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _b === void 0 ? void 0 : _b.time_in;
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
                const create_check = yield (0, checkin_controller_1.update_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, user_controller_1.findById)(data.user_id);
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
                    return res.status(202).json({
                        success: true,
                    });
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
                    return res.status(200).json({
                        success: false,
                        message: create_check === null || create_check === void 0 ? void 0 : create_check.message,
                    });
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
                return res.status(202).json({
                    success: !(isChecked === null || isChecked === void 0 ? void 0 : isChecked.success),
                    message: 'checked',
                });
            }
        }
        else {
            const isChecked = yield (0, checkin_controller_1.is_checked_controller)(check_field);
            if (!(isChecked === null || isChecked === void 0 ? void 0 : isChecked.success)) {
                let time_in;
                if (data.work_shift === 'NIGHT') {
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
                };
                const create_check = yield (0, checkin_controller_1.create_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, user_controller_1.findById)(data.user_id);
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
                    return res.status(201).json({
                        success: true,
                        data: create_check === null || create_check === void 0 ? void 0 : create_check.data,
                    });
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
                    return res.status(200).json({
                        success: false,
                        message: create_check === null || create_check === void 0 ? void 0 : create_check.message,
                    });
                }
            }
            else if ((isChecked === null || isChecked === void 0 ? void 0 : isChecked.success) && !((_c = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _c === void 0 ? void 0 : _c.is_checked)) {
                let time_out;
                let work_time;
                let time_in = (_d = isChecked === null || isChecked === void 0 ? void 0 : isChecked.data) === null || _d === void 0 ? void 0 : _d.time_in;
                time_out = (0, moment_1.default)(data.check_time, 'HH:mm').format('HH:mm');
                // Night start  weekend from 22:30 ---------------------------------
                if (data.work_shift === 'NIGHT') {
                    if (handleTimeMoment(time_out) >=
                        handleTimeMoment('00:00') &&
                        handleTimeMoment(time_out) <= handleTimeMoment('01:00')) {
                        console.log('here');
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
                const create_check = yield (0, checkin_controller_1.update_checkin_controller)(field);
                if (create_check.success) {
                    const user = yield (0, user_controller_1.findById)(data.user_id);
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
                    return res.status(202).json({
                        success: true,
                    });
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
                    return res.status(200).json({
                        success: false,
                        message: create_check === null || create_check === void 0 ? void 0 : create_check.message,
                    });
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
                return res.status(200).json({
                    success: false,
                    message: 'checked',
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error: ' + (error === null || error === void 0 ? void 0 : error.message),
        });
    }
}));
exports.default = createCheckin;
