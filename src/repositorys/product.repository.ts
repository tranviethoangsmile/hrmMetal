import { Product, User, Department } from "../models";
const create_product = async (data : any) => {
    try {
        const user = await User.findOne({
            where: {
                id: data.user_id
            }
        })
        if(user != null) {
            const product = await Product.create({
                ...data
            })

            if(product != null) {
                return {
                    success: true,
                    product
                }
            }else {
                return {
                    success: false,
                    message: 'create product failed' 
                }
            }
        }else {
            return {
                success: false,
                message: 'create product failed, user not exist',
            }
        }  
        
    } catch (err) {
        return {
            err
        }
    }
}


const search_product = async (data: any) => {
    try {
        const products = await Product.findAll({
            where: {
                ...data
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['name'],
                        }
                    ]
                }
            ]
        });
        if(products.length > 0) {
            return {
                success: true,
                data: products
            }
        }else {
            return {
                success: false,
                message: 'product not found'
            }
        }
    } catch (error) {
        return {
            error
        }
    }
} 

export { create_product, search_product }