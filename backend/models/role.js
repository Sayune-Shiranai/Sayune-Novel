export default (sequelize, DataTypes) => {
  const roleModel = sequelize.define("roleModel", {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true
      },
      role: { 
        type: DataTypes.STRING, 
        allowNull: false,
      }
  }, {
    tableName: "role",
    timestamps: false,
  });

  roleModel.associate = (models) => {
    roleModel.hasMany(models.usersModel, { 
      foreignKey: "role_id", 
      as: "Role_User"
    });
  };
  return roleModel;
}
