import User from './user.model';
import Department from './department.model';
import Canteen from './canteen.model';
import Food from './food.model';
import Order from './order.model';
import DailyReport from './dailyReport.model';
import CodeError from './codeError.model';
import Product from './product.model';
import Trainning from './trainning.model';
import PaidLeaveRequest from './paidLeaveRequest.model';
import Message from './message.model';
import Conversation from './conversation.model';
import GroupMember from './groupMember.model';
import Checkin from './checkin.model';
import Information from './information.model';
import Inventory from './inventory.model';
import Events from './events.model';
import SafetyChecks from './safetyCheck.model';
import EventChecks from './eventCheck.model';
import Payroll from './payrolls.model';
import PlanProduction from './planProductions.model';
import Notification from './notification.model';
import DeleteMessage from './deleteMessage.model';
import FcmToken from './fcmToken.model';
import DeleteConversation from './deleteConversation.model';
import UniformOrder from './uniformOrder.model';
import SafetyReport from './safetyReport.model';
import DayOffs from './dayOffs.model';
import OvertimeRequest from './overtimeRequests.model';
User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(User, { foreignKey: 'department_id', as: 'users' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'order' });
CodeError.belongsTo(DailyReport, { foreignKey: 'daily_report_id' });
DailyReport.hasMany(CodeError, { foreignKey: 'daily_report_id' });
User.hasMany(DailyReport, { foreignKey: 'user_id' });
DailyReport.belongsTo(User, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Product, { foreignKey: 'user_id' });
Trainning.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Trainning, { foreignKey: 'user_id' });
User.hasMany(PaidLeaveRequest, { foreignKey: 'user_id' });
User.hasMany(PaidLeaveRequest, { foreignKey: 'leader_id' });
User.hasMany(PaidLeaveRequest, { foreignKey: 'admin_id' });
PaidLeaveRequest.belongsTo(User, { foreignKey: 'user_id', as: 'staff' });
PaidLeaveRequest.belongsTo(User, { foreignKey: 'leader_id', as: 'leader' });
PaidLeaveRequest.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });
Message.belongsTo(Conversation, { foreignKey: 'conversation_id' });
Conversation.hasMany(Message, { foreignKey: 'conversation_id' });
GroupMember.belongsTo(Conversation, { foreignKey: 'conversation_id' });
GroupMember.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'users',
});
User.hasMany(GroupMember, { foreignKey: 'user_id' });
Checkin.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Checkin, { foreignKey: 'user_id' });
Information.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Information, { foreignKey: 'user_id' });
DailyReport.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(DailyReport, { foreignKey: 'department_id' });
Inventory.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(Inventory, { foreignKey: 'department_id' });
Events.hasMany(SafetyChecks, { foreignKey: 'event_id' });
SafetyChecks.belongsTo(Events, { foreignKey: 'event_id' });
Events.hasMany(EventChecks, { foreignKey: 'event_id' });
EventChecks.belongsTo(Events, { foreignKey: 'event_id' });
SafetyChecks.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(SafetyChecks, { foreignKey: 'user_id' });
EventChecks.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(EventChecks, { foreignKey: 'user_id' });
Payroll.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Payroll, { foreignKey: 'user_id' });
PlanProduction.belongsTo(Department, { foreignKey: 'department_id' });
Department.hasMany(PlanProduction, { foreignKey: 'department_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Notification, { foreignKey: 'user_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Message, { foreignKey: 'user_id' });
DeleteMessage.belongsTo(User, { foreignKey: 'user_id' });
DeleteMessage.belongsTo(Message, { foreignKey: 'message_id' });
Message.hasMany(DeleteMessage, { foreignKey: 'message_id' });
User.hasMany(DeleteMessage, { foreignKey: 'user_id' });
FcmToken.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(FcmToken, { foreignKey: 'user_id' });
DeleteConversation.belongsTo(User, { foreignKey: 'user_id' });
DeleteConversation.belongsTo(Conversation, { foreignKey: 'conversation_id' });
Conversation.hasMany(DeleteConversation, { foreignKey: 'conversation_id' });
User.hasMany(DeleteConversation, { foreignKey: 'user_id' });
UniformOrder.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(UniformOrder, { foreignKey: 'user_id' });
SafetyReport.belongsTo(User, { foreignKey: 'user_id', as: 'userDetail' });
User.hasMany(SafetyReport, { foreignKey: 'user_id' });
SafetyReport.belongsTo(User, { foreignKey: 'leader_id', as: 'leaderDetail' });
User.hasMany(SafetyReport, { foreignKey: 'leader_id' });
User.hasMany(DayOffs, { foreignKey: 'user_id' });
DayOffs.belongsTo(User, { foreignKey: 'user_id', as: 'userDetail' });
OvertimeRequest.belongsTo(Department, {
    foreignKey: 'department_id',
    as: 'departmentDetail',
});
Department.hasMany(OvertimeRequest, { foreignKey: 'department_id' });
User.hasMany(OvertimeRequest, { foreignKey: 'user_id' });
User.hasMany(OvertimeRequest, { foreignKey: 'leader_id' });
User.hasMany(OvertimeRequest, { foreignKey: 'admin_id' });
OvertimeRequest.belongsTo(User, { foreignKey: 'user_id', as: 'userDetail' });
OvertimeRequest.belongsTo(User, {
    foreignKey: 'leader_id',
    as: 'leaderDetail',
});
OvertimeRequest.belongsTo(User, { foreignKey: 'admin_id', as: 'adminDetail' });
export {
    User,
    Department,
    Canteen,
    Food,
    Order,
    DailyReport,
    CodeError,
    Product,
    Trainning,
    PaidLeaveRequest,
    Message,
    GroupMember,
    Conversation,
    Checkin,
    Information,
    Inventory,
    Events,
    SafetyChecks,
    EventChecks,
    Payroll,
    PlanProduction,
    Notification,
    DeleteMessage,
    FcmToken,
    DeleteConversation,
    UniformOrder,
    SafetyReport,
    DayOffs,
    OvertimeRequest,
};
