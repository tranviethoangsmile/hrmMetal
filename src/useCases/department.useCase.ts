import {
    createDepartment,
    departmentList,
    getDepartmentById
} from '../repositorys/department.repository';
import { Department } from '../models';
import { validation_department_create, validation_department_find_by_id } from '../helper/department.validate.helper';

const departmentCreate = async (department: Department) => {
    try {
        const data = await validation_department_create(department);
    if (!data.error) {
        const newDepartment = await createDepartment(data.value);
        if(newDepartment) {
            return newDepartment;
        }else {
            return {
                error: "nothing error"
            }
        }
    } else {
        return {
            error: true,
            message: 'data error',
        };
    }
    } catch (error) {
        return {
            error: true,
            message: 'create department error',
        };
    }
    
};

const getDepartmentList = async () => {
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
    const validId = await validation_department_find_by_id(id);
    if (!validId.error) {
        const dep = await getDepartmentById(id);
        return dep;
    }else {
        return {
            error: true,
            message: 'id error',
        };
    }
}

export { departmentCreate, getDepartmentList, getDepById };
