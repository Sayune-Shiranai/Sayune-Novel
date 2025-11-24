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

    trangthai: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'ModerationStatus',
        key: 'id'
      },
    },
  }, {
    tableName: "volume",
    timestamps: true,
  });

  volumeModel.associate = (models) => {
    // relationship volume - users
    volumeModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "Volume_User"
    });

    // relationship volume - book
    volumeModel.belongsTo(models.bookModel, {
      foreignKey: "book_id",
      as: "Volume_Book"
    });

    // relationship volume - volumeComment
    volumeModel.hasMany(models.volumeCommentModel, {
      foreignKey: "volume_id",
      as: "Volume_Comment"
    });

    // relationship volume - notices
    volumeModel.hasMany(models.noticesModel, {
      foreignKey: "volume_id",
      as: "Volume_Notice"
    })

    // relationship volume - report
    volumeModel.hasMany(models.reportModel, {
      foreignKey: "volume_id",
      as: "Volume_Report"
    });
  };
  return volumeModel;
}; 
