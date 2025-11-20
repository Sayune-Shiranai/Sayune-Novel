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
    title: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    forum_content: { 
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: "forum",
    timestamps: true,
  });

  forumModel.associate = (models) => {
    forumModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "ForumUser"
    });
  };
  return forumModel;
};
