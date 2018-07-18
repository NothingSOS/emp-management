import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, change } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Table, Input, Button, Checkbox, Form } from 'semantic-ui-react';
import { setDate } from '../../actions/recruitment';
import history from '../../history';

const row = (item, { checkStatus, changeStatus, load }) => (
  <Table.Row key={item.citizenId}>
    <Table.Cell collapsing>{`${item.firstName}`}<br />
      {`${item.lastName}`}
    </Table.Cell>
    <Table.Cell collapsing>{`${item.firstNameTh}`}<br />
      {`${item.lastNameTh}`}
    </Table.Cell>
    <Table.Cell>{`${item.signedPosition}`}</Table.Cell>
    <Table.Cell>{`${item.email}`}</Table.Cell>
    <Table.Cell collapsing>{`${item.mobileNumber}`}</Table.Cell>
    <Table.Cell>{`${item.firstDate}`}</Table.Cell>
    <Table.Cell><Button icon="list" size="mini" onClick={() => history.push(`/recruitment/${item.citizenId}`)} /></Table.Cell>
    <Table.Cell><Checkbox name="edit" checked={checkStatus[item.citizenId] === 'Complete'} onChange={() => { changeStatus(item.citizenId, 'Complete'); load(item.firstDate); }} /></Table.Cell>
    {/* <Table.Cell>{`${item.status}`}</Table.Cell> */}
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.citizenId] === 'Blacklist'} onChange={() => changeStatus(item.citizenId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const CompleteTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, changeStatus, clearStatus, setCompleteDate, load, isUseDate }) => {
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
              <Table.HeaderCell sorted={sortKey === 'email' ? direction : null} onClick={() => handleSort('email')}>Email</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'mobileNumber' ? direction : null} onClick={() => handleSort('mobileNumber')}>Phone</Table.HeaderCell>
              <Table.HeaderCell sorted={sortKey === 'firstDate' ? direction : null} onClick={() => handleSort('firstDate')}>First Date</Table.HeaderCell>
              <Table.HeaderCell >Details</Table.HeaderCell>
              <Table.HeaderCell >Edit Date</Table.HeaderCell>
              {/* <Table.HeaderCell >Status</Table.HeaderCell> */}
              <Table.HeaderCell >Blacklist</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(item => row(item, { checkStatus, changeStatus, load }))}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Form onSubmit={onConfirm}>
                  <Form.Group floated="left">
                    {isUseDate && <Field name="date" as={Form.Input} component={Input} label="Date" placeholder="Ex. 2018-07-23" type="date" min={today} onChange={(event, value) => setCompleteDate(value)} />}
                  </Form.Group>
                </Form>
              </Table.HeaderCell>
              <Table.HeaderCell colSpan="8">
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
  date: state.recruitment.date,
  isUseDate: state.recruitment.isUseDate,
});

const mapDispatchToProps = dispatch => ({
  setCompleteDate: value => dispatch(setDate(value)),
  load: (date) => {
    dispatch(change('dateTime', 'date', date));
    dispatch(setDate(date));
  }
});

CompleteTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  setCompleteDate: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  isUseDate: PropTypes.bool.isRequired,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'dateTime',
  })
);

export default enhance(CompleteTable);
