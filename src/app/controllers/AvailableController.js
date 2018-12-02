const moment = require('moment');
const { Op } = require('sequelize');
const { Appointment } = require('../models');

class AvailableController {
  async index(req, res) {
    const date = moment(parseInt(req.query.date));
    const schedule = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [date.startOf('day').format(), date.endOf('day').format()],
        },
      },
    });

    const available = schedule.map((time) => {
      const [h, m] = time.split(':');
      const value = date
        .hour(h)
        .minute(m)
        .second(0);

      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment())
          && !appointments.find(appointment => moment(appointment.date).format('HH:mm') === time),
      };
    });

    return res.render('available/index', { available });
  }
}

module.exports = new AvailableController();
