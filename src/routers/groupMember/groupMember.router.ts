import { Router } from 'express';
import getGroupMemberRouter from './get_group_member_of_user/getGroupMemberOfUser.router';
const groupMemberRouter: Router = Router();

groupMemberRouter.use('/getgroupmemberofuser', getGroupMemberRouter);

export default groupMemberRouter;
