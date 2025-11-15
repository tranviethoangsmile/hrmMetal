enum TaxDependentStatusEnum {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

enum TaxDependentRelationshipEnum {
    CHILD = 'CHILD',
    SPOUSE = 'SPOUSE',
    PARENT = 'PARENT',
    SIBLING = 'SIBLING',
    OTHER = 'OTHER',
}

enum TaxDependentGenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export { TaxDependentStatusEnum, TaxDependentRelationshipEnum, TaxDependentGenderEnum };