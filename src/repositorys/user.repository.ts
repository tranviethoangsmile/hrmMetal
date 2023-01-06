import { User, Department } from '../models';
import { getDepartmentById } from './department.repository';
import { UpdateField, CreateField } from '../interfaces/user.interface';
import { Op } from 'sequelize';

const userCreate = async (user: any) => {
    try {
        const departmentOfUser = await getDepartmentById(user.department_id);
        if (departmentOfUser) {
            const createField: CreateField = {
                ...user,
                department: departmentOfUser,
            };
            const new_user = await User.create({
                ...createField,
            });
            if (new_user) {
                return new_user;
            } else {
                return {
                    success: false,
                    message: 'create user error',
                };
            }
        } else {
            return {
                success: false,
                message: 'department not exists',
            };
        }
    } catch (error) {
        return error;
    }
};

const userUpdate = async (user: any) => {
    try {
        const departmentOfUser = await getDepartmentById(user.department_id);
        const updateFields: UpdateField = {
            ...user,
            department: departmentOfUser,
        };
        const new_user_updated = await User.update(updateFields, {
            where: {
                id: user.id,
            },
        });
        if (new_user_updated) {
            return new_user_updated;
        } else {
            return {
                success: false,
                message: 'update user error',
            };
        }
    } catch (error) {
        return {
            error: true,
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
                return userDel;
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
    } catch {
        return {
            error: true,
            message: 'delete user error',
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
        console.log(user);
        if (user) {
            return user;
        } else {
            return {
                success: false,
                message: 'not found user',
            };
        }
    } catch (error) {
        return {
            message: error,
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
        console.log('user >>', user);
        if (user) {
            return user;
        } else {
            return {
                success: false,
                message: 'not found user',
            };
        }
    } catch (error) {
        return {
            message: error,
        };
    }
};

const userFindAll = async () => {
    try {
        const users = await User.findAll({
            attributes: [
                'name',
                'user_name',
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
            message: error,
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
