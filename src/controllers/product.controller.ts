import { product_create, product_search } from "../useCases/product.useCase";

const create_product = async (data: any) => {
    return await product_create(data);
}

const search_product = async (data: any) => {
    return await product_search(data);
}

export { create_product, search_product };