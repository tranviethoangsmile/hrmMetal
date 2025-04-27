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
    role: string;
    position?: string;
    department_id?: string;
    is_officer?: boolean;
    begin_date?: string;
    is_offical_staff?: boolean;
    salary_hourly?: number;
    shift_night_pay?: number;
    travel_allowance_pay?: number;
    paid_days?: number;

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
    begin_date?: string;
    is_offical_staff?: boolean;
    salary_hourly?: number;
    shift_night_pay?: number;
    travel_allowance_pay?: number;
    paid_days?: number;

    department: Department;
}

interface FindAllField {
    position: string;
}
export interface IFindByName {
    name: string;
}

export { UpdateField, CreateField, FindAllField };
