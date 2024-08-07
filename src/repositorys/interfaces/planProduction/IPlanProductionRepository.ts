import { PlanProduction } from '../../../models';
export interface IPlanProductionRepository {
    create_plan_production_repo(
        field: any,
    ): Promise<{ success: boolean; data?: PlanProduction; message?: string }>;
    update_plan_production_repo(
        field: any,
    ): Promise<{ success: boolean; message?: string }>;
    search_plan_production_by_id_repo(
        id: string,
    ): Promise<{ success: boolean; data?: PlanProduction; message?: string }>;
    destroy_plan_production_repo(
        id: string,
    ): Promise<{ success: boolean; message?: string }>;
    search_plan_production_seven_day_of_department_repo(
        field: any,
    ): Promise<{ success: boolean; data?: PlanProduction[]; message?: string }>;
}
