export default (sequelize, DataTypes) => {
  const usersModel = sequelize.define("usersModel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      },
    },

    img_avatar: { 
      type: DataTypes.STRING, 
      allowNull: true,
    },

    img_background: { 
      type: DataTypes.STRING, 
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

    refreshToken: { 
      type: DataTypes.TEXT, 
      allowNull: true,
    }
  }, {
    tableName: "users",
    timestamps: true
  });

  usersModel.associate = (models) => {
    // relationship users - role
    usersModel.belongsTo(models.roleModel, { 
      foreignKey: "role_id", 
      as: "User_Role"
    });

    // relationship users - book
    usersModel.hasMany(models.bookModel, {
      foreignKey: "user_id",
      as: "User_Book"
    });

    // relationship users - volume
    usersModel.hasMany(models.volumeModel, {
      foreignKey: "user_id",
      as: "User_Volume"
    });

    //relationship users - VolumePost
    usersModel.hasMany(models.VolumePostModel, {
      foreignKey: "user_id",
      as: "User_VolumePost"
    });

    // relationship users - chatbox
    usersModel.hasMany(models.chatboxModel, {
      foreignKey: "user_id",
      as: "User_Chatbox"
    });

    // relationship users - forum
    usersModel.hasMany(models.forumModel, {
      foreignKey: "user_id",
      as: "User_Forum"
    });

    // relationship users - ForumPost
    usersModel.hasMany(models.ForumPostModel, {
      foreignKey: "user_id",
      as: "User_ForumPost"
    });

    // relationship users - notices
    usersModel.hasMany(models.noticesModel, { 
      foreignKey: "user_id", 
      as: "User_Notice" 
    });

    // relationship users - report
    usersModel.hasMany(models.reportModel, {
      foreignKey: "user_id",
      as: "User_Report"
    });


  };
  return usersModel;
};
