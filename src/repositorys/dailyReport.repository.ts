import { DailyReport, User } from '../models';
import { create_daily_report } from '../interfaces/dailyReport.interface';
import { userFindById } from './user.repository';
import { assert } from '@hapi/joi';
const daily_report_create = async (data: DailyReport ) => {
    try {
        const user = await userFindById(data.user_id);
        if (user) {
            const new_daily_report = await DailyReport.create({
                ...data,
                user,
            });
            if (new_daily_report) {
                return new_daily_report?.dataValues;
            } else {
                return {
                    success: false,
                    message: 'create not success',
                };
            }
        } else {
            return {
                success: false,
                message: 'user not found in daily report',
            };
        }
    } catch (error) {
        return error;
    }
};

const find_daily_report_by_id = async (id: string) => {
    const rp = await DailyReport.findOne({
        where: {
            id,
        },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['name'],
            },
        ],
    });
    assert(rp, 'not found');
    return rp;
    // return await DailyReport.findOne({
    //     where: {
    //         id: id
    //     },
    //     include: [
    //         {
    //             model: User,
    //             as: 'user',
    //             attributes: [
    //                 'name'
    //             ]
    //         }
    //     ]
    // })
    // try {
    //     const rp = await DailyReport.findOne({
    //         where: {
    //             id: id
    //         },
    //         include: [
    //             {
    //                 model: User,
    //                 as: 'user',
    //                     attributes: [
    //                         'name'
    //                     ]
    //             }
    //         ]
    //     })
    //     if(rp) {
    //         return rp;
    //     }else {
    //         return({
    //             success: false,
    //             message: 'not found'
    //         })
    //     }
    // } catch (error) {
    //     return error
    // }
};

export { daily_report_create, find_daily_report_by_id };
