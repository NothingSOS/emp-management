import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.firstName = validator.required(values.firstName);
  errors.lastName = validator.required(values.lastName);
  errors.email = validator.email(values.email);
  return errors;
};

const EditWorkProfileForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group widths="equal">
      <Field name="startDate" component={Input} type="date" label="Start date" placeholder="Start date" />
      <Field name="endDate" component={Input} type="date" label="End date" placeholder="End date" />
    </Form.Group>
    <Form.Group widths="equal">
      <Field name="firstNameTh" component={Input} label="ชื่อ" placeholder="ชื่อ" />
      <Field name="lastNameTh" component={Input} label="นามสกุล" placeholder="นามสกุล" />
    </Form.Group>
    <Field name="nickName" component={Input} label="Nick name" placeholder="Nick name" />
    <Field name="birthday" component={Input} label="Birth date" placeholder="Birth date" />
    <Field name="citizenId" component={Input} label="Citizen ID" placeholder="Citizen ID" />
    <Field name="mobileNumber" component={Input} label="Mobile No." placeholder="Mobile No." />
    <Field name="email" component={Input} label="Email" placeholder="Email" />
    <Field name="facebookId" component={Input} label="Facebook" placeholder="Facebook" />
    <Field name="lineId" component={Input} label="Line ID" placeholder="Line ID" />
    <Field name="address" component={Input} label="Address" placeholder="Address" />
  </Form>
);

EditWorkProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  initialValues: {
    userId: state.profile.userId,
    firstName: state.profile.firstName,
    lastName: state.profile.lastName,
    nickName: state.profile.nickName,
    citizenId: state.profile.citizenId,
    mobileNumber: state.profile.mobileNumber,
    email: state.profile.email,
    facebookId: state.profile.facebookId,
    lineId: state.profile.lineId,
    birthday: state.profile.birthday,
    address: state.profile.address,
    picture: state.profile.picture
  }
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'editGeneralProfile',
    validate
  })
);

export default enhance(EditWorkProfileForm);