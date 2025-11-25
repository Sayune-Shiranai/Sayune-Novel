export default (sequelize, DataTypes) => {
  const noticesModel = sequelize.define("noticesModel", {
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

    notice_content: { 
      type: DataTypes.TEXT,
      allowNull: true
    },

    trangthai: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'ModerationStatus',
        key: 'id'
      },
    },
  }, {
    tableName: "notices",
    timestamps: true,
  });

  noticesModel.associate = (models) => {
    // relationship notices - users
    noticesModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "Notice_User",
    });

    // relationship notices - book
    noticesModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "Notice_Book",
    });

    // relationship notices - volume
    noticesModel.belongsTo(models.volumeModel, {
      foreignKey: "volume_id",
      as: "Notice_Volume",
    });
  };
  return noticesModel;
};
