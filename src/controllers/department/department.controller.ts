import {
    departmentCreate,
    getDepartmentList,
    getDepById,
} from '../../useCases/department/department.useCase';
import { Department } from '../../models';

const createDep = async (department: any) => {
    return await departmentCreate(department);
};

const departmentList = async () => {
    return getDepartmentList();
};

const getDepartmentById = async (id: string) => {
    return await getDepById(id);
};

export { createDep, departmentList, getDepartmentById };
