import { Department } from '../../models';
import { IDepartmentRepository } from '../interfaces';

class DepartmentRepository implements IDepartmentRepository {
    async createDepartment(data: any) {
        try {
            const new_department: Department | null = await Department.create({
                name: data.name,
            });
            if (new_department != null) {
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
    }

    // fix
    async departmentList() {
        try {
            const departments: Department[] | null = await Department.findAll({
                attributes: ['id', 'name'],
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
    }

    async getDepartmentById(id: string) {
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
    }
}

export default DepartmentRepository;
