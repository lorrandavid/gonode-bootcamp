const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE,
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.User, { as: 'customer', foreignKey: 'user_id' });
    Appointment.belongsTo(models.User, { as: 'provider', foreignKey: 'provider_id' });
  };

  Appointment.prototype.getDateFormated = function getDateFormated(date) {
    return moment(date).format('Y-m-d');
  };

  return Appointment;
};
