module.exports = (sequelize, DataTypes) => {
  const Nestedcomment = sequelize.define(
    'Nestedcomment',
    {
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      charset: 'utf8mb4', //
      collate: 'utf8mb4_general_ci',
    }
  );
  Nestedcomment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Comment);
  };
  return Nestedcomment;
};
