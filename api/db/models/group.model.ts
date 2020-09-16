import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from '../index';

type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

class GroupModel extends Model {
  id: string;
  name: string;
  permissions: Array<Permissions>;
}

GroupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    tableName: "group",
    modelName: "Group",
    schema: "public",
    timestamps: false,
  }
);
