import { enumToArray } from "../../../helpers";
import { Position,
    Products,
    Role,
    shift_work,
    shift,
    notification_type,
    UniformType,
    UniformSize,
    OVERTIME_REQUEST_HOUR,
    TaxDependentStatusEnum,
    TaxDependentRelationshipEnum,
    TaxDependentGenderEnum
 } from "../../../enum";


 const getEnumForAdminUsecase = async () => {
    try {
        const data = {
            roles: enumToArray(Role),
            positions: enumToArray(Position),
            products: enumToArray(Products),
            work_shifts: enumToArray(shift_work),
            shifts: enumToArray(shift),
            notification_types: enumToArray(notification_type),
            uniform_types: enumToArray(UniformType),
            uniform_sizes: enumToArray(UniformSize),
            tax_dependent_statuses: enumToArray(TaxDependentStatusEnum),
            overtime_request_house: enumToArray(OVERTIME_REQUEST_HOUR),
            tax_dependent_relationship_enum: enumToArray(TaxDependentRelationshipEnum),
            tax_dependent_gender_enum: enumToArray(TaxDependentGenderEnum)

        }
        return {
            success: true,
            data: data
        }
        
    } catch (error: any) {
        return {
            success: false,
            message: `error from usecase :: ${error?.message}`
        }
    }
 }

 export { getEnumForAdminUsecase };