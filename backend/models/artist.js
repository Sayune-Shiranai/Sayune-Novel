export default (sequelize, DataTypes) => {
  const artistModel = sequelize.define("artistModel",{
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
    tableName: "artist",
    timestamps: true,
  }
  );

  artistModel.associate = (models) => {
    artistModel.hasMany(models.bookModel, {
      foreignKey: 'artist_id',
      as: 'Artist_Book',
    });
  };

  return artistModel;
};
