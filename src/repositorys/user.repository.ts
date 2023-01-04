import { User, Department } from '../models/index';
import { getDepartmentById } from './department.repository';
const userCreate = async (user: any) => {
    const departmentOfUser = await getDepartmentById(user.department_id);
    console.log(user)
    if (departmentOfUser) {
        const new_user = await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            dob: user.dob,
            phone: user.phone,
            avatar: user.avatar,
            employee_id: user.employee_id,
            is_active: user.is_active,
            is_admin: user.is_admin,
            role: user.role,
            possition: user.position,
            department_id: user.department_id,
            department: departmentOfUser
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
};

export { userCreate };
