const Timesheet = require('../models/Timesheet');
const moment = require('moment');

exports.create = (req, res, next) => {
  const newTimesheetArray = req.body.timesheets;
  newTimesheetArray.forEach((timesheet) => {
    const newTimesheet = {};
    newTimesheet.userId = timesheet.userId;
    newTimesheet.date = timesheet.date;
    newTimesheet.projectId = timesheet.projectId;
    newTimesheet.timeIn = timesheet.timeIn;
    newTimesheet.timeOut = timesheet.timeOut;
    newTimesheet.totalhours = moment(newTimesheet.timeOut, 'HH:mm:ss').diff(moment(newTimesheet.timeIn, 'HH:mm:ss'), 'hours');
    Timesheet.create(newTimesheet, req.user.id)
      .then((createdTimesheet) => {
        res.json(createdTimesheet);
      })
      .catch(next);
  });
};

exports.update = (req, res, next) => {
  const editTimesheet = req.body.timesheet;
  Timesheet.update(editTimesheet, req.user.id)
    .then((updatedTimesheet) => {
      req.json(updatedTimesheet);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  Timesheet.findByUserId(req.user.id)
    .then((timesheets) => {
      res.json(timesheets);
    })
    .catch(next);
};
