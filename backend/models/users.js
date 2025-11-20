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
      allowNull: false,
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
      as: "UserRole"
    });

    // relationship users - book
    usersModel.hasMany(models.bookModel, {
      foreignKey: "user_id",
      as: "UserBooks"
    });

    // relationship users - volume
    usersModel.hasMany(volumeModel, {
      foreignKey: "user_id",
      as: "UserVolumes"
    });

    //relationship users - volumeComment
    usersModel.hasMany(models.volumeCommentModel, {
      foreignKey: "user_id",
      as: "UserVolumeComments"
    });

    // relationship users - chatbox
    usersModel.hasMany(models.chatboxModel, {
      foreignKey: "user_id",
      as: "UserChatbox"
    });

    // relationship users - forum
    usersModel.hasMany(models.forumModel, {
      foreignKey: "user_id",
      as: "UserForum"
    });

    // relationship users - notices
    usersModel.hasMany(models.noticesModel, { 
      foreignKey: "user_id", 
      as: "UserNotices" 
    });

    // relationship users - report
    usersModel.hasMany(models.reportModel, {
      foreignKey: "user_id",
      as: "UserReport"
    });
  };
  return usersModel;
};
