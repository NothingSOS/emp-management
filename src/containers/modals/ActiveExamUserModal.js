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
    this.state = { status: this.props.userStatus };
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
            action={<Dropdown placeholder="Unit Time" selection compact options={timeOptions} onChange={(e, { value }) => this.setState({ unitTime: value })} />}
            placeholder="Time length (0-2000)"
            onChange={(e, { value }) => this.setState({ timeLength: value })}
          />
          <Button
            color="blue"
            onClick={() => {
              console.log(this.state);
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
