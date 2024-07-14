export interface create_plan_production {
    department_id: string;
    date: string;
    quantity: number;
    product: string;
    position: string;
    is_custom?: boolean;
    operation_time: number;
    work_shift: string;
    production_line: string;
}

export interface update_plan_production {
    id: string;
    department_id?: string;
    date?: string;
    quantity?: number;
    product?: string;
    position?: string;
    is_custom?: boolean;
    operation_time?: number;
    work_shift?: string;
    production_line?: string;
}

export interface search_by_date_and_department {
    department_id: string;
    start_date: string;
    end_date: string;
}
