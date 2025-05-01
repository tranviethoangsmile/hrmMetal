import { User, Department } from '../../models';
import { IUserRepository } from '../interfaces';
import { Op } from 'sequelize';
class UserRepository implements IUserRepository {
    async userCreate(user: any) {
        try {
            const new_user: User | null = await User.create({
                ...user,
            });
            if (new_user === null) {
                throw new Error(`create new user error`);
            }
            return {
                success: true,
                data: new_user,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async userUpdate(field: any) {
        try {
            const updateFields = {
                ...field,
            };
            const new_user_updated = await User.update(updateFields, {
                where: {
                    id: updateFields.id,
                },
            });
            if (new_user_updated.toString() !== '1') {
                throw new Error(`update user error`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: `repo: ${error?.message}`,
            };
        }
    }

    async userDelete(id: string) {
        try {
            const userBeforeDelete = await User.update(
                {
                    is_active: false,
                },
                {
                    where: {
                        id: id,
                    },
                },
            );
            if (userBeforeDelete.toString() !== '1') {
                throw new Error(
                    `delete user error because cannot update active to false`,
                );
            }
            const userDel = await User.destroy({
                where: {
                    id: id,
                },
            });
            if (userDel !== 1) {
                throw new Error(`delete user error repo`);
            }
            return {
                success: true,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
    async getUserForLeaveFeatureRepo(department_id: string) {
        try {
            const listUser: User[] | null = await User.findAll({
                where: {
                    department_id: department_id,
                    role: {
                        [Op.ne]: 'STAFF',
                    },
                },
                attributes: ['id', 'name'],
            });
            if (listUser === null) {
                throw new Error(`user not found`);
            }
            return {
                success: true,
                data: listUser,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.message,
            };
        }
    }

    async userFindById(id: string) {
        try {
            const user: User | null = await User.findByPk(id, {
                attributes: [
                    'id',
                    'name',
                    'user_name',
                    'email',
                    'dob',
                    'phone',
                    'role',
                    'employee_id',
                    'department_id',
                    'is_active',
                    'position',
                    'is_admin',
                    'avatar',
                    'is_officer',
                ],
            });

            if (user === null) {
                throw new Error(`user not found`);
            }
            return {
                success: true,
                data: user,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
    async userFindByName(name: string) {
        try {
            const users: User[] | null = await User.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,
                    },
                },
                attributes: [
                    'id',
                    'name',
                    'user_name',
                    'email',
                    'dob',
                    'phone',
                    'employee_id',
                    'department_id',
                    'is_active',
                    'position',
                    'is_admin',
                    'is_officer',
                ],
            });
            if (users === null || User.length < 1) {
                throw new Error(`user not found`);
            }
            return {
                success: true,
                data: users,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
    async userFindAllWithFieldRepo(field: any) {
        try {
            const users: User[] | null = await User.findAll({
                where: { ...field },
                attributes: [
                    'id',
                    'name',
                    'user_name',
                    'role',
                    'email',
                    'dob',
                    'phone',
                    'employee_id',
                    'is_active',
                    'position',
                    'is_admin',
                    'is_officer',
                    'avatar',
                ],
                include: [
                    {
                        model: Department,
                        as: 'department',
                        attributes: ['name'],
                    },
                ],
            });
            if (users === null) {
                throw new Error(`user not found`);
            }
            return {
                success: true,
                data: users,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
    async userFindAll() {
        try {
            const users: User[] | null = await User.findAll({
                attributes: [
                    'id',
                    'name',
                    'user_name',
                    'role',
                    'email',
                    'dob',
                    'phone',
                    'employee_id',
                    'is_active',
                    'position',
                    'is_admin',
                    'is_officer',
                ],
                include: [
                    {
                        model: Department,
                        as: 'department',
                        attributes: ['name'],
                    },
                ],
            });
            if (users === null || users.length < 1) {
                throw new Error(`user not found`);
            }
            return {
                success: true,
                data: users,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error?.message,
            };
        }
    }
}

export default UserRepository;
