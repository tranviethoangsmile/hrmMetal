import { User, Department } from '../models/index';
import { getDepartmentById } from './department.repository';

interface UpdateField {
     id: number;
     name?: string;
     email?: string;
     password?: string;
     dob?: string;
     phone?: string;
     avatar?: string;
     ic_id?: string;
     employee_id?: number;
     is_active?: boolean;
     is_admin?: boolean;
     role?: string;
     position?: string;
     department_id?: string;

     department?: Department;
}
const userCreate = async (user: any) => {
    try {
        const departmentOfUser = await getDepartmentById(user.department_id);
        if (departmentOfUser) {
            const new_user = await User.create({
                name: user.name,
                email: user.email,
                password: user.password,
                dob: user.dob,
                phone: user.phone,
                avatar: user.avatar,
                ic_id: user.ic_id,
                employee_id: user.employee_id,
                is_active: user.is_active,
                is_admin: user.is_admin,
                role: user.role,
                possition: user.position,
                department_id: user.department_id,
                department: departmentOfUser,
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
        return {
            error: true,
            message: 'user exists',
        };
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
                id: user.id
            }
        })
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
            message: 'update error',
        }
    }
    // try {
    //     const departmentOfUser = await getDepartmentById(user.department_id);
    //     const new_user_updated = await User.update(
    //         {
    //             name: user.name,
    //             email: user.email,
    //             password: user.password,
    //             dob: user.dob,
    //             phone: user.phone,
    //             avatar: user.avatar,
    //             ic_id: user.ic_id,
    //             employee_id: user.employee_id,
    //             is_active: user.is_active,
    //             is_admin: user.is_admin,
    //             role: user.role,
    //             possition: user.position,
    //             department_id: user.department_id,
    //             department: departmentOfUser,
    //         },
    //         {
    //             where: {
    //                 id: user.id,
    //             },
    //         },
    //     );
    //     if (new_user_updated) {
    //         return new_user_updated;
    //     } else {
    //         return {
    //             success: false,
    //             message: 'update user error',
    //         };
    //     }
    // } catch (error) {
    //     return {
    //         error: true,
    //     };
    // }
};

export { userCreate, userUpdate };
