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
    reportModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "Report_User",
    });

    // relationship report - book
    reportModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "Report_Book",
    });

    // relationship report - volume
    reportModel.belongsTo(models.volumeModel, {
      foreignKey: "volume_id",
      as: "Report_Volume",
    });
  };
  return reportModel;
};
