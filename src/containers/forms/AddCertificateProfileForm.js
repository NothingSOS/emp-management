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

const AddCertificateProfileForm = ({ masterTable, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="certificateId" as={Form.Select} component={Input} label="Certificate" placeholder="Certificate" options={masterTableToOptions(masterTable.certificates)} disabled={submitting} />
    <Field name="score" as={Form.Input} component={Input} label="Score" placeholder="Score" disabled={submitting} />
    <Field name="certificateDate" as={Form.Input} component={Input} type="date" label="Certificate date" placeholder="Certificate date" disabled={submitting} />
  </Form>
);

AddCertificateProfileForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  masterTable: state.masterTable,
  initialValues: {
    userId: state.profile.id
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addCertificateProfile',
    validate
  })
);

export default enhance(AddCertificateProfileForm);
