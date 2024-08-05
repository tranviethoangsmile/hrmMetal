import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Department, User } from '../../models';
import jwt from 'jsonwebtoken';
import { token_payload } from '../../interfaces/login/login.interface';
import { ILoginRepository } from './interfaces/ILoginRepository';
dotenv.config();
const SECRET: string = process.env.SECRET || '';

class LoginRepository implements ILoginRepository {
    async login(user: any) {
        try {
            const user_name = user.user_name;
            const password = user.password;
            console.log(user_name, password);
            const user_login: User | null = await User.findOne({
                where: {
                    user_name: user_name,
                    is_active: true,
                },
                attributes: [
                    'id',
                    'name',
                    'user_name',
                    'avatar',
                    'dob',
                    'role',
                    'password',
                    'position',
                    'role',
                    'is_admin',
                    'is_officer',
                    'department_id',
                    'is_offical_staff',
                    'salary_hourly',
                    'begin_date',
                    'shift_night_pay',
                    'travel_allowance_pay',
                    'paid_days',
                    'employee_id',
                ],
                include: [
                    {
                        model: Department,
                        as: 'department',
                        attributes: ['name'],
                    },
                ],
            });
            if (user_login === null) {
                throw new Error('user not exist in system or deleted');
            }
            const pass = await bcrypt.compare(password, user_login.password);
            const user_payload: token_payload = {
                id: user_login?.dataValues.id,
                name: user_login?.dataValues.name,
                user_name: user_login?.dataValues.user_name,
                avatar: user_login?.dataValues.avatar,
                position: user_login?.dataValues.position,
                dob: user_login?.dataValues.dob,
                role: user_login?.dataValues.role,
                is_admin: user_login?.dataValues.is_admin,
                department: user_login?.dataValues.department,
                is_officer: user_login?.dataValues.is_officer,
                department_id: user_login?.dataValues.department_id,
                is_offical_staff: user_login?.dataValues.is_offical_staff,
                salary_hourly: user_login?.dataValues.salary_hourly,
                shift_night_pay: user_login?.dataValues.shift_night_pay,
                travel_allowance_pay:
                    user_login?.dataValues.travel_allowance_pay,
                paid_days: user_login?.dataValues.paid_days,
                begin_date: user_login?.dataValues.begin_date,
                employee_id: user_login?.dataValues.employee_id,
            };
            if (!pass) {
                throw new Error(`Password wrong...!!!`);
            }
            const secret = crypto
                .createHash('sha256')
                .update(SECRET)
                .digest('hex');
            const payload = {
                ...user_payload,
            };
            const token = jwt.sign(payload, secret);
            return {
                success: true,
                data: payload,
                token: token,
            };
        } catch (error: any) {
            console.log(error);
            return {
                success: false,
                message: error?.message,
            };
        }
    }
}

export default LoginRepository;
