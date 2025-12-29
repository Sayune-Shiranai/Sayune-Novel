export default (sequelize, DataTypes) => {
  const StatusModel = sequelize.define("StatusModel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: "Status",
    timestamps: false
  });
  
  StatusModel.associate = (models) => {
    StatusModel.hasMany(models.bookModel, {
      foreignKey: "status",
      as: "Status_Book"
    });
  }

  return StatusModel;
};
