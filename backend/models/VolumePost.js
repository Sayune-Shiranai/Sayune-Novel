export default (sequelize, DataTypes) => {
  const VolumePostModel = sequelize.define("VolumePostModel", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "book",
        key: "id",
      },
      onUpdate: "CASCADE",
    },
    volume_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "volume",
        key: "id",
      },
      onUpdate: "CASCADE",
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "chapters",
    timestamps: true,
  });

  VolumePostModel.associate = (models) => {
    // relationship VolumePost - users
    VolumePostModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "VolumePost_tUser"
    });

    // relationship VolumePost - book
    VolumePostModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "VolumePost_Book"
    });

    // relationship VolumePost - volume
    VolumePostModel.belongsTo(models.volumeModel, {
      foreignKey: "volume_id",
      as: "VolumePost_Volume"
    });
  };
  return VolumePostModel;
}
