import { Information } from '../../models';

const create_infomation_repo = async (value: any) => {
    try {
        const newInfomation: Information | null = await Information.create({
            ...value,
        });
        if (newInfomation != null) {
            return {
                success: true,
                data: newInfomation,
            };
        } else {
            return {
                success: false,
                message: 'create infomation unSuccessful',
            };
        }
    } catch (error: any) {
        return {
            suceess: false,
            message: error.message,
        };
    }
};

export { create_infomation_repo };
