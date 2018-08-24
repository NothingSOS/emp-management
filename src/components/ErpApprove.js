/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Table, Button, Icon, Pagination, Modal, Segment } from 'semantic-ui-react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import history from '../history';
import PreviewErpDetail2 from '../containers/modals/PreviewErpDetail2';

const amount = (i) => {
  switch (i.typeId) {
    case 1: {
      let sum = 0;
      i.data.forEach((element) => {
        sum += parseFloat(element.field4, 10);
      });
      return (
        <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale />
      );
    }
    case 2: {
      let sum = 0;
      i.data.forEach((element) => {
        sum += parseFloat(element.field4, 10);
      });
      return (
        <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale />
      );
    }
    case 3: {
      let sum = 0;
      i.data.forEach((element) => {
        sum += parseFloat(element.field4, 10);
      });
      return (
        <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale />
      );
    }
    case 4: {
      let sum = 0;
      i.data.forEach((element) => {
        sum += parseFloat(element.field4, 10);
      });
      return (
        <NumberFormat value={sum} displayType="text" thousandSeparator decimalScale="2" fixedDecimalScale />
      );
    }
    default:
      return (
        <div>
          default amount
        </div>
      );
  }
};

const ErpApprove = ({ erpApprove, onApproveClick, onRejectClick, genExcel, activePage, handlePaginationChange, userId }) => (
  <div>
    <Menu pointing secondary>
      <Menu.Item name="Bill" onClick={() => history.push('/erp')} />
      <Menu.Item name="Approve" active />
    </Menu>
    <Segment raised>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Created User</Table.HeaderCell>
            <Table.HeaderCell>Bill Type</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Created Date</Table.HeaderCell>
            <Table.HeaderCell>Approvement</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {erpApprove.map((i, index) => activePage === Math.ceil((index + 1) / 20) && (
            <Table.Row key={i.id}>
              <Table.Cell> {index + 1} </Table.Cell>
              <Table.Cell> {i.firstNameTh} {i.lastNameTh} </Table.Cell>
              <Table.Cell> {i.name} </Table.Cell>
              <Table.Cell textAlign="right">
                {amount(i)}
              </Table.Cell>
              <Table.Cell> <Moment format="YYYY-MM-DD HH:mm" date={i.data[0].createdDate} /> </Table.Cell>
              <Table.Cell>
                {userId === 10001 ?
                  // md
                  (i.bossId === 10001 ?
                    // md+boss
                    (i.approvement1 === 0 ?
                      <div>
                        <Button inverted color="green" onClick={() => onApproveClick(i.id, '', 0)}>Approve</Button>
                        <Button inverted color="red" onClick={() => onRejectClick(i.id, 0)} >Reject</Button>
                      </div> :
                      (i.approvement1 === 2 ?
                        <div>
                          {i.approvement1 === 2 && 'Rejected On '}
                          <Moment format="YYYY-MM-DD HH:mm" date={i.updatedDate} />
                        </div>
                        :
                      (i.approvement2 === 0 ?
                        <div>
                          <Button inverted color="green" onClick={() => onApproveClick(i.id, '', 1)}>Approve</Button>
                          <Button inverted color="red" onClick={() => onRejectClick(i.id, 1)} >Reject</Button>
                        </div> :
                        <div>
                          {i.approvement1 === 1 && 'Approved On '}
                          {i.approvement1 === 2 && 'Rejected On '}
                          <Moment format="YYYY-MM-DD HH:mm" date={i.updatedDate} />
                        </div>
                      )
                    )
                    ) :
                    // md only
                    (i.approvement1 === 0 ?
                      <div>
                        Waiting for Supervisor
                      </div>
                      :
                      (i.approvement1 === 2 ?
                        <div>
                          Rejected by Supervisor
                        </div>
                        :
                        (i.approvement2 === 0 ?
                        <div>
                          <Button inverted color="green" onClick={() => onApproveClick(i.id, '', 1)}>Approve</Button>
                          <Button inverted color="red" onClick={() => onRejectClick(i.id, 1)} >Reject</Button>
                        </div> :
                        <div>
                          {i.approvement2 === 1 && 'Approved On '}
                          {i.approvement2 === 2 && 'Rejected On '}
                          <Moment format="YYYY-MM-DD HH:mm" date={i.updatedDate} />
                        </div>
                      )
                    )
                  )

                  )
                  // not md
                  : (i.approvement1 === 0 ? <div>
                    <Button inverted color="green" onClick={() => onApproveClick(i.id, '', 0)}>Approve</Button>
                    <Button inverted color="red" onClick={() => onRejectClick(i.id, 0)} >Reject</Button>
                  </div> :
                   (i.approvement2 === 0 ?
                    <div>
                      {i.approvement1 === 1 && 'Approved On '}
                      {i.approvement1 === 2 && 'Rejected On '}
                      <Moment format="YYYY-MM-DD HH:mm" date={i.updatedDate} />
                    </div>
                    :
                    <div>
                      {'Updated by MD on '}
                      <Moment format="YYYY-MM-DD HH:mm" date={i.updatedDate} />
                    </div>
                  )
                )
                }

                {/* <div>
                    <Button inverted color="green" onClick={() => onApproveClick(i.id, '')}>Approve</Button>
                    <Button inverted color="red" onClick={() => onRejectClick(i.id)} >Reject</Button>
                  </div>

                <div>
                  {i.approvement1 === 1 && 'Approved On '}
                  {i.approvement1 === 2 && 'Rejected On '}
                  <Moment format="YYYY-MM-DD HH:mm" date={i.updatedDate} />
                </div> */}
              </Table.Cell>
              <Table.Cell>
                <Modal trigger={<Icon name="eye" size="big" />} >
                  <PreviewErpDetail2 bill={i} />
                </Modal>
                <Icon name="file excel outline" color="green" size="big" onClick={() => genExcel(i.billRecordId, i.name, i.createdDate)} />
              </Table.Cell>
            </Table.Row>))}
        </Table.Body>


        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              <Pagination
                totalPages={Math.ceil(erpApprove.length / 20)}
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
  </div>
);

ErpApprove.propTypes = {
  erpApprove: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  onRejectClick: PropTypes.func.isRequired,
  genExcel: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
};

export default ErpApprove;
