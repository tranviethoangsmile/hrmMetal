import {
    createDepartment,
    departmentList,
    getDepartmentById,
} from '../repositorys/department.repository';
import { validation_department_create } from '../validates/department.validate';
import { validation_id } from '../validates';

const departmentCreate = async (data: any ) => {
    try {
        const valid = await validation_department_create(data);
        if (!valid.error) {
            const newDepartment = await createDepartment(data);
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
    } catch (error) {
        return {
            success: false,
            message: error,
        };
    }
};

const getDepartmentList = async () => {
    try {
        const departments = await departmentList();
        if(departments?.success) {
            return {
                success: true,
                data: departments?.data
            }
        }else {
            return {
                success: false,
                message: departments?.message
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
    const allDep = await departmentList();
    if (allDep) {
        return allDep;
    } else {
        return {
            error: true,
            message: 'data error',
        };
    }
};

const getDepById = async (id: string) => {
    try {
        const validId = validation_id(id);
        if (!validId.error) {
            const department = await getDepartmentById(id);
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
    } catch (error) {
        return {
            success: false,
            message: error 
        }
    }
};

export { departmentCreate, getDepartmentList, getDepById };
