import { createDepartment } from '../repositorys/department.repository';
import { Department } from '../models';
import { validation } from '../helper/validate.helper';

const departmentCreate = async (department: Department) => {
    const data = await validation(department);
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

export { departmentCreate };
