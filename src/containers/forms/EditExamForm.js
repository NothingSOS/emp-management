import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm, formValueSelector, FieldArray } from 'redux-form';
import { Form, Header, Icon, Button } from 'semantic-ui-react';
import Input from '../../components/Input';
import * as validator from '../../utils/validator';

const validate = (values) => {
  const errors = {};
  errors.examType = validator.required(values.examType);
  errors.question = validator.required(values.question);
  errors.examCategory = validator.required(values.examCategory);

  return errors;
};

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

const renderChoices = ({ fields, placeHold, submitting }) => (
  <div>
    <Header as="h5">Choices</Header>
    {fields.map((choice, index) => {
      placeHold = (('Choice ').concat((index + 1))).concat(' ...');
      return (
        <div>
          <Form.Group>
            <Field name={`${choice}.data`} as={Form.Input} component={Input} placeholder={placeHold} disabled={submitting} />
            <Field name={`${choice}.answer`} as={Form.Checkbox} component={Input} label="Correct Answer" disabled={submitting} />
            <Icon fitted name="ban" color="red" size="large" onClick={() => fields.remove(index)} disabled={submitting} />
          </Form.Group>
          <sbr />
        </div>
      );
    })}
    <Button type="button" icon labelPosition="left" onClick={() => fields.push({ data: '', answer: false })} basic color="teal" disabled={submitting}>
      <Icon name="add" />
      NEW CHOICE
    </Button>
  </div>
);
renderChoices.propTypes = {
  fields: Field.isRequired,
  placeHold: PropTypes.string.isRequired,
  submitting: PropTypes.bool.isRequired
};

const EditExamForm = ({ handleSubmit, submitting, examType, exams, examCategory }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="examCategory" as={Form.Input} component={Input} list="exam_category" label="Exam Category" placeholder="e.g. English" disabled={submitting} required />
    <datalist id="exam_category">
      {
        (examCategoryOptions(exams, [])).map(type => (<option value={type} />))
      }
    </datalist>
    <div>
      <Field name="examSubCategory" as={Form.Input} component={Input} list="exam_subCategory" label="Exam Sub-Category" placeholder="Sub-Category ..." disabled={submitting} required />
      <datalist id="exam_subCategory">
        {
          (examSubCategoryOptions(exams, examCategory, [])).map(type => (<option value={type} />))
        }
      </datalist>
    </div>
    <Field name="question" as={Form.TextArea} component={Input} autoHeight label="Question" placeholder="New Question ..." disabled={submitting} required />
    <Field name="examType" as={Form.Select} component={Input} label="Exam Type" placeholder="-- Exam Type --" options={examTypeOptions} disabled={submitting} required />
    {examType === 'Choices' && <FieldArray name="choices" component={renderChoices} disabled={submitting} />}
    <Field hidden name="examId" as={Form.Input} component={Input} type="hidden" />
  </Form>
);

EditExamForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  examType: PropTypes.string.isRequired,
  exams: PropTypes.array.isRequired,
  examCategory: PropTypes.string.isRequired
};

const selector = formValueSelector('editExam');

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    examId: ownProps.thisExam.exId,
    examCategory: ownProps.thisExam.exCategory,
    examSubCategory: ownProps.thisExam.exSubcategory,
    question: ownProps.thisExam.exQuestion.replace(/<br \/>/g, '\r\n'),
    examType: (ownProps.thisExam.exChoice.toString() === '-') ? 'Write-Up' : 'Choices',
    choices: (ownProps.thisExam.exChoice.toString() === '-')
      ? [{ data: '', answer: false }, { data: '', answer: false }]
      : ownProps.thisExam.exChoice.map((choice) => {
        const ans = ownProps.thisExam.exAnswer.includes(choice);
        return { data: choice, answer: ans };
      })
  },
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
