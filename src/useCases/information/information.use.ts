import { create_information, search_all_information } from '../../interfaces';
import {
    validate_create_information,
    validate_search_all_information,
} from '../../validates';
import { Position } from '../../enum';
import { validation_id } from '../../validates';
import { findUserById } from '../user/user.useCase';
import { InformationRepository } from '../../repositorys';
const informationRepository = new InformationRepository();
const create_information_use = async (value: create_information) => {
    try {
        const valid = validate_create_information(value);
        if (valid?.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const user_created = await findUserById(value.user_id);
        if (user_created?.success) {
            throw new Error(`${user_created?.message}`);
        }
        let position = user_created?.data?.position;
        const info_value = {
            ...value,
            position: position,
        };
        if (
            typeof info_value.position === 'string' &&
            !Object.values(Position).includes(info_value.position)
        ) {
            throw new Error('position is not valid');
        }
        const newInfomation =
            await informationRepository.create_information_repo(info_value);
        if (!newInfomation?.success) {
            throw new Error(`${newInfomation?.message}`);
        }
        return {
            success: true,
            data: newInfomation?.data,
        };
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
        if (valid_id.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const informations =
            await informationRepository.search_information_of_user_repo(id);
        if (!informations?.success) {
            throw new Error(`${informations?.message}`);
        }
        return {
            success: informations.success,
            data: informations.data,
        };
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
        if (valid_id.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const information =
            await informationRepository.search_information_by_id_repo(id);
        if (!information?.success) {
            throw new Error(`${information?.message}`);
        }
        return {
            success: information.success,
            data: information.data,
        };
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
        if (valid.error) {
            throw new Error(`${valid?.error.message}`);
        }
        const informations =
            await informationRepository.search_information_all_with_field_repo(
                field,
            );
        if (!informations?.success) {
            throw new Error(`${informations?.message}`);
        }
        return {
            success: true,
            data: informations?.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: 'use ' + error.message,
        };
    }
};
const delete_information_by_id_use = async (id: any) => {
    try {
        const valid_id = validation_id(id);
        if (valid_id.error) {
            throw new Error(`${valid_id?.error.message}`);
        }
        const information =
            await informationRepository.search_information_by_id_repo(id);
        if (!information?.success) {
            throw new Error(`${information?.message}`);
        }
        const result_delete =
            await informationRepository.delete_information_by_id_repo(id);
        if (!result_delete?.success) {
            throw new Error(`${result_delete?.message}`);
        }
        return {
            success: true,
        };
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
    delete_information_by_id_use,
};
