"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxDependentGenderEnum = exports.TaxDependentRelationshipEnum = exports.TaxDependentStatusEnum = void 0;
var TaxDependentStatusEnum;
(function (TaxDependentStatusEnum) {
    TaxDependentStatusEnum["PENDING"] = "PENDING";
    TaxDependentStatusEnum["APPROVED"] = "APPROVED";
    TaxDependentStatusEnum["REJECTED"] = "REJECTED";
})(TaxDependentStatusEnum || (TaxDependentStatusEnum = {}));
exports.TaxDependentStatusEnum = TaxDependentStatusEnum;
var TaxDependentRelationshipEnum;
(function (TaxDependentRelationshipEnum) {
    TaxDependentRelationshipEnum["CHILD"] = "CHILD";
    TaxDependentRelationshipEnum["SPOUSE"] = "SPOUSE";
    TaxDependentRelationshipEnum["PARENT"] = "PARENT";
    TaxDependentRelationshipEnum["SIBLING"] = "SIBLING";
    TaxDependentRelationshipEnum["OTHER"] = "OTHER";
})(TaxDependentRelationshipEnum || (TaxDependentRelationshipEnum = {}));
exports.TaxDependentRelationshipEnum = TaxDependentRelationshipEnum;
var TaxDependentGenderEnum;
(function (TaxDependentGenderEnum) {
    TaxDependentGenderEnum["MALE"] = "MALE";
    TaxDependentGenderEnum["FEMALE"] = "FEMALE";
    TaxDependentGenderEnum["OTHER"] = "OTHER";
})(TaxDependentGenderEnum || (TaxDependentGenderEnum = {}));
exports.TaxDependentGenderEnum = TaxDependentGenderEnum;
