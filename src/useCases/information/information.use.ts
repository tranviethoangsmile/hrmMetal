import {
    create_infomation_repo,
    search_information_of_user_repo,
    search_information_by_id_repo,
    search_information_all_with_field_repo,
} from '../../repositorys/infomation/infomation.repo';
import {
    create_infomation,
    search_all_information,
} from '../../interfaces/infomation/infomation.interface';
import {
    validate_create_information,
    validate_search_all_information,
} from '../../validates/infomation/infomation.validate';
import { validation_id } from '../../validates';
import { findUserById } from '../user/user.useCase';
const create_information_use = async (value: create_infomation) => {
    try {
        const valid = validate_create_information(value);
        if (!valid?.error) {
            const user_created = await findUserById(value.user_id);
            if (user_created?.success) {
                let position = user_created?.data?.position;
                const info_value = {
                    ...value,
                    position: position,
                };
                const newInfomation = await create_infomation_repo(info_value);
                if (newInfomation?.success) {
                    return {
                        success: true,
                        data: newInfomation?.data,
                    };
                } else {
                    return {
                        success: false,
                        message: newInfomation?.message,
                    };
                }
            } else {
                return {
                    success: false,
                    message: 'user not exits',
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
};

const search_information_of_user_use = async (id: string) => {
    try {
        const valid_id = validation_id(id);
        if (!valid_id.error) {
            const informations = await search_information_of_user_repo(id);
            if (informations?.success) {
                return {
                    success: informations.success,
                    data: informations.data,
                };
            } else {
                return {
                    success: informations.success,
                    message: informations.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'id not valid',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
};

const search_information_by_id_use = async (id: string) => {
    try {
        const valid_id = validation_id(id);
        if (!valid_id.error) {
            const information = await search_information_by_id_repo(id);
            if (information?.success) {
                return {
                    success: information.success,
                    data: information.data,
                };
            } else {
                return {
                    success: information.success,
                    message: information.message,
                };
            }
        } else {
            return {
                success: false,
                message: 'id not valid',
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
};

const search_all_information_with_field_use = async (
    field: search_all_information,
) => {
    try {
        const valid = validate_search_all_information(field);
        if (!valid.error) {
            const informations = await search_information_all_with_field_repo(
                field,
            );
            if (informations?.success) {
                return {
                    success: informations?.success,
                    data: informations?.data,
                };
            } else {
                return {
                    success: informations?.success,
                    message: informations?.message,
                };
            }
        } else {
            return {
                success: false,
                message: valid?.error?.message,
            };
        }
    } catch (error: any) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
};

export {
    create_information_use,
    search_information_of_user_use,
    search_information_by_id_use,
    search_all_information_with_field_use,
};
