import User from "./user.model";    
import Department from "./department.model";
import Canteen from "./canteen.model";
import Food from "./food.model";
import Order from "./order.model";

User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(User, { foreignKey: 'department_id', as: 'users' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user'});
User.hasMany(Order, { foreignKey: 'user_id', as: 'order'});
Order.belongsTo(Food, { foreignKey: 'food_id', as: 'food'});
Food.hasMany(Order, { foreignKey: 'food_id', as: 'food'});
Order.belongsTo(Canteen, { foreignKey: 'canteen_id', as:'canteen'});
Canteen.hasMany(Order, { foreignKey: 'canteen_id', as:'order'});

export { User, Department, Canteen, Food, Order };