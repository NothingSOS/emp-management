import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Table, Dropdown } from 'semantic-ui-react';
import { compose, lifecycle } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import Input from '../../components/Input';
import { fetchPositionRecruitmentRequest, setSelectPosition } from '../../actions/recruitment';
// import Input from '../../components/Input';
// import * as validator from '../../utils/validator';

// const validate = (values) => {
//   const errors = {};
//   errors.firstName = validator.required(values.firstName);
//   errors.lastName = validator.required(values.lastName);
//   errors.email = validator.email(values.email);
//   return errors;
// };

const row = (item, { checkStatus, date, time, submitting, positions, selectPosition }) => {
  const options = [];
  let key = 1;
  positions.map((position) => {
    const positionRow = {};
    positionRow.key = key;
    key += 1;
    positionRow.text = position;
    positionRow.value = position;
    options.push(positionRow);
    return '';
  });
  return (
    <Table.Row key={item.rowId}>
      <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>
      {checkStatus[item.rowId] !== 'Exam' && checkStatus[item.rowId] !== 'Sign Contract' && <Table.Cell>{checkStatus[item.rowId]}</Table.Cell>}
      {checkStatus[item.rowId] === 'Exam' && <Table.Cell>Approve</Table.Cell>}
      {
        (checkStatus[item.rowId] === 'Reject' ||
          checkStatus[item.rowId] === 'Fail' ||
          checkStatus[item.rowId] === 'Cancel' ||
          checkStatus[item.rowId] === 'Blacklist' ||
          checkStatus[item.rowId] === 'Pass')
        &&
        // <Table.Cell><input /></Table.Cell>
        <Table.Cell>
          {/* <Form onSubmit={handleSubmit}> */}
          <Form.Group widths="equal">
            <Field name={`note_${item.rowId}`} as={Form.Input} component={Input} label="" placeholder="Note(can not save with empty note)" disabled={submitting} />
          </Form.Group>
          {/* </Form> */}
        </Table.Cell>
      }
      {(checkStatus[item.rowId] === 'Approve') && <Table.Cell>Interview & Exam Date : {date} ({time})</Table.Cell>}
      {(checkStatus[item.rowId] === 'Interview') && <Table.Cell>Interview Date : {date} ({time})</Table.Cell>}
      {(checkStatus[item.rowId] === 'Exam') && <Table.Cell>Exam Date : {date} ({time})</Table.Cell>}
      {(checkStatus[item.rowId] === 'Sign Contract') && <Table.Cell>Sign Contract Date : {date} ({time})</Table.Cell>}
      {(checkStatus[item.rowId] === 'Complete') && <Table.Cell>First Date : {date}</Table.Cell>}
      {(checkStatus[item.rowId] === 'Sign Contract' && item.signedPosition !== null) && <Table.Cell><Dropdown placeholder="Please select a position." defaultValue={item.signedPosition} selectOnNavigation={false} selection options={options} onChange={(e, data) => selectPosition(data, item.rowId)} /></Table.Cell>}
      {(checkStatus[item.rowId] === 'Sign Contract' && item.signedPosition === null) && <Table.Cell><Dropdown placeholder="Please select a position." selectOnNavigation={false} selection options={options} onChange={(e, data) => selectPosition(data, item.rowId)} /></Table.Cell>}
    </Table.Row>
  );
};
// const EditRecruitmentForm = ({ data, checkStatus, onConfirm, date, time }) => (
const EditRecruitmentForm = ({ data, checkStatus, date, time, handleSubmit, submitting, positions, selectPosition }) => (
  <Form onSubmit={handleSubmit}>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >Name</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
          <Table.HeaderCell >Note</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, date, time, submitting, positions, selectPosition }))}
      </Table.Body>
    </Table>
  </Form>

);

EditRecruitmentForm.propTypes = {
  data: PropTypes.array.isRequired,
  checkStatus: PropTypes.object.isRequired,
  // onConfirm: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  positions: PropTypes.array.isRequired,
  selectPosition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  positions: state.recruitment.positions
});
const mapDispatchToProps = dispatch => ({
  fetchPositionRecruitment: () => dispatch(fetchPositionRecruitmentRequest()),
  selectPosition: (data, rowId) => dispatch(setSelectPosition(rowId, data.value)),
});
// const mapDispatchToProps = dispatch => ({
//   onSubmit: values => new Promise((resolve, reject) => {
//     dispatch(updateRecruitmentNoteRequest({ values, resolve, reject }));
//   })
// });
// const selector = formValueSelector('editRecruitment'); // <-- same as form name

const enhance = compose(
  reduxForm({
    form: 'editRecruitment',
  }),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchPositionRecruitment } = this.props;
      fetchPositionRecruitment();
    }
  })
);

export default enhance(EditRecruitmentForm);
