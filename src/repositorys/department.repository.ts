import { Department, User } from '../models';

const createDepartment = async (data: any) => {
    try {
        const new_department =  await Department.create({
            name: data.name,
        });
    
        if(new_department) {
            return new_department;
        }else {
            return {
                success: false,
                message: 'create department error'
            }
        }
    } catch (error) {
        return {
            error: true,
            message: 'data error',
        };
    }
   
};

const departmentList = async () => {
    return await Department.findAll();
};

const getDepartmentById = async (id: string) => {
    try {

        const dep:  Department | null = await Department.findOne({
            where: {
                id : id,
            },
            attributes: ['name']
        });
        if(dep != null) {
            return {
                success: true,
                data: dep
            }
        }else {
            return {
                success: false,
                message: 'department not found'
            }
        }
        
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

export { createDepartment, departmentList, getDepartmentById };
