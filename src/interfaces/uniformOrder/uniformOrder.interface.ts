export interface create_uniform_order {
    user_id: string;
    position: string;
    date: string;
    delivery_date?: string;
    order_status?: string;
    notes?: string;
    items: UniformItem[];
}

interface UniformItem {
    uniform_type: string;
    uniform_size: string;
    quantity: number;
}

export interface update_uniform_order {
    id: string;
    uniform_size?: string;
    quantity?: number;
    delivery_date?: string;
    order_status?: string;
    notes?: string;
}
