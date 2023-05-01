import { Product, User, Department } from '../models';
const create_product = async (data: any) => {
    try {
        const user: User | null = await User.findOne({
            where: {
                id: data.user_id,
            },
        });
        if (user != null) {
            const product: Product | null = await Product.create({
                ...data,
            });

            if (product != null) {
                return {
                    success: true,
                    data: product,
                };
            } else {
                return {
                    success: false,
                    message: 'create product failed',
                };
            }
        } else {
            return {
                success: false,
                message: 'create product failed, user not exist',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_product = async (data: any) => {
    try {
        const products: Product[] | null = await Product.findAll({
            where: {
                ...data,
            },
            attributes: [
                'name',
                'ic_card',
                'shift',
                'date',
                'quantity',
                'day_code',
            ],
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        },
                    ],
                },
            ],
        });
        if (products != null) {
            return {
                success: true,
                data: products,
            };
        } else {
            return {
                success: false,
                message: 'product not found',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

export { create_product, search_product };
