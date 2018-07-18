import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label } from 'semantic-ui-react';

const Input = ({ label, placeholder, input, meta, as: As, ...rest }) => {
  const handleChange = (e, { value }) => input.onChange(value);
  return (
    <Form.Field>
      <As {...input} label={label} placeholder={placeholder} error={meta.error && meta.touched} onChange={handleChange} {...rest} />
      {meta.touched && meta.error &&
      <Label basic color="red" pointing >{meta.error}</Label>}
    </Form.Field>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  as: PropTypes.func.isRequired
};

export default Input;
