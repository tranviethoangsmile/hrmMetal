interface create_payroll {
    user_id: string;
    date: string;
    pay_date: string;
    work_time?: number;
    over_time?: number;
    paid_vacation_days?: number;
    weekend_time?: number;
    paid_vacation_pay?: number;
    work_salary?: number;
    shift_night_salary?: number;
    over_time_salary?: number;
    refund_money?: number;
    other_pay?: number;
    weekend_salary?: number;
    attendance_allowance_pay?: number;
    travel_allowance_pay?: number;
    bonus_pay?: number;
    gross_salary: number;
    income_tax?: number;
    social_insurance?: number;
    health_insurance?: number;
    uniform_deduction?: number;
    accident_insurance?: number;
    club_fee?: number;
    rent_home?: number;
    cost_of_living?: number;
    other_deduction?: number;
    net_salary: number;
    is_active?: boolean;
}
interface update_payroll {
    id: string;
    user_id?: string;
    date?: string;
    pay_date?: string;
    work_time?: number;
    over_time?: number;
    paid_vacation_days?: number;
    weekend_time?: number;
    paid_vacation_pay?: number;
    work_salary?: number;
    shift_night_salary?: number;
    over_time_salary?: number;
    refund_money?: number;
    other_pay?: number;
    weekend_salary?: number;
    attendance_allowance_pay?: number;
    travel_allowance_pay?: number;
    bonus_pay?: number;
    gross_salary?: number;
    income_tax?: number;
    social_insurance?: number;
    health_insurance?: number;
    uniform_deduction?: number;
    accident_insurance?: number;
    club_fee?: number;
    rent_home?: number;
    cost_of_living?: number;
    other_deduction?: number;
    net_salary?: number;
    is_active?: boolean;
}

interface search_payroll {
    user_id: string;
    date: string;
}
export { create_payroll, update_payroll, search_payroll };
