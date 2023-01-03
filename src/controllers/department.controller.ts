import { departmentCreate } from '../useCases/department.useCase'
import { Department } from '../models';


export const createDep = async (department: Department) => {
    return await departmentCreate(department);
};   
