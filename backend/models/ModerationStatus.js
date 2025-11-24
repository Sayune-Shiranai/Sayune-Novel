export default (sequelize, DataTypes) => {
  const ModerationStatusModel = sequelize.define("ModerationStatusModel", {
    
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

    description: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    tableName: "ModerationStatus",
    timestamps: false
  });
  
  ModerationStatusModel.associate = (models) => {

  }

  return ModerationStatusModel;
};
