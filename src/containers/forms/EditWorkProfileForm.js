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
  errors.startDate = validator.required(values.startDate);
  errors.endDate = validator.required(values.endDate);
  return errors;
};

const EditWorkProfileForm = ({ masterTable, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="levelId" as={Form.Select} component={Input} label="Level" placeholder="Level" options={masterTableToOptions(masterTable.levels)} disabled={submitting} />
    <Field name="departmentId" as={Form.Select} component={Input} label="Department" placeholder="Department" options={masterTableToOptions(masterTable.departments)} disabled={submitting} />
    <Field name="positionId" as={Form.Select} component={Input} label="Position" placeholder="Position" options={masterTableToOptions(masterTable.positions)} disabled={submitting} />
    <Field name="contractId" as={Form.Select} component={Input} label="Contract" placeholder="Contract" options={masterTableToOptions(masterTable.contracts)} disabled={submitting} />
    <Form.Group widths="equal">
      <Field name="startDate" as={Form.Input} component={Input} type="date" label="Start date" placeholder="Start date" disabled={submitting} />
      <Field name="endDate" as={Form.Input} component={Input} type="date" label="End date" placeholder="End date" disabled={submitting} />
    </Form.Group>
    <Field name="probationDate" as={Form.Input} component={Input} type="date" label="Probation date" placeholder="Probation date" disabled={submitting} />
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
