import User from "./user.model";    
import Department from "./department.model";

User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(User, { foreignKey: 'department_id', as: 'users' });

export { User, Department };