import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { User } from '../models';
import jwt  from 'jsonwebtoken';
import { token_payload } from '../interfaces/login.interface'
dotenv.config();
const SECRET: string = process.env.SECRET || 'secret';
const login = async (user: any) => {
    try {
        const user_name = user.user_name;
        const password = user.password;
        const user_login = await User.findOne({
            where: {
                user_name: user_name,
            },
            attributes: [
                'id',
                'user_name',
                'password',
                'position',
                'role',
                'is_admin',
            ]
        });
       
        if(user_login != null) {
            const user_payload: token_payload = {
                id: user_login?.dataValues.id,
                user_name: user_login?.dataValues.user_name,
                position: user_login?.dataValues.ppsition,
                role: user_login?.dataValues.role,
                is_admin: user_login?.dataValues.is_admin
            }; 
            const pass = await bcrypt.compare(password, user_login.password);
            if(pass) {
                const secret = crypto.createHash('sha256').update(SECRET).digest('hex')
                const payload = {
                    ...user_payload,
                };
                const token = jwt.sign(payload, secret);
                console.log(token);
                return {
                    success: true,
                    token,
                }
            }else {
                return {
                    success: false,
                    message: 'Password wrong...'
                }
            }
        }else {
            return {
                success: false,
                message: 'user not found'
            }
        }
    } catch (error) {
        return {
            success: false,
        }
    }
}

export { login }