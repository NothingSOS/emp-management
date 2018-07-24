import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button, Checkbox } from 'semantic-ui-react';
import history from '../../history';

const row = (item, { checkStatus, reject, changeStatus }) => (
  <Table.Row key={item.rowId}>
    <Table.Cell collapsing>{`${item.firstName}`}<br />
      {`${item.lastName}`}
    </Table.Cell>
    <Table.Cell collapsing>{`${item.firstNameTh}`}<br />
      {`${item.lastNameTh}`}
    </Table.Cell>
    <Table.Cell>{`${item.position.join('\n')}`}</Table.Cell>
    <Table.Cell>{`${item.email}`}</Table.Cell>
    <Table.Cell collapsing>{`${item.mobileNumber}`}</Table.Cell>
    <Table.Cell>{`${item.interviewDate}  ${item.interviewTime}`}</Table.Cell>
    <Table.Cell><Button icon="list" size="mini" onClick={() => history.push(`/recruitment/${item.citizenId}`)} /></Table.Cell>
    <Table.Cell><Checkbox name="accept" checked={checkStatus[item.rowId] === 'Pass'} onChange={() => changeStatus(item.rowId, 'Pass')} /></Table.Cell>
    {reject && <Table.Cell><Checkbox name="reject" checked={checkStatus[item.rowId] === 'Fail'} onChange={() => changeStatus(item.rowId, 'Fail')} /></Table.Cell>}
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.rowId] === 'Blacklist'} onChange={() => changeStatus(item.rowId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const InProgressTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, reject, changeStatus, clearStatus }) => (
  <div>
    <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
    <div style={{ overflowX: 'auto' }}>
      <Table striped sortable selectable celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={sortKey === 'firstName' ? direction : null} onClick={() => handleSort('firstName')}>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'firstNameTh' ? direction : null} onClick={() => handleSort('firstNameTh')}>ชื่อ-นามสกุล</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'email' ? direction : null} onClick={() => handleSort('email')}>Email</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'mobileNumber' ? direction : null} onClick={() => handleSort('mobileNumber')}>Phone</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'interviewDate' ? direction : null} onClick={() => handleSort('interviewDate')}>Interview Date/Time</Table.HeaderCell>
            <Table.HeaderCell >Details</Table.HeaderCell>
            {/* <Table.HeaderCell >Status</Table.HeaderCell> */}
            <Table.HeaderCell >Pass</Table.HeaderCell>
            {reject && <Table.HeaderCell >Fail</Table.HeaderCell>}
            <Table.HeaderCell >Blacklist</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(item => row(item, { checkStatus, reject, changeStatus }))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="11">
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

InProgressTable.defaultProps = {
  reject: false,
};

InProgressTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  reject: PropTypes.bool,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
};

export default InProgressTable;
