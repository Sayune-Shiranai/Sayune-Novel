export default (sequelize, DataTypes) => {
  const noticesModel = sequelize.define("noticesModel", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'book',
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },
    volume_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'volume',
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },
    notice_content: { 
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: "notices",
    timestamps: true,
  });

  noticesModel.associate = (models) => {
    // relationship notices - users
    noticesModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "NoticeUser",
    });

    // relationship notices - book
    noticesModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "NoticeBook",
    });

    // relationship notices - volume
    noticesModel.belongsTo(models.volumeModel, {
      foreignKey: "volume_id",
      as: "NoticeVolume",
    });
  };
  return noticesModel;
};
