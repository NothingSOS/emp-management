const Holiday = require('../models/Holiday');

exports.create = (req, res, next) => {
  const newHoliday = req.body.holiday;
  Holiday.create(newHoliday, req.user.id)
    .then((createdHoliday) => {
      res.json(createdHoliday);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editHoliday = req.body.holiday;
  Holiday.update(editHoliday, req.user.id)
    .then((updatedHoliday) => {
      req.json(updatedHoliday);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Holiday.findAll()
    .then((holidays) => {
      res.json(holidays);
    })
    .catch(next);
};
