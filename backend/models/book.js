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

    author_id: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: "author",
        key: "id"
      }, 
    },

    artist_id: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: "artist",
        key: "id"
      },
    },

    status: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: "Status",
        key: "id"
      },
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

    trangthai: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: "ModerationStatus",
        key: "id"
      },
    },
  }, {
    tableName: "book",
    timestamps: true,
  });

  bookModel.associate = (models) => {
    // relationship book - category
    bookModel.belongsToMany(models.categoryModel, { 
      through: "BookCategory",
      as: "Book_Category",
      foreignKey: "book_id",
      timestamps: false, 
    });

    // relationship book - users
    bookModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "Book_User"
    });

    // relationship followbook - user
    bookModel.belongsToMany(models.usersModel, { 
      through: "FollowBook",
      as: "User_Follow_Book",
      foreignKey: "book_id",
      timestamps: false, 
    });

    // relationship book - author
    bookModel.belongsTo(models.authorModel, {
      foreignKey: "author_id",
      as: "Book_Author"
    });

    // relationship book - artist
    bookModel.belongsTo(models.artistModel, {
      foreignKey: "artist_id",
      as: "Book_Artist"
    });

    // relationship book - volume
    bookModel.hasMany(models.volumeModel, {
      foreignKey: "book_id",
      as: "Book_Volume"
    });

    // relationship book - VolumePost
    bookModel.hasMany(models.VolumePostModel, {
      foreignKey: "book_id",
      as: "Book_VolumePost"
    });

    // relationship book - notices
    bookModel.hasMany(models.noticesModel, {
      foreignKey: "book_id",
      as: "Book_Notice"
    });

    // relationship book - report
    bookModel.hasMany(models.reportModel, {
      foreignKey: "book_id",
      as: "Book_Report"
    });
  };
  return bookModel;
};

