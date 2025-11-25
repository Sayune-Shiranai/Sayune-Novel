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
      tableName: "category",
      timestamps: false,
    }
  );

  categoryModel.associate = (models) => {
    categoryModel.belongsToMany(models.bookModel, {
      through: "BookCategory",
      as: "Category_Book",
      foreignKey: "category_id",
    });
  };

  return categoryModel;
};
