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
    db.Nestedcomment.belongsTo(db.User);
    db.Nestedcomment.belongsTo(db.Comment);
    db.Nestedcomment.belongsTo(db.Post);
  };
  return Nestedcomment;
};
