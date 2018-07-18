import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const leaveTypes = [
  { key: 'Annual Leave', value: 'Annual Leave', text: 'Annual Leave' },
  { key: 'Personal Leave', value: 'Personal Leave', text: 'Personal Leave' },
  { key: 'Sick Leave', value: 'Sick Leave', text: 'Sick Leave' },
  { key: 'Ordination Leave', value: 'Ordination Leave', text: 'Ordination Leave' },
];

const durations = [
  { key: 'Full day', value: 'Full day', text: 'Full day' },
  { key: 'Specific time', value: 'Specific time', text: 'Specific time' }
];

const remark = `1. พนักงานจะใช้สิทธิ์ลาได้ เมื่อผู้บังคับบัญชาอนุมัติก่อนเท่านั้น โดยต้องปฏิบัติตามระเบียบข้อบังคับของบริษัทอย่างเคร่งครัด

2. การลากิจทุกประเภทและลาพักร้อนต้องลาล่วงหน้าอย่างน้อย 3 วัน (ยกเว้นกรณีฉุกเฉิน คือ งานศพบิดา มารดา คู่สมรส บุตร ที่สามารถแจ้งขออนุมัติ ผู้บังคับบัญชาก่อนแล้วต้องเขียนใบลาทันทีที่กลับมาเริ่มงาน)

3. โปรดระบุเหตุผลที่ขอลาให้ชัดเจนว่ามีธุรกิจจำเป็นเรื่องอะไร จำเป็นมากน้อยเพียงใด`;

const CreateLeaveRequestForm = ({ handleSubmit, submitting, duration, resetStartTime, resetEndTime }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="leaveType" as={Form.Select} component={Input} label="Leave type" placeholder="Leave type" options={leaveTypes} disabled={submitting} />
    <Form.Group widths="equal">
      <Field name="leaveFrom" as={Form.Input} component={Input} type="date" label="From" placeholder="From" disabled={submitting} />
      <Field name="leaveTo" as={Form.Input} component={Input} type="date" label="To" placeholder="To" disabled={submitting} />
    </Form.Group>
    <Field
      name="duration"
      as={Form.Select}
      component={Input}
      label="Duration"
      placeholder="Duration"
      options={durations}
      onChange={() => { resetStartTime(); resetEndTime(); }}
      disabled={submitting}
    />
    {duration === 'Specific time' &&
    <Form.Group widths="equal">
      <Field name="startTime" as={Form.Input} component={Input} type="time" label="Start time" placeholder="Start time" disabled={submitting} />
      <Field name="endTime" as={Form.Input} component={Input} type="time" label="End time" placeholder="End time" disabled={submitting} />
    </Form.Group>}
    <Field name="purpose" as={Form.TextArea} component={Input} autoHeight label="Purpose" placeholder="Purpose" disabled={submitting} />
    <Form.TextArea autoHeight readOnly label="Remark" value={remark} />
  </Form>
);

CreateLeaveRequestForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  duration: PropTypes.string.isRequired,
  resetStartTime: PropTypes.func.isRequired,
  resetEndTime: PropTypes.func.isRequired
};

const selector = formValueSelector('createLeaveRequest');

const mapStateToProps = state => ({
  duration: selector(state, 'duration')
});

const mapDispatchToProps = dispatch => ({
  resetStartTime: () => dispatch(change('createLeaveRequest', 'startTime', '09:00:00')),
  resetEndTime: () => dispatch(change('createLeaveRequest', 'endTime', '18:00:00')),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'createLeaveRequest',
    validate,
    initialValues: {
      duration: 'Full day',
      startTime: '09:00:00',
      endTime: '18:00:00'
    }
  })
);

export default enhance(CreateLeaveRequestForm);
