import {
    Create_trainning,
    find_all_trainning,
    search_trainning,
} from '../repositorys/trainning.repository';
import { findUserById } from './user.useCase';
import { Trainning, Search_trainning } from '../interfaces/trainning.interface';
import { Products } from '../enum/product.enum';
import {
    validate_schema_trainning,
    validate_schema_search_trainning,
} from '../validates/trainning.validate';
const Create = async (trainning: Trainning) => {
    try {
        const valid = validate_schema_trainning(trainning);
        console.log(trainning);
        if (!valid?.error) {
            const user = await findUserById(trainning.user_id);
            if (user.success) {
                if (
                    typeof trainning.product_name === 'string' &&
                    Object.values(Products).includes(trainning.product_name)
                ) {
                    const new_trainning = await Create_trainning(trainning);
                    if (new_trainning?.success) {
                        return {
                            success: true,
                            data: new_trainning?.data,
                        };
                    } else {
                        return {
                            success: false,
                            message: new_trainning?.message,
                        };
                    }
                } else {
                    return {
                        success: false,
                        message: 'product name not found',
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'user not exist',
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
            message: error.message,
        };
    }
};

const Get_all_trainning = async () => {
    try {
        const trainnings = await find_all_trainning();
        if (trainnings?.success) {
            return {
                success: true,
                data: trainnings?.data,
            };
        } else {
            return {
                success: false,
                message: trainnings?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const Search_all_trainning = async (data: Search_trainning) => {
    try {
        const valid = validate_schema_search_trainning(data);
        if (!valid?.error) {
            const trainnings = await search_trainning(data);
            if (trainnings?.success) {
                return {
                    success: true,
                    data: trainnings?.data,
                };
            } else {
                return {
                    success: false,
                    message: trainnings?.message,
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

export { Create, Get_all_trainning, Search_all_trainning };
