import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Segment,
  Grid,
  Pagination,
  Icon,
  Form,
  Radio,
  Checkbox,
  Button,
  TextArea,
  Menu,
  Header,
} from 'semantic-ui-react';
import { pageChange } from '../actions/takeExam';
import TakeExamTimer from './TakeExamTimer';

const questionRenderer = (question, subcategory) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: question }} />
    <strong>(Topic: {subcategory.slice(0, 1).toUpperCase().concat(subcategory.slice(1))})</strong>
  </div>
);

const categoryLengthCalculate = (examList, activeCategory) => {
  let pageNumber = 0;
  for (let i = 0; i < examList.length; i += 1) {
    pageNumber += (examList[i].exCategory === activeCategory) ? 1 : 0;
  }
  return pageNumber;
};

const filterExam = (examList, activeCategory) => {
  const filter = [];
  for (let i = 0; i < examList.length; i += 1) {
    if (examList[i].exCategory === activeCategory) {
      filter.push(examList[i]);
    }
  }
  return filter;
};

const showAnswerCheckRadio = (exId, pickedAnswer, answer) => {
  for (let i = 0; i < pickedAnswer.length; i += 1) {
    if (pickedAnswer[i].question === exId && pickedAnswer[i].answer.includes(answer)) {
      return true;
    }
  }
  return false;
};

const showAnswerText = (exId, pickedAnswer) => {
  for (let i = 0; i < pickedAnswer.length; i += 1) {
    if (pickedAnswer[i].question === exId) {
      return pickedAnswer[i].answer[0];
    }
  }
  return undefined;
};

const TakeExam = ({
  examList,
  currentActivePage,
  onPageChange,
  activeCategory,
  pickedAnswer,
  answerList,
  onClickRadio,
  onClickCheckbox,
  onInputTextArea,
  onClickSave,
  onClickSubmit,
  id,
  onClickCategory,
  categoryList,
  saveStatus,
  startTime,
  onClickLogout,
  rowId, }) =>
  (
    <div>
      <br />
      <Header style={{ textAlign: 'right', width: '95%' }} as="h1">Login as {id}</Header>
      <br />
      <br />
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <Segment.Group raised style={{ width: '95%', margin: 'auto' }}>
              <Grid>
                <Grid.Column width={3}>
                  <Menu fluid vertical tabular>
                    <Menu.Item header name="Category Menu" />
                    {categoryList && categoryList.map(category => (
                      <Menu.Item
                        name={('► ').concat(category[0].charAt(0).toUpperCase().concat(category[0].slice(1)))}
                        active={activeCategory === category[0]}
                        onClick={() => { onClickCategory(category[0]); pageChange(1); }}
                      />
                    ))}
                  </Menu>
                </Grid.Column>
                <Grid.Column width={13}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={15}>
                        <br />
                        <Form>
                          <Grid>
                            <Grid.Row>
                              <Grid.Column width={10}>
                                <h1>
                                  Question {currentActivePage} of {filterExam(examList, activeCategory).length}
                                </h1>
                              </Grid.Column>
                              <Grid.Column width={6} style={{ textAlign: 'right' }}>
                                {(startTime) ? <TakeExamTimer startTime={startTime} rowId={rowId} id={id} answerList={answerList} /> : <div>&nbsp;</div>}
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        </Form>
                        {filterExam(examList, activeCategory).length > 0 && filterExam(examList, activeCategory).map((row, i) => (
                          i === currentActivePage - 1 ?
                            <Form>
                              <br />
                              {questionRenderer(row.exQuestion, row.exSubcategory)}
                              <br />
                              {row.exType === 'Choices' && row.exChoice.map((answer, j) => (
                                row.exAnswerLength === 1 ?
                                  <Form.Field>
                                    <p>
                                      <Radio
                                        label={(j + 1).toString().concat('. ').concat(answer)}
                                        value={answer}
                                        checked={showAnswerCheckRadio(row.exId, answerList, answer)}
                                        onClick={(e, { value }) => {
                                          onClickRadio(value, currentActivePage, pickedAnswer, row.exId);
                                        }}
                                      />
                                    </p>
                                  </Form.Field> :
                                  <Form.Field>
                                    <p>
                                      <Checkbox
                                        label={(j + 1).toString().concat('. ').concat(answer)}
                                        value={answer}
                                        checked={showAnswerCheckRadio(row.exId, answerList, answer)}
                                        onClick={(e, { value }) => {
                                          onClickCheckbox(value, currentActivePage, pickedAnswer, row.exId);
                                        }}
                                      />
                                    </p>
                                  </Form.Field>
                              ))}
                              {row.exType !== 'Choices' &&
                                <Form.Field>
                                  <TextArea
                                    value={showAnswerText(row.exId, answerList)}
                                    placeholder="Type the answer here.."
                                    onInput={(e, { value }) => {
                                      onInputTextArea(value, currentActivePage, row.exId);
                                    }}
                                  />
                                </Form.Field>}
                            </Form> : ''
                        ))}
                        {!examList && (
                          <h1>Fetch fail somewhere!</h1>
                        )}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={15}>
                        <Pagination
                          floated="right"
                          onPageChange={(e, { activePage }) => onPageChange(activePage)}
                          activePage={currentActivePage}
                          boundaryRange={1}
                          siblingRange={1}
                          ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                          firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                          lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                          prevItem={{ content: <Icon name="angle left" />, icon: true }}
                          nextItem={{ content: <Icon name="angle right" />, icon: true }}
                          totalPages={categoryLengthCalculate(examList, activeCategory)}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <br />
                </Grid.Column>
              </Grid>
              <Segment>
                <Button icon labelPosition="left" primary onClick={() => onClickSave(rowId, answerList, id)}>
                  <Icon name="save" />
                  Save
                </Button>
                <Button icon labelPosition="left" secondary onClick={() => onClickSubmit(rowId, answerList, id)}>
                  <Icon name="send" />
                  Submit
                </Button>
                <Button floated="right" icon labelPosition="left" negative onClick={() => onClickLogout(rowId, answerList, id)}>
                  <Icon name="sign out" />
                  Log out
                </Button>
                <br />
                <div style={{ color: (saveStatus === 'Save answers error !') ? 'red' : 'green' }}>{saveStatus}</div>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );

TakeExam.propTypes = {
  examList: PropTypes.array.isRequired,
  currentActivePage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  pickedAnswer: PropTypes.array.isRequired,
  answerList: PropTypes.array.isRequired,
  onClickRadio: PropTypes.func.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  onInputTextArea: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onClickCategory: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  saveStatus: PropTypes.string.isRequired,
  startTime: PropTypes.instanceOf(moment).isRequired,
  onClickLogout: PropTypes.func.isRequired,
  rowId: PropTypes.string.isRequired,
};

export default TakeExam;
