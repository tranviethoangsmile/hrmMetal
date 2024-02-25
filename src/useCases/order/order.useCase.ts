import { validation_id } from '../../validates';
import { search_order } from '../../interfaces/order/order.interface';
import { userFindById } from '../../repositorys/user/user.repository';
import {
    create,
    find_all_order,
    find_order,
    delete_order,
    search_order_for_user_in_month,
    find_one_order,
    checkin_picked_order,
} from '../../repositorys/order/order.repository';
import {
    validate_create_order,
    validate_search_order,
    validate_checkin_picked_order,
} from '../../validates/order/order.validate';
const create_order = async (order: any) => {
    try {
        const valid = validate_create_order(order);
        if (!valid.error) {
            const user = await userFindById(order.user_id);
            if (user?.success) {
                const created_order = await create(order);
                if (created_order?.success) {
                    return {
                        success: true,
                        data: created_order?.data,
                    };
                } else {
                    return {
                        success: false,
                        message: created_order?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'User not found',
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const find_all = async () => {
    try {
        const orders = await find_all_order();
        if (orders?.success) {
            return {
                success: true,
                data: orders?.data,
            };
        } else {
            return {
                success: false,
                message: orders?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_order = async (order: search_order) => {
    try {
        const valid = validate_search_order(order);
        if (!valid.error) {
            const orders = await find_order(order);
            if (orders.success) {
                return {
                    success: true,
                    data: orders?.data,
                };
            } else {
                return {
                    success: false,
                    message: orders?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'data not valid',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const delete_order_by_id = async (id: string) => {
    try {
        const valid = validation_id(id);
        if (!valid.error) {
            const order = await find_one_order(id);
            console.log(order);
            if (order?.success) {
                const date_of_order = order?.data?.date;
                if (date_of_order != undefined) {
                    const orderDate = new Date(date_of_order);
                    const currentDate = new Date();
                    if (orderDate.getTime() > currentDate.getTime()) {
                        const result = await delete_order(id);
                        if (result?.success) {
                            return {
                                success: true,
                                message: result?.message,
                            };
                        } else {
                            return {
                                success: false,
                                message: result?.message,
                            };
                        }
                    } else {
                        return {
                            success: false,
                            message:
                                'order delete failed because it was confirmed',
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: 'order delete failed',
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'order not avaliable',
                };
            }
        } else {
            return {
                success: false,
                message: 'id not valid delete',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};

const search_order_user = async (id: any) => {
    try {
        const valid = validation_id(id.user_id);
        if (!valid.error) {
            const orders = await search_order_for_user_in_month(id);
            if (orders?.success) {
                return {
                    success: true,
                    data: orders?.data,
                };
            } else {
                return {
                    success: false,
                    message: orders?.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'Id not valid search',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
const checkin_picked = async (field: any) => {
    try {
        const valid = validate_checkin_picked_order(field);
        if (!valid.error) {
            const order = await find_order(field);
            if (order?.data?.length != 0) {
                const picked_order = await checkin_picked_order(field);
                if (picked_order.success) {
                    return {
                        success: picked_order?.success,
                        message: picked_order?.message,
                    };
                } else {
                    return {
                        success: picked_order?.success,
                        message: picked_order?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message: `Order does not exist`,
                };
            }
        } else {
            return {
                success: false,
                message: 'value not valid',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error?.message,
        };
    }
};
export {
    create_order,
    find_all,
    search_order,
    delete_order_by_id,
    search_order_user,
    checkin_picked,
};
