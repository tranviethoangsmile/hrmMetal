import { Department } from '../models';

export const createDepartment = async (data : any) => {
    return await Department.create({
        name: data.name,
    });
};

module.exports = { createDepartment };