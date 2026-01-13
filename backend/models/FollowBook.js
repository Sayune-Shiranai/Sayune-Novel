export default (sequelize, DataTypes) => {
    const FollowBookModel = sequelize.define("FollowBookModel",{
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

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { 
                model: 'users', 
                key: 'id' 
            },
        },
    },
    {
        tableName: "FollowBook",
        timestamps: false,
    });

    FollowBookModel.associate = (models) => {
        FollowBookModel.belongsTo(models.usersModel, {
        foreignKey: "user_id",
        as: "Follow_User"
        });

        FollowBookModel.belongsTo(models.bookModel, {
        foreignKey: "book_id",
        as: "Follow_Book"
        });
    };

    return FollowBookModel;
};
