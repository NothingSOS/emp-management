import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { Form, Header, Icon, Button, Label, Checkbox } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';
import ExamRichTextEditor from '../../components/ExamRichTextEditor';

const validate = (values) => {
  const errors = {};
  errors.examType = validator.required(values.examType);
  errors.examCategory = validator.required(values.examCategory);
  errors.examSubCategory = validator.required(values.examSubCategory);

  if (values.examType === 'Choices') {
    let hasAnswer = false;
    let sameAnswer = false;
    errors.choices = [];
    for (let i = 0; i < values.choices.length; i += 1) {
      if (values.choices[i].data === undefined) {
        continue;
      }
      for (let j = 0; j < i; j += 1) {
        if (values.choices[j].data === undefined) {
          continue;
        }
        if (values.choices[j].data.toLowerCase().trimRight() === values.choices[i].data.toLowerCase().trimRight()) {
          sameAnswer = !(values.choices[j].data === undefined || values.choices[j].data === '');
          break;
        }
      }
      if (sameAnswer) {
        break;
      }
      if (values.choices[i].answer === true) {
        hasAnswer = true;
      }
    }

    if (sameAnswer) {
      errors.choices._error = 'Every choices need to be different';
    }
    else if (!hasAnswer) {
      errors.choices._error = 'ExamType:Choice need answer';
    }
  }
  return errors;
};

const requiredField = value => ((value) ? undefined : 'Required');

const examTypeOptions = [
  { key: 'Write-Up', value: 'Write-Up', text: 'Write-Up' },
  { key: 'Choices', value: 'Choices', text: 'Choices' }
];

const examCategoryOptions = (exams, subjectNoFilter) => {
  exams.forEach((element) => {
    subjectNoFilter.push(element.exCategory);
  });

  return [...new Set(subjectNoFilter)];
};
examCategoryOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired
};

const examSubCategoryOptions = (exams, examCategory, subjectNoFilter) => {
  exams.forEach((element) => {
    if (element.exCategory.toLowerCase() === examCategory) {
      subjectNoFilter.push(element.exSubcategory);
    }
  });

  return [...new Set(subjectNoFilter)];
};
examSubCategoryOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired,
  examCategory: PropTypes.string.isRequired
};

const renderCheckBox = ({ input, label }) => (
  <Form.Field>
    <Checkbox
      label={label}
      checked={input.value}
      onChange={(e, { checked }) => input.onChange(checked)}
    />
  </Form.Field>
);
renderCheckBox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};

const renderChoices = ({ fields, placeHold, meta }) => (
  <div>
    <Header as="h5">Choices
      <label style={{ color: 'red' }}>*</label>
      {meta.dirty && meta.error &&
        <Label basic color="red" pointing="left" >{meta.error}</Label>}
    </Header>
    {fields.map((choice, index) => {
      placeHold = (('Choice ').concat((index + 1))).concat(' ...');
      return (
        <div>
          <Form.Group>
            <Field name={`${choice}.data`} as={Form.Input} component={Input} placeholder={placeHold} disabled={meta.submitting} validate={[requiredField]} />
            <Field name={`${choice}.answer`} component={renderCheckBox} label="Correct Answer" disabled={meta.submitting} />
            <Icon type="button" fitted name="ban" color="red" size="large" onClick={() => fields.remove(index)} disabled={meta.submitting} />
          </Form.Group>
          <sbr />
        </div>
      );
    })}
    <Button type="button" icon labelPosition="left" onClick={() => fields.push({ data: '', answer: false })} basic color="teal" disabled={meta.submitting}>
      <Icon name="add" />
      NEW CHOICE
    </Button>
  </div>
);
renderChoices.propTypes = {
  fields: Field.isRequired,
  placeHold: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};

const EditExamForm = ({ handleSubmit, submitting, examType, exams, examCategory, question }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="examCategory" as={Form.Input} component={Input} list="exam_category" label="Exam Category" placeholder="e.g. English" disabled={submitting} required />
    <datalist id="exam_category">
      {
        (examCategoryOptions(exams, [])).map(type => (<option value={type} />))
      }
    </datalist>
    <div>
      <Field name="examSubCategory" as={Form.Input} component={Input} list="exam_subCategory" label="Exam Sub-Category" placeholder="Sub-Category ..." disabled={submitting} required />
      <datalist id="exam_subCategory" style={{ zIndex: '1' }}>
        {
          (examSubCategoryOptions(exams, examCategory, [])).map(type => (<option value={type} />))
        }
      </datalist>
    </div>
    <ExamRichTextEditor quiz={question} />
    <Field name="examType" as={Form.Select} component={Input} label="Exam Type" placeholder="-- Exam Type --" options={examTypeOptions} disabled={submitting} required />
    {examType === 'Choices' && <FieldArray name="choices" component={renderChoices} disabled={submitting} />}
    <Field hidden name="examId" as={Form.Input} component={Input} type="hidden" />
    <br />
  </Form>
);

EditExamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  examType: PropTypes.string.isRequired,
  exams: PropTypes.array.isRequired,
  examCategory: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired
};

const selector = formValueSelector('editExam');

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    examId: ownProps.thisExam.exId,
    examCategory: ownProps.thisExam.exCategory,
    examSubCategory: ownProps.thisExam.exSubcategory,
    examType: (ownProps.thisExam.exChoice.toString() === '-') ? 'Write-Up' : 'Choices',
    choices: (ownProps.thisExam.exChoice.toString() === '-')
      ? [{ data: '', answer: false }, { data: '', answer: false }]
      : ownProps.thisExam.exChoice.map((choice) => {
        const ans = ownProps.thisExam.exAnswer.includes(choice);
        return { data: choice, answer: ans };
      })
  },
  question: ownProps.thisExam.exQuestion,
  examType: selector(state, 'examType'),
  examCategory: selector(state, 'examCategory')
});

const enhance = compose(
  connect(mapStateToProps, null),
  reduxForm({
    form: 'editExam',
    validate
  })
);

export default enhance(EditExamForm);
