export default (sequelize, DataTypes) => {
  const forumModel = sequelize.define("forumModel", {
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

    role_id: {
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'role',
        key: 'id'
      },
      onUpdate: 'CASCADE'
    },

    title: { 
      type: DataTypes.TEXT,
      allowNull: false
    },

    forum_content: { 
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
    tableName: "forum",
    timestamps: true,
  });

  forumModel.associate = (models) => {
    forumModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "Forum_User"
    });

    //relationship forum - role
    forumModel.belongsTo(models.roleModel, { 
      foreignKey: "role_id",
      as: "Forum_Role"
    });

    //relationship forum - ForumPost
    forumModel.hasMany(models.ForumPostModel, {
      foreignKey: "forum_id",
      as: "Forum_ForumPost"
    });
  };
  return forumModel;
};
