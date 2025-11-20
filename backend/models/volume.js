export default (sequelize, DataTypes) => {
  const volumeModel = sequelize.define("volumeModel", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "book",
        key: "id",
      },
      onUpdate: "CASCADE",
    },

    volume_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true,
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

    chapter_content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "volume",
    timestamps: true,
  });

  volumeModel.associate = (models) => {
    // relationship volume - users
    volumeModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "VolumeUser"
    });

    // relationship volume - book
    volumeModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "VolumeBook"
    });

    // relationship volume - volumeComment
    volumeModel.hasMany(models.volumeCommentModel, {
      foreignKey: "volume_id",
      as: "VolumeComments"
    });

    // relationship volume - notices
    volumeModel.hasMany(models.noticesModel, {
      foreignKey: "volume_id",
      as: "VolumeNotices"
    })

    // relationship volume - report
    volumeModel.hasMany(models.reportModel, {
      foreignKey: "volume_id",
      as: "VolumeReport"
    });
  };
  return volumeModel;
}; 
