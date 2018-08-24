import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Message, Menu, Table, Pagination, Button, Segment, Input, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';
import history from '../history';
import { getVisibleErps } from '../selectors/erp';

const Erp = ({ erps, onDeleteClick, onSearchChange, activePage, handlePaginationChange, searchText, genExcel }) => (
  <div>
    <Menu pointing secondary>
      <Menu.Item name="Bill List" active />
      {erps[2].approveBoolean && <Menu.Item name="Approve" onClick={() => history.push('/erpApprove')} /> }
    </Menu>
    <Grid columns={3} relaxed>
      <Grid.Column>
        <Message>
          <Message.Header>Full Name</Message.Header>
          <p>
            {erps[0].fetchuser.firstName} {erps[0].fetchuser.lastName}
            ( {erps[0].fetchuser.firstNameTh} {erps[0].fetchuser.lastNameTh} )
          </p>
        </Message>
      </Grid.Column>
      <Grid.Column>
        <Message>
          <Message.Header> Position </Message.Header>
          <p>
            {erps[0].fetchuser.name}
          </p>
        </Message>
      </Grid.Column>
      <Grid.Column>
        <Message>
          <Message.Header> User ID</Message.Header>
          <p>
            {erps[0].fetchuser.userId}
          </p>
        </Message>
      </Grid.Column>
    </Grid>
    <br />

    <Segment.Group raised >
      <Segment>
        <Input icon="search" placeholder="Search..." onChange={onSearchChange} />
        <Button onClick={() => history.push('/add')} floated="right"> Add Bill </Button>
      </Segment>
      <Segment>
        <Table celled selectable >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Bill Type</Table.HeaderCell>
              <Table.HeaderCell>Create Date</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Note</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {getVisibleErps(erps, searchText).map((i, index) => activePage === Math.ceil((index + 1) / 20) && (
              <Table.Row key={i.id} >
                <Table.Cell> {index + 1} </Table.Cell>
                <Table.Cell>
                  {i.typeId === 1 && 'ใบขออนุมัติเบิกค่าใช้จ่าย'}
                  {i.typeId === 2 && 'ใบขออนุมัติเบิกเงินทดรองจ่าย'}
                  {i.typeId === 3 && 'ใบเคลียร์เงินทดรองจ่าย'}
                  {i.typeId === 4 && 'ใบขอเบิกค่าพาหนะ / อื่นๆ'}
                </Table.Cell>
                <Table.Cell> <Moment format="YYYY-MM-DD HH:mm" date={i.createdDate} /> </Table.Cell>
                <Table.Cell>
                  {i.statusapproveid === 0 && 'Pending'}
                  {i.statusapproveid === 1 && 'First Approvement Completed'}
                  {i.statusapproveid === 2 && 'Rejected'}
                  {i.statusapproveid === 3 && 'Approved'}
                </Table.Cell>
                <Table.Cell> {erps[1].fetchall[index].comment} </Table.Cell>
                <Table.Cell>
                  <Icon name="file excel outline" size="big" color="green" onClick={() => genExcel(i.id, i.name, i.createdDate)} />
                  {i.statusapproveid === 0 && <Icon name="edit" size="big" onClick={() => history.push(`/erp/${i.id}`)} /> }
                </Table.Cell>
                <Table.Cell>
                  {i.statusapproveid === 0 && <Icon name="delete" color="red" onClick={() => onDeleteClick(i.id)} /> }
                  {/* <Icon name="delete" color="red" onClick={() => onDeleteClick(i.id)} /> */}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Pagination
                  totalPages={Math.ceil(getVisibleErps(erps, searchText).length / 20)}
                  activePage={activePage}
                  onPageChange={handlePaginationChange}
                  ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                  firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                  lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                  prevItem={{ content: <Icon name="angle left" />, icon: true }}
                  nextItem={{ content: <Icon name="angle right" />, icon: true }}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    </Segment.Group>
    <br />
    <br />
    <br />
  </div>
);

Erp.propTypes = {
  erps: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
  genExcel: PropTypes.func.isRequired
};

export default Erp;
