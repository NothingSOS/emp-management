import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
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

const ownFlagOptions = [
  { key: 'myself', value: true, text: 'Myself' },
  { key: 'company', value: false, text: 'Company' }
];

const AddAssetProfileForm = ({ masterTable, handleSubmit, submitting, ownFlag }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="assetType" as={Form.Select} component={Input} label="Asset type" placeholder="Asset type" options={masterTableToOptions(masterTable.assetTypes)} disabled={submitting} />
    <Field name="ownFlag" as={Form.Select} component={Input} label="Owner" placeholder="Owner" options={ownFlagOptions} />
    {ownFlag ?
      <Field name="name" as={Form.Input} component={Input} label="Asset name" placeholder="Asset name" disabled={submitting} /> :
      <Field name="assetId" as={Form.Select} component={Input} label="Asset name" placeholder="Asset name" options={masterTableToOptions(masterTable.assets)} disabled={submitting} />
    }
    {ownFlag &&
      <Field name="serialNumber" as={Form.Input} component={Input} label="Serial No." placeholder="Serial No." disabled={submitting} />
    }
    <Field name="assetDate" as={Form.Input} component={Input} type="date" label="Date" placeholder="Date" disabled={submitting} />
    {ownFlag &&
      <Field name="description" as={Form.TextArea} component={Input} autoHeight label="Description" placeholder="Description" disabled={submitting} />
    }
  </Form>
);

AddAssetProfileForm.propTypes = {
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  ownFlag: PropTypes.bool.isRequired
};

const selector = formValueSelector('addAssetProfile');

const mapStateToProps = state => ({
  masterTable: state.masterTable,
  initialValues: {
    userId: state.profile.id,
    ownFlag: true
  },
  ownFlag: selector(state, 'ownFlag')
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addAssetProfile',
    validate
  })
);

export default enhance(AddAssetProfileForm);
