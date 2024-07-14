import {
    create_plan_production_use,
    update_plan_production_use,
    search_plan_production_by_id_use,
    destroy_plan_production_use,
    search_plan_production_seven_day_of_department_use,
} from '../../useCases';

const create_plan_production_controller = async (field: any) => {
    return await create_plan_production_use(field);
};

const update_plan_production_controller = async (field: any) => {
    return await update_plan_production_use(field);
};

const search_plan_production_by_id_controller = async (id: string) => {
    return await search_plan_production_by_id_use(id);
};

const destroy_plan_production_cotroller = async (id: string) => {
    return await destroy_plan_production_use(id);
};
const search_plan_production_seven_day_of_department_controller = async (
    field: any,
) => {
    return await search_plan_production_seven_day_of_department_use(field);
};

export {
    create_plan_production_controller,
    update_plan_production_controller,
    search_plan_production_by_id_controller,
    destroy_plan_production_cotroller,
    search_plan_production_seven_day_of_department_controller,
};
