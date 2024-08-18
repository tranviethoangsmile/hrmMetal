import { Information, User, Department } from '../../models';
import { IInformationRepository } from '../interfaces';

class InformationRepository implements IInformationRepository {
    async create_information_repo(value: any) {
        try {
            const newInfomation: Information | null = await Information.create({
                ...value,
            });
            if (newInfomation === null) {
                throw new Error(`create infomation unSuccessful`);
            }
            return {
                success: true,
                data: newInfomation,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async search_information_of_user_repo(id: any) {
        try {
            const informations: Information[] | null =
                await Information.findAll({
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
                        'is_event',
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
            if (informations === null) {
                throw new Error(`information not found`);
            }
            return {
                success: true,
                data: informations,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async search_information_by_id_repo(id: string) {
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
                    'is_event',
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
            if (information === null) {
                throw new Error(`information not exist`);
            }
            return {
                success: true,
                data: information,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async search_information_all_with_field_repo(field: any) {
        try {
            const informations: Information[] | null =
                await Information.findAll({
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
                        'is_event',
                    ],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'role', 'avatar'],
                        },
                    ],
                });
            if (informations === null) {
                throw new Error(`information not found`);
            }
            return {
                success: true,
                data: informations,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async delete_information_by_id_repo(id: string) {
        try {
            const result = await Information.destroy({ where: { id } });
            if (result === 1) {
                return {
                    success: true,
                };
            } else {
                throw new Error(
                    `delete not successfull, please try again later`,
                );
            }
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }
}
export default InformationRepository;
