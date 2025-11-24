export default (sequelize, DataTypes) => {
  const chatboxModel = sequelize.define("chatboxModel", {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',  // tên bảng cha
        key: 'id'
      },
      onUpdate: 'CASCADE',
    },

    chatbox_content: { 
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    tableName: "chatbox",
    timestamps: true,
  });

  chatboxModel.associate = (models) => {
    // relationship chatbox - users
    chatboxModel.belongsTo(models.usersModel, {
      foreignKey: "user_id",
      as: "Chatbox_User"
    });
  };
  return chatboxModel;
};
