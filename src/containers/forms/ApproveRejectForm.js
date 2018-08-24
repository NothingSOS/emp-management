import { Form } from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import Input from '../../components/Input';

// import { handleReduxFormSubmit } from '../../utils/helper';
// const renderTextArea = ({input, meta: { touched, error, warning }}) => (
//     <div>
//         <label>Content</label>
//         <div>
//             <textarea {...input} placeholder="Content" rows="10" cols="40"/>
//             {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//         </div>
//     </div>
// );

const ApproveRejectForm = ({ onSubmit }) => (
  <Form >
    <Form.Group onSubmit={onSubmit} widths="equal" >
      <Field name="comment" as={Form.TextArea} component={Input} />
    </Form.Group>
  </Form>
);

ApproveRejectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  initialValues: {
    id: state.modal.stack[1].props.id,
    type: state.modal.stack[1].props.type
  }
});
// const mapDispatchToProps = dispatch => ({
//   onClose: () => dispatch(closeModal()),
//   onClick: () => dispatch(submit('rejectApprove'))
// });

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'ApproveReject'
  })
);
export default enhance(ApproveRejectForm);
