import { validation_department_create } from '../../validates/department/department.validate';
import { validation_id } from '../../validates';
import { DepartmentRepository } from '../../repositorys';

const departmentRepository = new DepartmentRepository();
const departmentCreate = async (data: any) => {
    try {
        const valid = await validation_department_create(data);
        if (!valid.error) {
            const newDepartment = await departmentRepository.createDepartment(
                data,
            );
            if (newDepartment?.success) {
                return {
                    success: true,
                    data: newDepartment?.data,
                };
            } else {
                return {
                    success: false,
                    message: newDepartment?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const getDepartmentList = async () => {
    try {
        const departments = await departmentRepository.departmentList();
        if (departments?.success) {
            return {
                success: true,
                data: departments?.data,
            };
        } else {
            return {
                success: false,
                message: departments?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const getDepById = async (id: string) => {
    try {
        const validId = validation_id(id);
        if (!validId.error) {
            const department = await departmentRepository.getDepartmentById(id);
            if (department?.success) {
                return {
                    success: true,
                    data: department?.data,
                };
            } else {
                return {
                    success: false,
                    message: department?.message,
                };
            }
        } else {
            return {
                success: false,
                message: validId.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { departmentCreate, getDepartmentList, getDepById };
