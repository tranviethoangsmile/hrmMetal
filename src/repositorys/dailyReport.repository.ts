import { CodeError, DailyReport, User } from '../models';
import { create_daily_report } from '../interfaces/dailyReport.interface';
import { userFindById } from './user.repository';
import { assert } from '@hapi/joi';
import Department from '../models/department.model';

const daily_report_create = async (data: DailyReport) => {
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

const find_report_all = async () => {
    try {
        const reports = await DailyReport.findAll({
            attributes: [
                'product',
                'date',
                'shift',
                'quantity',
                'operated_time',
                'shutdown_time',
                'active_time',
                'operator_history',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
                {
                    model: CodeError,
                    attributes: [
                        'code',
                        'description',
                        'shutdown_time',
                        'daily_report_id',
                    ],
                },
            ],
        });
        console.log(reports);
        if (reports.length != null) {
            return {
                success: true,
                reports,
            };
        } else {
            return {
                success: false
            };
        }
    } catch (error) {
        return {
            error,
        };
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

export { daily_report_create, find_daily_report_by_id, find_report_all };
