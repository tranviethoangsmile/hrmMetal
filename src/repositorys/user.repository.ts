import { User, Department } from '../models';
import { Op } from 'sequelize';

const userCreate = async (user: any) => {
    try {
        const new_user = await User.create({
            ...user
        });
        if (new_user) {
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
    } catch (error) {
        return {
            success: false,
            message: error,
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
        if (userBeforeDelete) {
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
    } catch (error) {
        return {
            error,
        };
    }
};

const userFindById = async (id: string) => {
    try {
        const user = await User.findByPk(id, {
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
            ],
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['name'],
                },
            ],
        });
        if (user) {
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
    } catch (error) {
        return {
            error,
        };
    }
};

const userFindByName = async (name: string) => {
    try {
        const user = await User.findAll({
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
            ],
        });
        if (user) {
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
    } catch (error) {
        return {
            error,
        };
    }
};

const userFindAll = async () => {
    try {
        const users = await User.findAll({
            attributes: [
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
            ],
            include: [
                {
                    model: Department,
                    as: 'department',
                    attributes: ['name'],
                },
            ],
        });
        if (users.length > 0) {
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
    } catch (error) {
        return {
            error,
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
