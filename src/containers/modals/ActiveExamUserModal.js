import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal as SUIModal, Table, Button, Dropdown, Input } from 'semantic-ui-react';
import moment from 'moment';
import { closeModal } from '../../actions/modal';
import { activateExamUserRequest } from '../../actions/recruitment';

const timeOptions = [
  { text: 'Minute(s)', value: 'Minute(s)' },
  { text: 'Hour(s)', value: 'Hour(s)' },
  { text: 'Day(s)', value: 'Day(s)' }
];

class ActiveExamUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = { error: ['noError', 'noError'] };
    this.activateExamUser = this.activateExamUser.bind(this);
    this.showLifetime = this.showLifetime.bind(this);
  }

  activateExamUser() {
    const errorList = ['noError', 'noError'];
    errorList[0] = (this.state.unitTime === undefined) ? 'noUnitTime' : 'noError';
    errorList[1] = (this.state.timeLength === undefined)
      ? 'noTimeLength'
      : (!isNaN(this.state.timeLength))
        ? ((this.state.timeLength < 1 || this.state.timeLength > 2000) ? 'outBoundTimeLength' : 'noError')
        : 'notNumeric';

    if (errorList.every(val => val === 'noError')) {
      this.setState({ error: ['noError', 'noError'] }, () => {
        this.props.activateExamUser(this.props.data.examUser, this.state.timeLength, this.state.unitTime, this.props.data.applicantData.registrationDate);
      });
    }
    else {
      this.setState({ error: errorList.slice() }, this.forceUpdate());
    }
  }

  showLifetime(minute) {
    let showString = '';
    if (minute / 60 / 24 >= 1) {
      showString = showString.concat(parseInt(minute / 60 / 24, 10)).concat(' day(s) ');
    }
    if (minute / 60 % 24 >= 1) {
      showString = showString.concat(parseInt(minute / 60 % 24, 10)).concat(' hour(s) ');
    }
    if (minute % 60 >= 1) {
      showString = showString.concat(minute % 60).concat(' minute(s)');
    }
    return showString;
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
              {(this.props.data.examUser.latestActivatedTime === null)
                ?
                <Table.Row>
                  <Table.Cell>{this.props.data.examUser.id}</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>-</Table.Cell>
                  <Table.Cell>Not Activated</Table.Cell>
                </Table.Row>
                :
                <Table.Row>
                  <Table.Cell>{this.props.data.examUser.id}</Table.Cell>
                  <Table.Cell>{moment(this.props.data.examUser.latestActivatedTime).format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
                  <Table.Cell>{this.showLifetime(this.props.data.examUser.activationLifetimes)}</Table.Cell>
                  {(this.props.data.userStatus === 'expired')
                    ? <Table.Cell negative>Expired</Table.Cell>
                    : <Table.Cell positive>Alive</Table.Cell>}
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
                disabled={this.props.submitStatus}
                onChange={(e, { value }) => this.setState({ unitTime: value })}
                error={this.state.error[0] !== 'noError'}
              />}
            placeholder="Time length (1-2000)"
            disabled={this.props.submitStatus}
            onChange={(e, { value }) => this.setState({ timeLength: value })}
            error={this.state.error[1] !== 'noError'}
          />
          <Button
            color="blue"
            disabled={this.props.submitStatus}
            loading={this.props.submitStatus}
            onClick={this.activateExamUser}
          >
            ACTIVATE
          </Button>
          <br />
          <div style={{ color: 'red' }}>
            {!this.state.error.every(val => val === 'noError') && '*'}
            {this.state.error[1] !== 'noError' &&
              ((this.state.error[1] === 'noTimeLength')
                ? ' Please insert activation time length'
                : ((this.state.error[1] === 'outBoundTimeLength') ? ' Activation time length is out of bound (1-2000)' : ' Activation time length must be a  number'))}
            {this.state.error[1] !== 'noError' && this.state.error[0] !== 'noError' && ' &'}
            {this.state.error[0] !== 'noError' && ' Please select activation time unit'}
            &nbsp;
          </div>
        </SUIModal.Actions>
      </SUIModal>);
  }
}

const mapStateToProps = state => ({
  data: state.recruitment.dataModal,
  submitStatus: state.recruitment.modalSubmit,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  activateExamUser: (user, timeLength, timeUnit, registerDate) => dispatch(activateExamUserRequest(user, timeLength, timeUnit, registerDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveExamUserModal);
