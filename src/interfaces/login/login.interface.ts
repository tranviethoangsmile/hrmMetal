interface login_data {
    user_name: string;
    password: string;
}

interface token_payload {
    id: string;
    name: string;
    user_name: string;
    avatar: string;
    position: string;
    dob: string;
    role: string;
    is_admin: boolean;
    department: object;
    is_officer: boolean;
    department_id: string;
    is_offical_staff: boolean;
    salary_hourly: number;
    shift_night_pay: number;
    travel_allowance_pay: number;
    paid_days: number;
    begin_date: string;
    employee_id: number;
}

export { login_data, token_payload };
