interface ICreateDependentSupportAmount {
    tax_dependent_id: string,
    year: number,
    supported_amount?: number,
    is_supporting_current_year?: boolean,
    expected_support_years?: number,
    notes?: string
}

export { ICreateDependentSupportAmount };