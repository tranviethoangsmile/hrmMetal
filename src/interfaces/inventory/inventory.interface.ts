interface create_inventory {
    product: string;
    quantity: number;
}
interface search_with_name {
    product: string;
}
interface update_inventory {
    product: string;
    quantity: number;
}
export { create_inventory, search_with_name, update_inventory };
