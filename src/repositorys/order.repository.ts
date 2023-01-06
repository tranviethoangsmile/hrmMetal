import { Order } from "../models";

const create = async (order: any) => {
    try {
        const new_order = await Order.create({
            ...order,
        })
        if(new_order) {
            return {
               success: true,
               new_order,
            }
        }else {
            return {
               success: false,
               error: "Error creating order",
            }
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}

export { create };
