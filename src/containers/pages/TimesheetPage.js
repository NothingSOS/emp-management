import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import moment from 'moment';
import { fetchTimesheetRequest } from '../../actions/timesheet';
import { openModal } from '../../actions/modal';
import Timesheet from '../../components/Timesheet';
import Loader from '../../components/Loader';
import { fillTimesheetsToFullMonth } from '../../selectors/timesheet';
import * as modalNames from '../../constants/modalNames';

const isHoliday = (date, holidays) => holidays.some(((holiday) => {
  if (holiday.date === date.format('YYYY-MM-DD')) {
    return true;
  }
  return false;
}));

const TimesheetPage = ({ isFetching, fetchTimesheet, timesheets, leaves, holidays, userId, year, month, onAddClick, onEditClick }) => {
  let countWorkDay = 0;
  let countFilledTimesheet = 0;
  for (let i = 0; i < timesheets.length; i += 1) {
    const x = timesheets[i][0];
    if (moment(x.date).format('MM') !== month) {
      continue;
    }
    else if (isHoliday(moment(x.date), holidays)) {
      continue;
    }
    else if (moment(x.date).format('d') === '0' || moment(x.date).format('d') === '6') {
      continue;
    }
    else {
      countWorkDay += 1;
      if (x.totalhours > 0) {
        countFilledTimesheet += 1;
      }
    }
  }
  leaves.forEach((leave) => {
    if (leave.totalhours === 8) { countWorkDay -= 1; }
  });
  const percent = Math.round((countFilledTimesheet / countWorkDay) * 10000) / 100;
  return (
    <div>
      {isFetching ?
        <Loader /> :
        <Timesheet
          timesheets={timesheets}
          leaves={leaves}
          holidays={holidays}
          fetchTimesheet={fetchTimesheet}
          userId={userId}
          year={year}
          month={month}
          percent={percent}
          onAddClick={onAddClick}
          onEditClick={onEditClick}
        />}
    </div>
  );
};

TimesheetPage.defaultProps = {
  isFetching: true
};

TimesheetPage.defaultProps = {
  isFetching: true
};

TimesheetPage.propTypes = {
  isFetching: PropTypes.bool,
  timesheets: PropTypes.array.isRequired,
  leaves: PropTypes.array.isRequired,
  holidays: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  fetchTimesheet: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.timesheet.isFetching,
  timesheets: fillTimesheetsToFullMonth(state),
  leaves: state.timesheet.leaves,
  holidays: state.timesheet.holidays,
  userId: state.auth.id,
  year: state.timesheet.year,
  month: state.timesheet.month
});

const mapDispatchToProps = dispatch => ({
  fetchTimesheet: (userId, year, month) => dispatch(fetchTimesheetRequest(userId, year, month)),
  onAddClick: date => dispatch(openModal(modalNames.ADD_TIMESHEET, { date })),
  onEditClick: id => dispatch(openModal(modalNames.EDIT_TIMESHEET, { id }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchTimesheet, userId, year, month } = this.props;
      fetchTimesheet(userId, year, month);
    }
  })
);

export default enhance(TimesheetPage);
