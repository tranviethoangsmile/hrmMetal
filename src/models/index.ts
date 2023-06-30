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
User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(User, { foreignKey: 'department_id', as: 'users' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'order' });
Order.belongsTo(Food, { foreignKey: 'food_id', as: 'food' });
Food.hasMany(Order, { foreignKey: 'food_id', as: 'food' });
Order.belongsTo(Canteen, { foreignKey: 'canteen_id', as: 'canteen' });
Canteen.hasMany(Order, { foreignKey: 'canteen_id', as: 'order' });
CodeError.belongsTo(DailyReport, { foreignKey: 'daily_report_id' });
DailyReport.hasMany(CodeError, { foreignKey: 'daily_report_id' });
User.hasMany(DailyReport, { foreignKey: 'user_id' });
DailyReport.belongsTo(User, { foreignKey: 'user_id' });
Product.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Product, { foreignKey: 'user_id' });
Trainning.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Trainning, { foreignKey: 'user_id' });
User.hasMany(PaidLeaveRequest, { foreignKey: 'staff_id' });
User.hasMany(PaidLeaveRequest, { foreignKey: 'leader_id' });
PaidLeaveRequest.belongsTo(User, { foreignKey: 'staff_id', as: 'staff' });
PaidLeaveRequest.belongsTo(User, { foreignKey: 'leader_id', as: 'leader' });

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
};
