import { create } from '../repositorys/order.repository'
import { validate_create_order } from '../helper/order.validate.helper'
import { userFindById } from '../repositorys/user.repository';
import { create_food } from '../repositorys/food.repository';
import { create_canteen } from '../repositorys/canteen.repository';
const create_order = (order: any) => {
    try {
        const valid = validate_create_order(order);
        if(!valid.error) {

        }
    } catch (error) {
        return {
            error: true,
            message: 'Error creating order'
        }
    }
}
    