import { Router } from "express";
import createDependentSupportAmountRouter from "./create/createDependentSupportAmount.router";
import updateDependentSupportAmountRouter from "./update/updateDependentSupportAmountRouter.router";
import updateConfirmDependentSupportAmountRouter from "./update_confirm/updateConfirmDependentSupportAmount.router";
import deleteDependentSupportAmountRouter from "./delete/deleteDependentSupportAmount.router";
import getDependentSupportAmountRouter from "./get/getDependentSupportAmount.router";
import getDependentSupportAmountByTaxDependentIdAndYearRouter from "./getDependentSupportAmountByTaxDependentIDAndYear/getDenpendentSupportAmountByTaxDependentIdAndYear.router";
const dependentSupportAmountRouter: Router = Router();
dependentSupportAmountRouter.use('/create', createDependentSupportAmountRouter)
dependentSupportAmountRouter.use('/update', updateDependentSupportAmountRouter )
dependentSupportAmountRouter.use('/confirm', updateConfirmDependentSupportAmountRouter)
dependentSupportAmountRouter.use('/delete', deleteDependentSupportAmountRouter)
dependentSupportAmountRouter.use('/getbyid', getDependentSupportAmountRouter)
dependentSupportAmountRouter.use('/getbytaxdependentidandyear', getDependentSupportAmountByTaxDependentIdAndYearRouter)
export default dependentSupportAmountRouter;