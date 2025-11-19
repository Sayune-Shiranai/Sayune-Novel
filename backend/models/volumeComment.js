export default (sequelize, DataTypes) => {
  const volumeCommentModel = sequelize.define("volumeCommentModel", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "book",
        key: "id",
      },
      onUpdate: "CASCADE",
    },
    volume_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "volume",
        key: "id",
      },
      onUpdate: "CASCADE",
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

    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "chapters",
    timestamps: true,
  });

  volumeCommentModel.associate = (models) => {
    // Define associations here if needed
  };
  return volumeCommentModel;
}
