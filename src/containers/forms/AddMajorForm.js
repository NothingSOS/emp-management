import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import { masterTableToOptions, getFacultiesByUniversityId } from '../../utils/helper';

const AddMajorForm = ({ masterTable, universityId, handleSubmit, submitting }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field
        name="universityId"
        as={Form.Select}
        component={Input}
        label="University"
        options={masterTableToOptions(masterTable.universities)}
        disabled={submitting}
      />
      <Field
        name="facultyId"
        as={Form.Select}
        component={Input}
        label="Faculty"
        placeholder="Faculty"
        options={masterTableToOptions(getFacultiesByUniversityId(masterTable.faculties, universityId))}
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

AddMajorForm.defaultProps = {
  universityId: null
};

AddMajorForm.propTypes = {
  universityId: PropTypes.string,
  masterTable: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const selector = formValueSelector('addMajor');

const mapStateToProps = state => ({
  masterTable: state.masterTable,
  universityId: selector(state, 'universityId')
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'addMajor'
  }));

export default enhance(AddMajorForm);
