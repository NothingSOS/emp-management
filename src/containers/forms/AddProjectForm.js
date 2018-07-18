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

const paymentTypeOptions = [
  { key: 'Man-month', value: 'Man-month', text: 'Man-month' },
  { key: 'Man-day', value: 'Man-day', text: 'Man-day' },
];

const workingDayOptions = [
  { key: 22, value: 22, text: '22 days per month' },
  { key: 20, value: 20, text: '20 days per month' },
];

const AddProjectForm = ({ handleSubmit, submitting, setWorkingDay, paymentType }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="id" as={Form.Input} component={Input} label="Project No." placeholder="Project No." disabled={submitting} />
      <Field name="name" as={Form.Input} component={Input} label="Name" placeholder="Name" disabled={submitting} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="quotationId" as={Form.Input} component={Input} label="Quotation No." placeholder="Quotation No." disabled={submitting} />
      <Field name="customer" as={Form.Input} component={Input} label="Customer" placeholder="Customer" disabled={submitting} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="purchasedOrder" as={Form.Input} component={Input} label="Purchesed order No." placeholder="Purchesed order No." disabled={submitting} />
      <Field name="amount" as={Form.Input} component={Input} label="amount" placeholder="amount" disabled={submitting} />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="startDate" as={Form.Input} component={Input} label="From" placeholder="From" type="date" disabled={submitting} />
      <Field name="endDate" as={Form.Input} component={Input} label="To" placeholder="To" type="date" disabled={submitting} />
    </Form.Group>
    <Field
      name="paymentType"
      as={Form.Select}
      component={Input}
      label="Payment type"
      placeholder="Payment type"
      options={paymentTypeOptions}
      onChange={(event, newValue) => setWorkingDay(newValue === 'Man-month' ? 22 : null)}
      disabled={submitting}
    />
    {paymentType === 'Man-month' && <Field name="workingDay" as={Form.Select} component={Input} label="Working day" placeholder="Working day" options={workingDayOptions} disabled={submitting} />}
    <Field name="description" as={Form.TextArea} component={Input} autoHeight label="Description" placeholder="Description" disabled={submitting} />
  </Form>
);

AddProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  setWorkingDay: PropTypes.func.isRequired,
  paymentType: PropTypes.string.isRequired
};

const selector = formValueSelector('addProject');

const mapStateToProps = state => ({
  paymentType: selector(state, 'paymentType')
});

const mapDispatchToProps = dispatch => ({
  setWorkingDay: value => dispatch(change('addProject', 'workingDay', value))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'addProject',
    initialValues: {
      from: null,
      to: null,
      description: null
    },
    validate
  })
);

export default enhance(AddProjectForm);
