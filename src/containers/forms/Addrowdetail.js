import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, reset } from 'redux-form';
import { Form, Button } from 'semantic-ui-react';
import * as validator from '../../utils/validator';
import Input from '../../components/Input';

const AddRowDetail = ({ handleSubmit, num }) => {
  switch (num) {
    case 1:
      return (
        <Form onSubmit={handleSubmit} >
          <Form.Group widths="equal">
            <Field as={Form.Input} component={Input} name="field1" type="text" label="Suppliers/Customers" placeholder="Suppliers/Customers" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field2" type="text" label="Description" placeholder="Description" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field3" type="text" label="Project No." placeholder="Project No." validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field4" type="text" label="Amount (Baht)" placeholder="Amount (Baht)" validate={[validator.required, validator.check2Decimal]} />
          </Form.Group>
          <Button type="submit" >Add Row</Button>
        </Form>
      );
    case 2:
      return (
        <Form onSubmit={handleSubmit} >
          <Form.Group widths="equal">
            <Field as={Form.Input} component={Input} name="field1" type="text" label="ช่วงเวลาใช้เงิน Advance" placeholder="ช่วงเวลาใช้เงิน Advance" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field2" type="date" label="กำหนดเคลียร์คืน" placeholder="กำหนดเคลียร์คืน" validate={[validator.required, validator.date]} />
            <Field as={Form.Input} component={Input} name="field3" type="text" label="Description" placeholder="Description" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field4" type="text" label="Amount (Baht)" placeholder="Amount (Baht)" validate={[validator.required, validator.check2Decimal]} />
          </Form.Group>
          <Button type="submit" >Add Row</Button>
        </Form>
      );
    case 3:
      return (
        <Form onSubmit={handleSubmit} >
          <Form.Group widths="equal">
            <Field as={Form.Input} component={Input} name="field1" type="text" label="ช่วงเวลาใช้เงิน Advance" placeholder="ช่วงเวลาใช้เงิน Advance" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field2" type="date" label="กำหนดเคลียร์คืน" placeholder="กำหนดเคลียร์คืน" validate={[validator.required, validator.date]} />
            <Field as={Form.Input} component={Input} name="field3" type="text" label="Description" placeholder="Description" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field4" type="text" label="Amount (Baht)" placeholder="Amount (Baht)" validate={[validator.required, validator.check2Decimal]} />
          </Form.Group>
          <Button type="submit" >Add Row</Button>
        </Form>
      );
    case 4:
      return (
        <Form onSubmit={handleSubmit} >
          <Form.Group widths="equal">
            <Field as={Form.Input} component={Input} name="field1" type="date" label="ว / ด / ป" placeholder="ว / ด / ป" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field2" type="date" label="กรณีวันหยุดให้ระบุวันด้วย" placeholder="กรณีวันหยุดให้ระบุวันด้วย" />
            <Field as={Form.Input} component={Input} name="field3" type="text" label="รายการ" placeholder="รายการ" validate={validator.required} />
            <Field as={Form.Input} component={Input} name="field4" type="text" label="จำนวนเงิน" placeholder="จำนวนเงิน" validate={[validator.required, validator.check2Decimal]} />
            <Field as={Form.Input} component={Input} name="field5" type="text" label="หมายเหตุ" placeholder="หมายเหตุ" />
          </Form.Group>
          <Button type="submit" >Add Row</Button>
        </Form>
      );
    default:
      return (
        <div>
          default AddRowDetail
        </div>
      );
  }
};

AddRowDetail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const afterSubmit = (result, dispatch) =>
  dispatch(reset('addrowdetail'));

const enhance = compose(
  connect(null, null),
  reduxForm({
    form: 'addrowdetail',
    onSubmitSuccess: afterSubmit,
    destroyOnUnmount: false
  })
);
export default enhance(AddRowDetail);
