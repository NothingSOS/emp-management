import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Checkbox, Form, Icon } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';
import { preActivateTakeExamRequest, setDate, setTime } from '../../actions/recruitment';
import history from '../../history';

const row = (item, { checkStatus, changeStatus, load, preActivateTakeExam, buttonLoad, onClickGrade, modalWarningExIdList }) => (
  <Table.Row key={item.rowId}>
    <Table.Cell collapsing>{`${item.firstName}`}<br />
      {`${item.lastName}`}
    </Table.Cell>
    <Table.Cell>{`${item.position.join('\n')}`}</Table.Cell>
    <Table.Cell>
      {`${moment(item.interviewDate).format('DD/MM/YY')}`}
      <br />
      {`${moment(item.interviewTime, 'HH:mm:ss').format('HH:mm')}`}
    </Table.Cell>
    <Table.Cell>
      {`${moment(item.examDate).format('DD/MM/YY')}`}
      <br />
      {`${moment(item.examTime, 'HH:mm:ss').format('HH:mm')}`}
    </Table.Cell>
    <Table.Cell><Button icon="list" size="mini" onClick={() => history.push(`/recruitment/${item.rowId}`)} /></Table.Cell>
    {item.testStatus === 'NotTest' &&
      <Table.Cell>
        <Button
          loading={buttonLoad}
          fluid
          primary
          disabled={item.examDate !== moment().format('YYYY-MM-DD') || buttonLoad}
          onClick={() => preActivateTakeExam(item)}
        >
          Activate
        </Button>
      </Table.Cell>}
    {item.testStatus === 'Testing' && <Table.Cell style={{ color: 'grey' }}>Testing...</Table.Cell>}
    {item.testStatus === 'Grading' &&
      <Table.Cell>
        <Button
          onClick={() => (onClickGrade(item.rowId, modalWarningExIdList, item.citizenId))}
          disabled={buttonLoad}
          loading={buttonLoad}
          fluid
          color="orange"
        >
          Grade
        </Button>
      </Table.Cell>
    }
    {item.testStatus === 'Finish' && <Table.Cell><Icon name="check" color="green" /></Table.Cell>}
    {item.interviewDone === false ? <Table.Cell><Checkbox name="completeInterview" checked={checkStatus[item.rowId] === 'CompleteInterview'} onChange={() => changeStatus(item.rowId, 'CompleteInterview')} /></Table.Cell> : <Table.Cell><Icon name="check" color="green" /></Table.Cell>}
    <Table.Cell><Checkbox name="editInterview" checked={checkStatus[item.rowId] === 'Interview'} onChange={() => { changeStatus(item.rowId, 'Interview'); load(item.interviewDate, item.interviewTime); }} /></Table.Cell>
    <Table.Cell><Checkbox name="editExam" checked={checkStatus[item.rowId] === 'Exam'} onChange={() => { changeStatus(item.rowId, 'Exam'); load(item.examDate, item.examTime); }} /></Table.Cell>
    <Table.Cell><Checkbox name="cancel" checked={checkStatus[item.rowId] === 'Cancel'} onChange={() => changeStatus(item.rowId, 'Cancel')} /></Table.Cell>
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.rowId] === 'Blacklist'} onChange={() => changeStatus(item.rowId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const ApproveTable = ({
  data,
  onSearchChange,
  sortKey,
  direction,
  handleSort,
  onConfirm,
  checkStatus,
  changeStatus,
  clearStatus,
  setApproveDate,
  setApproveTime,
  load,
  isUseDate,
  preActivateTakeExam,
  buttonLoad,
  onClickGrade,
  today,
  modalWarningExIdList, }) => (
    <div>
      <Input icon="search" placeholder="Search" onChange={onSearchChange} />
      <div style={{ overflowX: 'auto' }}>
        <Table striped sortable selectable celled >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={sortKey === 'firstName' ? direction : null} onClick={() => handleSort('firstName')}>Name</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'interviewDate' ? direction : null} onClick={() => handleSort('interviewDate')}>Interview Date/Time</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'examDate' ? direction : null} onClick={() => handleSort('examDate')}>Exam Date/Time</Table.HeaderCell>
              <Table.HeaderCell >Details</Table.HeaderCell>
              <Table.HeaderCell >Tested</Table.HeaderCell>
              <Table.HeaderCell >Interviewed</Table.HeaderCell>
              <Table.HeaderCell >Edit Interview Date</Table.HeaderCell>
              <Table.HeaderCell >Edit Exam Date</Table.HeaderCell>
              <Table.HeaderCell >Cancel</Table.HeaderCell>
              <Table.HeaderCell >Blacklist</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(item => row(item, { checkStatus, changeStatus, load, preActivateTakeExam, buttonLoad, onClickGrade, today, modalWarningExIdList }))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Form onSubmit={onConfirm}>
                  <Form.Group floated="left">
                    {isUseDate && <Field name="date" as={Form.Input} component={Input} label="Date" placeholder="Ex. 2018-07-23" type="date" min={today} onChange={(event, value) => setApproveDate(value)} />}
                    {isUseDate && <Field name="time" as={Form.Input} component={Input} label="Time" placeholder="Ex. 14:30:00" type="time" onChange={(event, value) => setApproveTime(value)} />}
                  </Form.Group>
                </Form>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="7">
                <Button.Group floated="right">
                  <Button color="blue" icon onClick={onConfirm} >
                    Confirm
                  </Button>
                  <Button.Or />
                  <Button basic color="red" icon onClick={clearStatus} >
                    Select None
                  </Button>
                </Button.Group>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </div>
);

const mapStateToProps = state => ({
  date: state.recruitment.date,
  time: state.recruitment.time,
  isUseDate: state.recruitment.isUseDate,
  buttonLoad: state.recruitment.buttonLoad,
});

const mapDispatchToProps = dispatch => ({
  preActivateTakeExam: person => dispatch(preActivateTakeExamRequest(person)),
  setApproveDate: value => dispatch(setDate(value)),
  setApproveTime: value => dispatch(setTime(value)),
  load: (date, time) => {
    dispatch(change('dateTime', 'date', date));
    dispatch(change('dateTime', 'time', time));
    dispatch(setDate(date));
    dispatch(setTime(time));
  }
});

ApproveTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  load: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
  setApproveDate: PropTypes.func.isRequired,
  setApproveTime: PropTypes.func.isRequired,
  isUseDate: PropTypes.bool.isRequired,
  preActivateTakeExam: PropTypes.func.isRequired,
  buttonLoad: PropTypes.bool.isRequired,
  onClickGrade: PropTypes.func.isRequired,
  today: PropTypes.string.isRequired,
  modalWarningExIdList: PropTypes.array.isRequired,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'dateTime',
  })
);

export default enhance(ApproveTable);
