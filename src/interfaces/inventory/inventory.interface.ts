interface create_inventory {
    product: string;
    quantity: number;
    department_id: string;
}
interface search_inventory_with_name {
    product?: string;
    department_id?: string;
}
interface update_inventory {
    product: string;
    quantity: number;
    department_id?: string;
}
export { create_inventory, search_inventory_with_name, update_inventory };
