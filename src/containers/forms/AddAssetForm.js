import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import { masterTableToOptions } from '../../utils/helper';

const AddAssetForm = ({ masterTable, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field
        name="assetTypeId"
        as={Form.Select}
        component={Input}
        label="Asset Type"
        options={masterTableToOptions(masterTable.assetTypes)}
        disabled={submitting}
      />
      <Field
        name="name"
        as={Form.Input}
        component={Input}
        label="Name"
        placeholder="Name"
        disabled={submitting}
      />
      <Field
        name="serialNumber"
        as={Form.Input}
        component={Input}
        label="Serial Number"
        placeholder="Serial Number"
        disabled={submitting}
      />
      <Field
        name="description"
        as={Form.TextArea}
        component={Input}
        label="Description"
        placeholder="Description"
        disabled={submitting}
      />
    </Form.Group>
  </Form>
);

AddAssetForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  masterTable: state.masterTable
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addAsset'
  }));

export default enhance(AddAssetForm);
