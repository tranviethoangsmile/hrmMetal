import {
    createDepartment,
    departmentList,
    getDepartmentById
} from '../repositorys/department.repository';
import { Department } from '../models';
import { validation_department_create, validation_department_find_by_id } from '../helper/validate.helper';

const departmentCreate = async (department: Department) => {
    const data = await validation_department_create(department);
    console.log(data);
    if (!data.error) {
        const newDepartment = await createDepartment(data.value);
    } else {
        return {
            error: true,
            message: 'data error',
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
