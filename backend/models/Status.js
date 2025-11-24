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
    tableName: "StatusModel",
    timestamps: false
  });
  
  StatusModel.associate = (models) => {

  }

  return StatusModel;
};
