import { Department } from '../../models';

interface UpdateField {
    id: number;
    name?: string;
    user_name?: string;
    email?: string;
    password?: string;
    dob?: string;
    phone?: string;
    avatar?: string;
    ic_id?: string;
    employee_id?: number;
    is_active?: boolean;
    is_admin?: boolean;
    role?: string;
    position?: string;
    department_id?: string;
    is_officer?: boolean;
    department?: Department;
}

interface CreateField {
    name: string;
    email: string;
    user_name: string;
    password: string;
    dob: string;
    phone?: string;
    avatar?: string;
    ic_id?: string;
    employee_id: number;
    is_active?: boolean;
    is_admin?: boolean;
    is_officer?: boolean;
    role?: string;
    position?: string;
    department_id: string;

    department: Department;
}

interface FindAllField {
    position: string;
}

export { UpdateField, CreateField, FindAllField };
