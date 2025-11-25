export default (sequelize, DataTypes) => {
    const BookCategoryModel = sequelize.define("BookCategoryModel",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'book', 
                key: 'id' 
            },
        },

        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { 
                model: 'category', 
                key: 'id' 
            },
        },
    },
    {
        tableName: "BookCategory",
        timestamps: false,
    });

    BookCategoryModel.associate = (models) => {

    };

    return BookCategoryModel;
};
