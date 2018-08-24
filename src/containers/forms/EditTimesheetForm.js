import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Input from '../../components/Input';
import { fetchTimesheetProjectRequest } from '../../actions/timesheet';
import { getTimesheetById, timesheetProjectsToOptions } from '../../selectors/timesheet';
import * as validator from '../../utils/validator';
import { taskOptions } from '../../utils/options';

const validate = (values) => {
  const errors = {};
  errors.timeIn = validator.timeBefore(values.timeIn, values.timeOut);
  errors.timeOut = validator.timeAfter(values.timeOut, values.timeIn);
  return errors;
};

const EditTimesheetForm = ({ handleSubmit, submitting, projects }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="projectId"
      as={Form.Dropdown}
      component={Input}
      search
      selection
      label="Project"
      placeholder="Project"
      options={projects}
      disabled={submitting}
      validate={validator.required}
    />
    <Form.Group widths="equal">
      <Field
        name="timeIn"
        as={Form.Input}
        component={Input}
        type="time"
        label="Time in"
        placeholder="Time in"
        disabled={submitting}
        validate={validator.required}
      />
      <Field
        name="timeOut"
        as={Form.Input}
        component={Input}
        type="time"
        label="Time out"
        placeholder="Time out"
        disabled={submitting}
        validate={validator.required}
      />
    </Form.Group>
    <Field
      name="task"
      as={Form.Select}
      component={Input}
      label="Task"
      placeholder="Task"
      options={taskOptions}
      disabled={submitting}
      validate={validator.required}
    />
    <Field
      name="description"
      as={Form.TextArea}
      component={Input}
      autoHeight
      label="Description"
      placeholder="Description"
      disabled={submitting}
    />
  </Form>
);

EditTimesheetForm.defaultProps = {
  projects: []
};

EditTimesheetForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  projects: PropTypes.array
};

const mapStateToProps = (state, { id }) => ({
  initialValues: {
    userId: state.auth.id,
    id: getTimesheetById(state, id).id,
    projectId: getTimesheetById(state, id).projectId,
    date: getTimesheetById(state, id).date,
    timeIn: getTimesheetById(state, id).timeIn,
    timeOut: getTimesheetById(state, id).timeOut,
    task: getTimesheetById(state, id).task,
    description: getTimesheetById(state, id).description
  },
  userId: state.auth.id,
  projects: timesheetProjectsToOptions(state)
});

const mapDispatchToProps = dispatch => ({
  fetchProject: userId => dispatch(fetchTimesheetProjectRequest(userId))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProject, userId } = this.props;
      fetchProject(userId);
    }
  }),
  reduxForm({
    form: 'editTimesheet',
    validate
  })
);

export default enhance(EditTimesheetForm);
