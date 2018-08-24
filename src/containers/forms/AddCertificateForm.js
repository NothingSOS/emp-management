import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';

const AddCertificateForm = ({ handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="name" as={Form.Input} component={Input} label="Name" placeholder="Name" disabled={submitting} />
      <Field name="institute" as={Form.Input} component={Input} label="Institute" placeholder="Institute" disabled={submitting} />
      <Field name="description" as={Form.TextArea} component={Input} label="Description" placeholder="Description" disabled={submitting} />
    </Form.Group>
  </Form>
);

AddCertificateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const enhance = compose(reduxForm({
  form: 'addCertificate'
}));

export default enhance(AddCertificateForm);
