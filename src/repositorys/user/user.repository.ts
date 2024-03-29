import { User, Department } from '../../models';
import { Op } from 'sequelize';

const userCreate = async (user: any) => {
    try {
        const new_user: User | null = await User.create({
            ...user,
        });
        if (new_user != null) {
            return {
                success: true,
                data: new_user,
            };
        } else {
            return {
                success: false,
                message: 'create user error',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const userUpdate = async (user: any) => {
    try {
        const updateFields = {
            ...user,
        };
        const new_user_updated = await User.update(updateFields, {
            where: {
                id: updateFields.id,
            },
        });
        if (new_user_updated.toString() === '1') {
            return {
                success: true,
            };
        } else {
            return {
                success: false,
                message: 'update user error',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const userDelete = async (id: string) => {
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
        if (userBeforeDelete.toString() === '1') {
            const userDel = await User.destroy({
                where: {
                    id: id,
                },
            });
            if (userDel === 1) {
                return {
                    success: true,
                    data: userDel,
                };
            } else {
                return {
                    success: false,
                    message: 'delete user error repo',
                };
            }
        } else {
            return {
                success: false,
                message: 'delete user error',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const userFindById = async (id: string) => {
    try {
        const user: User | null = await User.findByPk(id, {
            attributes: [
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
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['name'],
                },
            ],
        });
        if (user != null) {
            return {
                success: true,
                data: user,
            };
        } else {
            return {
                success: false,
                message: 'not found user',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const userFindByName = async (name: string) => {
    try {
        const user: User[] | null = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`,
                },
            },
            attributes: [
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
        if (user != null) {
            return {
                success: true,
                data: user,
            };
        } else {
            return {
                success: false,
                message: 'not found user',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const userFindAll = async () => {
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
        if (users != null) {
            return {
                success: true,
                data: users,
            };
        } else {
            return {
                success: false,
                message: 'not found user',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export {
    userCreate,
    userUpdate,
    userDelete,
    userFindById,
    userFindByName,
    userFindAll,
};
