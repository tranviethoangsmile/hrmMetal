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
GroupMember.belongsToMany(User, {
    foreignKey: 'user_id',
    through: 'GroupMember',
});
GroupMember.belongsTo(Conversation, { foreignKey: 'conversation_id' });
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
};
