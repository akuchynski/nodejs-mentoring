import User from './user.model';
import Group from './group.model';

Group.belongsToMany(User, { through: 'user_group' });
User.belongsToMany(Group, { through: 'user_group' });

export { User, Group };
