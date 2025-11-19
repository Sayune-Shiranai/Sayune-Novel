// models/category.js
export default (sequelize, DataTypes) => {
  const categoryModel = sequelize.define("categoryModel",{
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      category: { 
        type: DataTypes.STRING, 
        allowNull: false
      }
    },
    {
      tableName: "category",
      timestamps: false,
    }
  );

  categoryModel.associate = (models) => {
    categoryModel.belongsToMany(models.bookModel, {
      through: "bookCategory",
      as: "CategoryBook",
      foreignKey: "category_id",
    });
  };

  return categoryModel;
};
