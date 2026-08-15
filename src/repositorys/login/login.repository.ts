import bcrypt from 'bcrypt';
import { Department, User } from '../../models';
import jwt from 'jsonwebtoken';
import { token_payload } from '../../interfaces';
import { ILoginRepository } from '../interfaces';
import { getJwtSecret } from '../../securitys/auth/jwtSecret';

class LoginRepository implements ILoginRepository {
    async login(user: any) {
        try {
            const user_name = user.user_name;
            const password = user.password;
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
                role: user_login?.dataValues.role,
                department_id: user_login?.dataValues.department_id,
            };
            if (!pass) {
                throw new Error(`Password wrong...!!!`);
            }
            const payload = {
                ...user_payload,
            };
            const token = jwt.sign(payload, getJwtSecret(), {
                expiresIn: '2h',
            });
            return {
                success: true,
                data: payload,
                token: token,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
}

export default LoginRepository;
