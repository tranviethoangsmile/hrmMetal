import { Router } from 'express';
import userRouters from '../user/user.router';
import depRouter from '../department/department.router';
import findRouter from '../find/find.router';
import foodRouter from '../food/food.router';
import canteenRouter from '../canteen/canteen.router';
import orderRouter from '../order/order.router';
import loginRouter from '../login/login.router';
import rpRouter from '../dailyReport/dailyReport.router';
import productRouter from '../product/product.router';
import errOfRpRouter from '../errorOfReport/errorOfReport.router';
import trainningRouter from '../trainning/trainning.router';
import mediaRouter from '../media/media.router';
import chatRouter from '../chat/chat.router';
import paidLeaveRouter from '../paidLeaveReqest/paidLeaveRequest.router';
import conversationRouter from '../conversation/conversation.router';
import messageRouter from '../message/message.router';
import checkinRouter from '../checkin/checkin.router';
import informationRouter from '../information/information.router';
import inventoryRouter from '../inventory/inventory.router';
import eventsRouter from '../events/events.router';
import safetyCheckRouter from '../safetyCheck/safetyCkeck.router';
import evenCheckRouter from '../evenCheck/evenCheck.router';
import payrollRouter from '../payroll/payroll.router';
import planProductionRouter from '../planProduction/planProduction.router';
import notificationRouter from '../notification/notification.router';
import groupMemberRouter from '../groupMember/groupMember.router';
import fcmTokenRouter from '../fcmToken/fcmToken.router';
import uniformOrderRouter from '../uniformOrder/uniformOrder.router';
import safetyReportRouterRoot from '../safetyReport/safetyReport.router';
import dayOffRouter from '../dayOff/dayOff.router';
import overtimeRequestRouter from '../overtimeRequest/overtimeRequest.router';
const v1Router: Router = Router();
v1Router.use('/department', depRouter);
v1Router.use('/users', userRouters);
v1Router.use('/find', findRouter);
v1Router.use('/food', foodRouter);
v1Router.use('/canteen', canteenRouter);
v1Router.use('/order', orderRouter);
v1Router.use('/login', loginRouter);
v1Router.use('/dailyreport', rpRouter);
v1Router.use('/product', productRouter);
v1Router.use('/err', errOfRpRouter);
v1Router.use('/trainning', trainningRouter);
v1Router.use('/media', mediaRouter);
v1Router.use('/chat', chatRouter);
v1Router.use('/paidleave', paidLeaveRouter);
v1Router.use('/conversations', conversationRouter);
v1Router.use('/message', messageRouter);
v1Router.use('/checkin', checkinRouter);
v1Router.use('/information', informationRouter);
v1Router.use('/inventory', inventoryRouter);
v1Router.use('/events', eventsRouter);
v1Router.use('/safetycheck', safetyCheckRouter);
v1Router.use('/eventcheck', evenCheckRouter);
v1Router.use('/payroll', payrollRouter);
v1Router.use('/planproduction', planProductionRouter);
v1Router.use('/notification', notificationRouter);
v1Router.use('/groupmember', groupMemberRouter);
v1Router.use('/fcmtoken', fcmTokenRouter);
v1Router.use('/uniformorder', uniformOrderRouter);
v1Router.use('/safetyreport', safetyReportRouterRoot);
v1Router.use('/dayoffs', dayOffRouter);
v1Router.use('/overtimerequest', overtimeRequestRouter);
export default v1Router;
