export default (sequelize, DataTypes) => {
  const usersModel = sequelize.define("usersModel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      },
    },
    img_avatar: { 
      type: DataTypes.STRING, 
      allowNull: true,
    },
    img_background: { 
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    refreshToken: { 
      type: DataTypes.TEXT, 
      allowNull: true,
    }
  }, {
    tableName: "users",
    timestamps: true
  });

  usersModel.associate = (models) => {
    usersModel.belongsTo(models.roleModel, { 
      foreignKey: "role_id", 
      as: "UserRole"
    });

    // models.roleModel.hasMany(usersModel, {
    //   foreignKey: "role_id", 
    //   as: "RoleUser"
    // });
  };

  return usersModel;
};
