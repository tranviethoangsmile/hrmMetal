interface ICreateTaxDependent {
    user_id: string;
    name: string;
    dob: string;
    gender: string;
    identification_number?: string;
    phone?: string;
    address?: string;
    relationship: string;
    tax_code?: string;
    deduction_amount?: number;
    status?: string;
    notes?: string;
}

export { ICreateTaxDependent };