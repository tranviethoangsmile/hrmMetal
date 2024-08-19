import {
    create_product,
    search_product,
} from '../../repositorys/product/product.repository';
import {
    product_field_create,
    product_field_search,
} from '../../interfaces/product/product.interface';
import {
    valid_create_product,
    valid_search_product,
} from '../../validates/product/product.validate';
import { Products } from '../../enum';
const product_create = async (data: product_field_create) => {
    try {
        const valid = valid_create_product(data);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        if (
            typeof data.name === 'string' &&
            !Object.values(Products).includes(data.name)
        ) {
            throw new Error(`product name not avaliable`);
        }
        const product = await create_product(data);
        if (!product?.success) {
            throw new Error(`${product?.message}`);
        }
        return {
            success: true,
            data: product?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const product_search = async (data: product_field_search) => {
    try {
        const valid = valid_search_product(data);
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const products = await search_product(data);
        if (!products?.success) {
            throw new Error(`${products?.message}`);
        }
        return {
            success: true,
            data: products?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { product_create, product_search };
