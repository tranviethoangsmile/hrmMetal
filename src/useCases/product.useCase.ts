import {
    create_product,
    search_product,
} from '../repositorys/product.repository';
import {
    product_field_create,
    product_field_search,
} from '../interfaces/product.interface';
import {
    valid_create_product,
    valid_search_product,
} from '../validates/product.validate';
import { Products } from '../enum/Product.enum';
const product_create = async (data: product_field_create) => {
    try {
        const valid = await valid_create_product(data);
        if (!valid.error) {
            if (
                typeof data.name === 'string' &&
                Object.values(Products).includes(data.name)
            ) {
                const product = await create_product(data);
                if (product?.success) {
                    return {
                        success: true,
                        data: product?.data,
                    };
                } else {
                    return {
                        success: false,
                        message: product?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'product name not avaliable',
                };
            }
        } else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const product_search = async (data: product_field_search) => {
    try {
        const valid = await valid_search_product(data);
        if (!valid.error) {
            const products = await search_product(data);
            if (products?.success) {
                return {
                    success: true,
                    data: products?.data,
                };
            } else {
                return {
                    success: false,
                    message: products?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { product_create, product_search };
