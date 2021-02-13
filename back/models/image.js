module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    'Images',
    {
      src: { type: DataTypes.STRING(200), allowNull: false },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    }
  );
  Images.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Images;
};
