import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal as SUIModal, Table, Button, Dropdown, Input } from 'semantic-ui-react';
import moment from 'moment';
import { closeModal } from '../../actions/modal';

const timeOptions = [
  { text: 'Minute(s)', value: 'Minute(s)' },
  { text: 'Hour(s)', value: 'Hour(s)' },
  { text: 'Day(s)', value: 'Day(s)' }
];

class ActiveExamUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = { status: this.props.userStatus, error: ['noError', 'noError'] };
  }

  render() {
    return (
      <SUIModal
        dimmer="blurring"
        size="small"
        closeIcon
        open
        onClose={this.props.onClose}
      >
        <SUIModal.Header>
          Activate Exam User
        </SUIModal.Header>
        <SUIModal.Content>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Exam User ID</Table.HeaderCell>
                <Table.HeaderCell>Last activated</Table.HeaderCell>
                <Table.HeaderCell>Activation Lifetime</Table.HeaderCell>
                <Table.HeaderCell>Activation Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(this.props.examUser.latestActivatedTime === null)
                ?
                <Table.Row>
                  <Table.Cell>{this.props.examUser.id}</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>Not Activated</Table.Cell>
                </Table.Row>
                :
                <Table.Row>
                  <Table.Cell>{this.props.examUser.id}</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  {(this.props.examUser.userStatus === 'expired')
                    ? <Table.Cell error>Test</Table.Cell>
                    : <Table.Cell>Test</Table.Cell>}
                </Table.Row>}
            </Table.Body>
          </Table>
        </SUIModal.Content>
        <SUIModal.Actions>
          <Input
            action={
              <Dropdown
                placeholder="Time Unit"
                selection
                compact
                options={timeOptions}
                onChange={(e, { value }) => this.setState({ unitTime: value })}
                error={this.state.error[0] !== 'noError'}
              />}
            placeholder="Time length (1-2000)"
            onChange={(e, { value }) => this.setState({ timeLength: value })}
            error={this.state.error[1] !== 'noError'}
          />
          <Button
            color="blue"
            onClick={() => {
              const errorList = ['noError', 'noError'];
              errorList[0] = (this.state.unitTime === undefined) ? 'noUnitTime' : 'noError';
              errorList[1] = (this.state.timeLength === undefined) ? 'noTimeLength' : ((this.state.timeLength < 1 || this.state.timeLength > 2000) ? 'outBoundTimeLength' : 'noError');
              if (errorList.every((val) => val === 'noError')) {
                this.setState({ error: ['noError', 'noError'] }, () => {
                  console.log('CLEAR');
                });
              }
              else {
                this.setState({ error: errorList.slice() }, this.forceUpdate());
              }
            }}
          >
            ACTIVATE
          </Button>
        </SUIModal.Actions>
      </SUIModal>);
  }
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
});

export default connect(null, mapDispatchToProps)(ActiveExamUserModal);
