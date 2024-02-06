interface product_field_create {
    name : string;
    ic_card : string;
    user_id: string;
    shift: string;
    date: string;
    quantity: number;
    day_code: string;
};


interface product_field_search {
    name ?: string;
    ic_card ?: string;
    user_id ?: string;
    shift ?: string;
    date ?: string;
    quantity ?: number;
    day_code ?: string;
}
export { product_field_create, product_field_search }