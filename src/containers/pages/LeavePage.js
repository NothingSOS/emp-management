import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchLeaveRequest,
  updateLeaveRequest,
  fetchLeaveHistoryRequest,
  changeLeavePage
} from '../../actions/leave';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Leave from '../../components/Leave';
import Loader from '../../components/Loader';
import { getTotalPages, getVisibleLeaves } from '../../selectors/leave';

const LeavePage = ({ isFetching, isHistoryFetching, leaves, onAddClick, onCancelClick, userId, year, month, fetchLeave, leaveHistory, currentPage, totalPages, handlePageChange }) => (
  <div>
    {(isFetching || isHistoryFetching) ?
      <Loader /> :
      <Leave
        userId={userId}
        leaves={leaves}
        leaveHistory={leaveHistory}
        onAddClick={onAddClick}
        onCancelClick={onCancelClick}
        fetchLeave={fetchLeave}
        year={year}
        month={month}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />}
  </div>
);

LeavePage.defaultProps = {
  isFetching: true,
  isHistoryFetching: true
};

LeavePage.propTypes = {
  isFetching: PropTypes.bool,
  isHistoryFetching: PropTypes.bool,
  leaves: PropTypes.array.isRequired,
  leaveHistory: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  fetchLeave: PropTypes.func.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.leave.isFetching,
  isHistoryFetching: state.leave.isHistoryFetching,
  leaveHistory: state.leave.leaveHistory,
  leaves: getVisibleLeaves(state),
  userId: state.auth.id,
  year: state.leave.year,
  month: state.leave.month,
  currentPage: state.leave.currentPage,
  totalPages: getTotalPages(state)
});

const mapDispatchToProps = dispatch => ({
  fetchLeave: (userId, year, month) => dispatch(fetchLeaveRequest(userId, year, month)),
  fetchLeaveHistory: (userId, year) => dispatch(fetchLeaveHistoryRequest(userId, year)),
  onAddClick: () => dispatch(openModal(modalNames.CREATE_LEAVE_REQUEST)),
  onCancelClick: (userId, leave) => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Cancel Confirmation',
    description: 'Are you sure to cancel this leave request ?',
    onConfirm: () => dispatch(updateLeaveRequest(userId, { ...leave, status: 'Cancel' }))
  })),
  handlePageChange: (e, { activePage }) => dispatch(changeLeavePage(activePage))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchLeave, fetchLeaveHistory, userId, year, month } = this.props;
      fetchLeave(userId, year, month);
      fetchLeaveHistory(userId, year);
    }
  })
);

export default enhance(LeavePage);
