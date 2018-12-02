const moment = require('moment');
const { Op } = require('sequelize');
const { User, Appointment } = require('./../models');

class ScheduleController {
  async index(req, res) {
    console.log('eba');
    const date = moment();
    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: 'customer',
        },
      ],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [date.startOf('day').format(), date.endOf('day').format()],
        },
      },
    });

    return res.render('schedule/index', { appointments });
  }
}

module.exports = new ScheduleController();
