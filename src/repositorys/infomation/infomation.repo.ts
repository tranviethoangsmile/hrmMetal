import { Information, User, Department } from '../../models';

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
            success: false,
            message: error.message,
        };
    }
};

const search_information_of_user_repo = async (id: any) => {
    try {
        const informations: Information[] | null = await Information.findAll({
            where: {
                user_id: id,
            },
            attributes: [
                'id',
                'title',
                'content',
                'date',
                'media',
                'position',
                'is_public',
                'is_video',
                'is_check_safety',
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'role'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if (informations != null) {
            return {
                success: true,
                data: informations,
            };
        } else {
            return {
                success: false,
                message: 'No information found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const search_information_by_id_repo = async (id: string) => {
    try {
        const information: Information | null = await Information.findOne({
            where: {
                id: id,
            },
            attributes: [
                'id',
                'title',
                'content',
                'date',
                'media',
                'position',
                'is_public',
                'is_video',
                'is_check_safety',
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'role'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if (information !== null) {
            return {
                success: true,
                data: information,
            };
        } else {
            return {
                success: false,
                message: 'not exist information',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const search_information_all_with_field_repo = async (field: any) => {
    try {
        const informations: Information[] | null = await Information.findAll({
            where: {
                ...field,
            },
            attributes: [
                'id',
                'title',
                'content',
                'date',
                'media',
                'position',
                'is_public',
                'is_video',
                'is_check_safety',
            ],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'role', 'avatar'],
                },
            ],
        });
        if (informations !== null) {
            return {
                success: true,
                data: informations,
            };
        } else {
            return {
                success: true,
                message: 'informations not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const delete_information_by_id_repo = async (id: string) => {
    try {
        const result = await Information.destroy({ where: { id } });
        if (result === 1) {
            return {
                success: true,
                message: 'delete information successfully',
            };
        } else {
            return {
                success: false,
                message: 'delete not successfull, please try again later',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export {
    create_infomation_repo,
    search_information_of_user_repo,
    search_information_by_id_repo,
    search_information_all_with_field_repo,
    delete_information_by_id_repo,
};
