import { Department, User } from '../models';

const createDepartment = async (data: any) => {
    return await Department.create({
        name: data.name,
    });
};

const departmentList = async () => {
    return await Department.findAll();
};

const getDepartmentById = async (id: string) => {
    return await Department.findOne({
        where: {
            id : id,
        },
        include: [
            {
                model: User,
                as: 'users',
                attributes: ['id', 'name', 'dob', 'phone','email', 'avatar']
            }
        ]
    });
}

export { createDepartment, departmentList, getDepartmentById };
