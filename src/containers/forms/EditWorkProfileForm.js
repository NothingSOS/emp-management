import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import { masterTableToOptions } from '../../utils/helper';

const validate = (values) => {
  const errors = {};
  if (values.endDate) {
    errors.startDate = validator.dateBefore(values.startDate, values.endDate);
    errors.endDate = validator.dateAfter(values.endDate, values.startDate);
  }
  errors.probationDate = validator.probationDateAfter(values.probationDate, values.startDate);
  return errors;
};

const engineerOptions = [
  { key: 'engineer', value: true, text: 'Engineer' },
  { key: 'non-engineer', value: false, text: 'Non-Engineer' }
];

const EditWorkProfileForm = ({ masterTable, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="levelId"
      as={Form.Select}
      component={Input}
      label="Level"
      placeholder="Level"
      options={masterTableToOptions(masterTable.levels)}
      disabled={submitting}
    />
    <Field
      name="departmentId"
      as={Form.Select}
      component={Input}
      label="Department"
      placeholder="Department"
      options={masterTableToOptions(masterTable.departments)}
      disabled={submitting}
    />
    <Field
      name="positionId"
      as={Form.Select}
      component={Input}
      label="Position"
      placeholder="Position"
      options={masterTableToOptions(masterTable.positions)}
      disabled={submitting}
    />
    <Field
      name="contractId"
      as={Form.Select}
      component={Input}
      label="Contract"
      placeholder="Contract"
      options={masterTableToOptions(masterTable.contracts)}
      disabled={submitting}
    />
    <Field
      name="engineer"
      as={Form.Select}
      component={Input}
      label="Engineer"
      placeholder="Engineer"
      options={engineerOptions}
      disabled={submitting}
    />
    <Form.Group widths="equal">
      <Field
        name="startDate"
        as={Form.Input}
        component={Input}
        type="date"
        label="Start date"
        placeholder="Start date"
        disabled={submitting}
        validate={validator.required}
      />
      <Field
        name="endDate"
        as={Form.Input}
        component={Input}
        type="date"
        label="End date"
        placeholder="End date"
      />
    </Form.Group>
    <Field
      name="probationDate"
      as={Form.Input}
      component={Input}
      type="date"
      label="Probation date"
      placeholder="Probation date"
      disabled={submitting}
      validate={validator.required}
    />
  </Form>
);

EditWorkProfileForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  masterTable: state.masterTable,
  initialValues: {
    userId: state.profile.work.userId,
    departmentId: state.profile.work.departmentId,
    positionId: state.profile.work.positionId,
    levelId: state.profile.work.levelId,
    contractId: state.profile.work.contractId,
    engineer: state.profile.work.engineer,
    startDate: state.profile.work.startDate,
    endDate: state.profile.work.endDate,
    probationDate: state.profile.work.probationDate
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editWorkProfile',
    validate
  })
);

export default enhance(EditWorkProfileForm);
