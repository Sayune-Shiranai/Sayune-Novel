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
    // relationship volumeComment - users
    VolumePostModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "VolumeCommen_tUser"
    });

    // relationship volumeComment - book
    VolumePostModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "VolumeComment_Book"
    });

    // relationship volumeComment - volume
    VolumePostModel.belongsTo(models.volumeModel, {
      foreignKey: "volume_id",
      as: "VolumeComment_Volume"
    });
  };
  return VolumePostModel;
}
