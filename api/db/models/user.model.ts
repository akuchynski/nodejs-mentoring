import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from '../index';

class UserModel extends Model {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted?: boolean;
}

UserModel.init(
  {
    id: {
      // type: DataTypes.UUID,
      // defaultValue: UUIDV4,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "user",
    modelName: "User",
    schema: "public",
    timestamps: false,
  }
);

export default UserModel;

// import { DataTypes } from 'sequelize';
// export default (sequelize) => {
//     sequelize.define('user', {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false
//         },
//         login: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         age: {
//             type: DataTypes.INTEGER,
//             allowNull: false
//         },
//         isDeleted: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false,
//             allowNull: false
//         }
//     }, {
//         tableName: 'user',
//         timestamps: false
//     });
// };
