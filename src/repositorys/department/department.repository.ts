import { Department } from '../../models';

const createDepartment = async (data: any) => {
    try {
        const new_department = await Department.create({
            name: data.name,
        });
        if (new_department) {
            return {
                success: true,
                data: new_department,
            };
        } else {
            return {
                success: false,
                message: 'create department error',
            };
        }
    } catch (error: any) {
        return {
            success: true,
            message: error?.message,
        };
    }
};

// fix
const departmentList = async () => {
    try {
        const departments: Department[] | null = await Department.findAll({
            attributes: ['name'],
        });

        if (departments != null) {
            return {
                success: true,
                data: departments,
            };
        } else {
            return {
                success: false,
                message: 'departments not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const getDepartmentById = async (id: string) => {
    try {
        const dep: Department | null = await Department.findOne({
            where: {
                id: id,
            },
            attributes: ['name'],
        });
        if (dep != null) {
            return {
                success: true,
                data: dep,
            };
        } else {
            return {
                success: false,
                message: 'department not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { createDepartment, departmentList, getDepartmentById };
