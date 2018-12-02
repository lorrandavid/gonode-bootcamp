const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (!user.password) return false;
          user.password_hash = await bcrypt.hash(user.password, 8);
        },
      },
    },
  );

  User.prototype.passwordIsEqual = function passwordIsEqual(password) {
    return bcrypt.compare(password, this.password_hash);
  };

  return User;
};
