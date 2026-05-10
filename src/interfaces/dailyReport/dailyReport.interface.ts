interface create_daily_report {
    product: string;
    user_id: string;
    department_id: string;
    date: string;
    shift: string;
    quantity: number;
    good_quantity: number;
    defective_quantity: number;
    operated_time: number;
    shutdown_time: number;
    cycle_time: number;
    operator_history: string;
    errors?: {
        code: string;
        description: string;
        shutdown_time: number;
        error_date: string;
    }[];
}

interface search_report {
    product?: string;
    user_id?: string;
    department_id?: string;
    date?: string;
    shift?: string;
}

export { create_daily_report, search_report };
