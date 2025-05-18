import { validation_id, validation_department_create } from '../../validates';
import { DepartmentRepository } from '../../repositorys';

const departmentRepository = new DepartmentRepository();
const departmentCreate = async (data: any) => {
    try {
        const valid = validation_department_create(data);
        if (valid?.error) {
            throw new Error(valid?.error.message);
        }
        const newDepartment = await departmentRepository.createDepartment(data);
        if (!newDepartment?.success) {
            throw new Error(newDepartment?.message);
        }
        return {
            success: true,
            data: newDepartment?.data,
        };
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
        if (!departments?.success) {
            throw new Error(departments?.message);
        }
        return {
            success: true,
            data: departments?.data,
        };
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
        if (validId.error) {
            throw new Error(validId?.error.message);
        }
        const department = await departmentRepository.getDepartmentById(id);
        if (!department?.success) {
            throw new Error(department?.message);
        }
        return {
            success: true,
            data: department?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { departmentCreate, getDepartmentList, getDepById };
