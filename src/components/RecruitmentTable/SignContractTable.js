import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Checkbox, Form } from 'semantic-ui-react';
import { Field, reduxForm, change } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { setDate, setTime } from '../../actions/recruitment';
import history from '../../history';

const row = (item, { checkStatus, reject, changeStatus, load }) => (
  <Table.Row key={item.rowId}>
    <Table.Cell collapsing>{`${item.firstName}`}<br />
      {`${item.lastName}`}
    </Table.Cell>
    <Table.Cell collapsing>{`${item.firstNameTh}`}<br />
      {`${item.lastNameTh}`}
    </Table.Cell>
    <Table.Cell>{`${item.signedPosition}`}</Table.Cell>
    <Table.Cell collapsing>{`${item.mobileNumber}`}</Table.Cell>
    <Table.Cell>{`${item.signDate} ${item.signTime}`}</Table.Cell>
    <Table.Cell><Button icon="list" size="mini" onClick={() => history.push(`/recruitment/${item.citizenId}`)} /></Table.Cell>
    <Table.Cell><Checkbox name="accept" checked={checkStatus[item.rowId] === 'Complete'} onChange={() => changeStatus(item.rowId, 'Complete')} /></Table.Cell>
    {reject && <Table.Cell><Checkbox name="reject" checked={checkStatus[item.rowId] === 'Cancel'} onChange={() => changeStatus(item.rowId, 'Cancel')} /></Table.Cell>}
    <Table.Cell><Checkbox name="edit" checked={checkStatus[item.rowId] === 'Sign Contract'} onChange={() => { changeStatus(item.rowId, 'Sign Contract'); load(item.signDate, item.signTime); }} /></Table.Cell>
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.rowId] === 'Blacklist'} onChange={() => changeStatus(item.rowId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const SignContractTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, reject, changeStatus, clearStatus, setSignDate, setSignTime, load, isUseDate }) => {
  // Get Now DATE
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;// January is 0!
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0'.concat(dd);
  }
  if (mm < 10) {
    mm = '0'.concat(mm);
  }
  today = `${yyyy}-${mm}-${dd}`;
  return (
    <div>
      <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
      <div style={{ overflowX: 'auto' }}>
        <Table striped sortable selectable celled >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={sortKey === 'firstName' ? direction : null} onClick={() => handleSort('firstName')}>Name</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'firstNameTh' ? direction : null} onClick={() => handleSort('firstNameTh')}>ชื่อ-นามสกุล</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Signed Position</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'mobileNumber' ? direction : null} onClick={() => handleSort('mobileNumber')}>Phone</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'signDate' ? direction : null} onClick={() => handleSort('signDate')}>Sign Date/Time</Table.HeaderCell>
              <Table.HeaderCell >Details</Table.HeaderCell>
              {/* <Table.HeaderCell >Status</Table.HeaderCell> */}
              <Table.HeaderCell >Complete</Table.HeaderCell>
              {reject && <Table.HeaderCell >Cancel</Table.HeaderCell>}
              <Table.HeaderCell >Edit Date and Position</Table.HeaderCell>
              <Table.HeaderCell >Blacklist</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(item => row(item, { checkStatus, reject, changeStatus, load }))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Form onSubmit={onConfirm}>
                  <Form.Group floated="left">
                    {isUseDate && <Field name="date" as={Form.Input} component={Input} label="Date" placeholder="Ex. 2018-07-23" type="date" min={today} onChange={(event, value) => setSignDate(value)} />}
                    {isUseDate && <Field name="time" as={Form.Input} component={Input} label="Time" placeholder="Ex. 14:30:00" type="time" onChange={(event, value) => setSignTime(value)} />}
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
};

const mapStateToProps = state => ({
  initialValues: {
    date: state.recruitment.date,
    time: state.recruitment.time,
  },
  isUseDate: state.recruitment.isUseDate,
});

const mapDispatchToProps = dispatch => ({
  setSignDate: value => dispatch(setDate(value)),
  setSignTime: value => dispatch(setTime(value)),
  load: (date, time) => {
    dispatch(change('dateTime', 'date', date));
    dispatch(change('dateTime', 'time', time));
    dispatch(setDate(date));
    dispatch(setTime(time));
  }
  // initialDateTime: (date, time) => {
  //   dispatch(setDate(date));
  //   dispatch(setTime(time));
  // },
});

SignContractTable.defaultProps = {
  reject: false,
};

SignContractTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  reject: PropTypes.bool,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  setSignDate: PropTypes.func.isRequired,
  setSignTime: PropTypes.func.isRequired,
  isUseDate: PropTypes.bool.isRequired,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'dateTime',
    fields: ['date', 'time'],
  }),
);


export default enhance(SignContractTable);
