export default (sequelize, DataTypes) => {
  const ForumPostModel = sequelize.define("ForumPostModel", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    
    forum_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "forum",
            key: "id",
        },
        onUpdate: "CASCADE",
    },

    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'CASCADE'
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
    tableName: "ForumPost",
    timestamps: true,
  });
    ForumPostModel.associate = (models) => {

    };
    return ForumPostModel;
}