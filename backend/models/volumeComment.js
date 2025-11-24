export default (sequelize, DataTypes) => {
  const volumeCommentModel = sequelize.define("volumeCommentModel", {
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

  volumeCommentModel.associate = (models) => {
    // relationship volumeComment - users
    volumeCommentModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "VolumeCommen_tUser"
    });

    // relationship volumeComment - book
    volumeCommentModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "VolumeComment_Book"
    });

    // relationship volumeComment - volume
    volumeCommentModel.belongsTo(models.volumeModel, {
      foreignKey: "volume_id",
      as: "VolumeComment_Volume"
    });
  };
  return volumeCommentModel;
}
