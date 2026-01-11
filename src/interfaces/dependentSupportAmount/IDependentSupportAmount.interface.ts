interface ICreateDependentSupportAmount {
    tax_dependent_id: string,
    user_id: string;
    year: number,
    supported_amount?: number,
    is_supporting_current_year?: boolean,
    is_confirm?: boolean;
    expected_support_years?: number,
    notes?: string
}
interface IUpdateDependentSupportAmount {
    id: string;
    user_id: string;
    supported_amount?: number,
    is_supporting_current_year?: boolean,
    expected_support_years?: number,
    notes?: string
}
interface IDeleteDependentSupportAmount {
    id: string;
    user_id: string;
}
export { ICreateDependentSupportAmount, IUpdateDependentSupportAmount, IDeleteDependentSupportAmount };