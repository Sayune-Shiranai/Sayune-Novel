export default (sequelize, DataTypes) => {
  const bookModel = sequelize.define("bookModel", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    book_number: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    another_name: { 
      type: DataTypes.STRING, 
      allowNull: true
    },
    slug: { 
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    img: {
      type: DataTypes.STRING, 
      allowNull: true
    },
    author: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    artist: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    status: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    user_id: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE"
    },
  }, {
    tableName: "book",
    timestamps: true,
  });

  bookModel.associate = (models) => {
    // relationship book - category
    bookModel.belongsToMany(models.categoryModel, { 
      through: "bookCategory",
      as: "BookCategory",
      foreignKey: "book_id",
      timestamps: false, 
    });

    // relationship book - users
    bookModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "BookUser"
    });

    // relationship book - volume
    bookModel.hasMany(models.volumeModel, {
      foreignKey: "book_id",
      as: "BookVolumes"
    });

    // relationship book - volumeComment
    bookModel.hasMany(models.volumeCommentModel, {
      foreignKey: "book_id",
      as: "BookVolumeComments"
    });

    // relationship book - notices
    bookModel.hasMany(models.noticesModel, {
      foreignKey: "book_id",
      as: "BookNotices"
    });

    // relationship book - report
    bookModel.hasMany(models.reportModel, {
      foreignKey: "book_id",
      as: "BookReport"
    });
  };
  return bookModel;
};

