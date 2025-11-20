export default (sequelize, DataTypes) => {
  const reportModel = sequelize.define("reportModel", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'book',
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },
    volume_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'volume',
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },
    reason: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    tableName: "report",
    timestamps: true,
  });

  reportModel.associate = (models) => {
    // relationship report - users
    reportModel.belongsTo(models.userModel, {
      foreignKey: "user_id",
      as: "user",
    });

    // relationship report - book
    reportModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "book",
    });

    // relationship report - volume
    reportModel.belongsTo(models.volumeModel, {
      foreignKey: "volume_id",
      as: "volume",
    });
  };
  return reportModel;
};
