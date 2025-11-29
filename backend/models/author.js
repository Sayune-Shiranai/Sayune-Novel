export default (sequelize, DataTypes) => {
  const authorModel = sequelize.define("authorModel",{
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },

    name: { 
      type: DataTypes.STRING, 
      allowNull: false
    },

    trangthai: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'ModerationStatus',
        key: 'id'
      },
    }
  },
  {
    tableName: "author",
    timestamps: true,
  }
  );

  authorModel.associate = (models) => {
    authorModel.hasMany(models.bookModel, {
      foreignKey: 'author_id',
      as: 'Author_Book',
    });
  };

  return authorModel;
};
