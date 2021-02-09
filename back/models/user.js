module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      // mysql에는 소문자, 복수 users로 생성
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수 값
        unique: true, // 중복 x
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //한글 저장
    }
  );

  return User;
};
