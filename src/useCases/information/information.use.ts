import { create_infomation_repo } from '../../repositorys/infomation/infomation.repo';
import { create_infomation } from '../../interfaces/infomation/infomation.interface';
import { validate_create_information } from '../../validates/infomation/infomation.validate';
import { findUserById } from '../user/user.useCase';
const create_information_use = async (value: create_infomation) => {
    try {
        const valid = validate_create_information(value);
        if (!valid?.error) {
            const user_created = await findUserById(value.user_id);
            if (user_created?.success) {
                let position = user_created?.data?.position;
                const info_value = {
                    ...value,
                    position: position,
                };
                const newInfomation = await create_infomation_repo(info_value);
                if (newInfomation?.success) {
                    return {
                        success: true,
                        data: newInfomation?.data,
                    };
                } else {
                    return {
                        success: false,
                        message: newInfomation?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'user not exits',
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
};

export { create_information_use };
