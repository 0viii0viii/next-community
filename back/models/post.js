module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: { type: DataTypes.TEXT, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      category: { type: DataTypes.TEXT, allowNull: false },
      fileUrl: { type: DataTypes.TEXT },
      creator: { type: DataTypes.TEXT },
      view: { type: DataTypes.INTEGER, defaultValue: 0 },
    },

    {
      charset: 'utf8mb4', // =이모티콘 사용가능
      collate: 'utf8mb4_general_ci', //한글 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };
  return Post;
};
