import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Menu,
  Form,
  Radio,
  Checkbox,
  Pagination,
  Icon,
  TextArea,
  Input,
  Button,
  Label,
} from 'semantic-ui-react';
import Loader from '../../components/Loader';
import { pageChange } from '../../actions/takeExam';

const questionRenderer = (question, subcategory) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: question }} />
    <strong>(Topic: {subcategory.slice(0, 1).toUpperCase().concat(subcategory.slice(1))})</strong>
  </div>
);

const answerColorRenderer = (pickedAnswer, answer, solve) => {
  if (solve.includes(answer)) return 'green';
  else if (pickedAnswer.includes(answer)) return 'red';
  return 'grey';
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

const showAnswerCheckRadio = (pickedAnswer, answer) => {
  for (let i = 0; i < pickedAnswer.length; i += 1) {
    if (pickedAnswer[i].includes(answer)) return true;
  }

  return false;
};

const categoryLengthCalculate = (examList, activeCategory) => {
  let pageNumber = 0;
  for (let i = 0; i < examList.length; i += 1) {
    pageNumber += (examList[i].exCategory === activeCategory) ? 1 : 0;
  }
  return pageNumber;
};

const isPositive = string => (
  !((Number(string) * 100) % 10) && Number(string) > 0
);

const scoreValidityCheck = (score, isAllowZero) => (
  isAllowZero ?
    !score || !isPositive(score) || Number(score) === 0 :
    !score || !isPositive(score)
);

const scoreHandle = (score, fullScore) => {
  if (scoreValidityCheck(score, true)
    && (scoreValidityCheck(fullScore, true))) {
    return 'bothScoreValueError';
  }
  if (scoreValidityCheck(score, true)) {
    return 'scoreValueError';
  }
  else if (scoreValidityCheck(fullScore, true)) {
    return 'fullScoreValueError';
  }
  else if (Number(score) > Number(fullScore)) {
    console.log(score, fullScore);
    return fullScore > 0 ?
      'scoreValueExceed' :
      'scoreWithNoFullScore';
  }
  return 'OK';
};

const GradingForm = ({
  gradingId,
  isFetching,
  gradingList,
  currentActiveModalPage,
  onPageChange,
  activeModalCategory,
  onClickModalCategory,
  modalCategoryList,
  onInputCommentTextArea,
  onScoreChange,
  onFullScoreChange,
  onClickSave,
  onClickSend,
  updateScoreStatus,
  modalWarningExIdList,
  rowId, }) => (
  isFetching ?
    <Loader /> :
    <Segment.Group>
      <Segment raised style={{ width: '95%', margin: 'auto' }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <Menu fluid vertical tabular>
                <Menu.Item header name="Category menu" />
                {modalCategoryList && modalCategoryList.map(item => (
                  <Menu.Item
                    name={item[0]}
                    active={activeModalCategory === item[0]}
                    onClick={() => { onClickModalCategory(item[0]); pageChange(1); }}
                  />
                  ))}
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              <h1>
                  Applicant ID: {gradingId}
                  Question {currentActiveModalPage} from {filterExam(gradingList, activeModalCategory).length}
              </h1>
              {gradingList && filterExam(gradingList, activeModalCategory).length > 0
                  && filterExam(gradingList, activeModalCategory).map((row, i) => (
                    i === currentActiveModalPage - 1 ?
                      <Form>
                        <br />
                        {questionRenderer(row.exQuestion, row.exSubCategory)}
                        <br />
                        {row.exType === 'Choices' && row.exChoices.map((answer, j) => (
                          row.exAnswerLength === 1 ?
                            <Form.Field>
                              <p style={{ color: answerColorRenderer(row.cdAnswer, answer, row.exCorrect) }}>
                                <Radio disabled checked={showAnswerCheckRadio(row.cdAnswer, answer)} />
                                &nbsp;{(j + 1).toString().concat('. ').concat(answer)}
                              </p>
                            </Form.Field> :
                            <Form.Field>
                              <p style={{ color: answerColorRenderer(row.cdAnswer, answer, row.exCorrect) }}>
                                <Checkbox disabled checked={showAnswerCheckRadio(row.cdAnswer, answer)} />
                                &nbsp;{(j + 1).toString().concat('. ').concat(answer)}
                              </p>
                            </Form.Field>
                        ))}
                        {row.exType !== 'Choices' &&
                          <Form.Field>
                            <Grid>
                              <Grid.Row>
                                <Grid.Column width={8}>
                                  Answer:<br />
                                  <TextArea
                                    disabled
                                    value={row.cdAnswer && row.cdAnswer[0]}
                                    placeholder="No answer.."
                                  />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                  Comment:<br />
                                  <TextArea
                                    value={row.comment}
                                    placeholder="Comment.."
                                    onInput={(e, { value }) => onInputCommentTextArea(value, row.exId)}
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Form.Field>
                        }
                      </Form> : ''
                  ))}
              {!gradingList && <h1>Fetch fail somewhere!</h1>}
              <br />
              {gradingList && filterExam(gradingList, activeModalCategory).length > 0
                  && filterExam(gradingList, activeModalCategory).map((row, i) => (
                    i === currentActiveModalPage - 1 ?
                      row.exType === 'Choices' ?
                        <div>Point : {row.exType === 'Choices' && row.point[0]} / {row.exType === 'Choices' && row.point[1]}</div> :
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={2}>Point</Grid.Column>
                            <Grid.Column width={14}>
                              <Input
                                placeholder="Score.."
                                value={row.point[0] === 'UNKNOWN' || row.point[0] === '' ? '' : row.point[0]}
                                onChange={(e) => {
                                  onScoreChange(e, row.exId);
                                  const scoreStatus = scoreHandle(e.target.value, row.point[1]);
                                  updateScoreStatus(scoreStatus, row.exId, gradingList, modalWarningExIdList);
                                }}
                              />&nbsp;
                              {((row.scoreWarning && row.scoreWarning !== ' ') || row.point[0] === 'UNKNOWN') &&
                                <Label basic color="red" pointing="left">
                                  {row.scoreWarning}
                                </Label>
                              }
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column width={2}>Full Point</Grid.Column>
                            <Grid.Column width={14}>
                              <Input
                                placeholder="Full Score.."
                                value={row.point[1] === 'UNKNOWN' || row.point[1] === '' ? '' : row.point[1]}
                                onChange={(e) => {
                                  onFullScoreChange(e, row.exId);
                                  const scoreStatus = scoreHandle(row.point[0], e.target.value);
                                  updateScoreStatus(scoreStatus, row.exId, gradingList, modalWarningExIdList);
                                }}
                              />&nbsp;
                              {((row.fullScoreWarning && row.fullScoreWarning !== ' ') || row.point[1] === 'UNKNOWN') &&
                                <Label basic color="red" pointing="left">
                                  {row.fullScoreWarning}
                                </Label>
                              }
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      : <div />
                  ))}
              <Pagination
                floated="right"
                onPageChange={(e, object) => onPageChange(object.activePage)}
                activePage={currentActiveModalPage}
                boundaryRange={1}
                siblingRange={1}
                ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={(gradingList && categoryLengthCalculate(gradingList, activeModalCategory)) || (!gradingList && 5)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        {/* add onClick of these buttons */}
        <Button
          icon
          labelPosition="left"
          positive
          onClick={() => onClickSave(gradingList, rowId, modalWarningExIdList, gradingId)}
        >
          <Icon name="save" />
            Save
        </Button>
        {/*
            add function that disable submit button
            until grader will input all pair of score!
           */}
        <Button
          icon
          labelPosition="left"
          secondary
          onClick={() => onClickSend(gradingList, rowId, modalWarningExIdList, gradingId)}
        >
          <Icon name="send" />
            Send
        </Button>
      </Segment>
    </Segment.Group>
);

GradingForm.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  gradingId: PropTypes.string.isRequired,
  gradingList: PropTypes.array.isRequired,
  currentActiveModalPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  activeModalCategory: PropTypes.string.isRequired,
  onClickModalCategory: PropTypes.func.isRequired,
  modalCategoryList: PropTypes.array.isRequired,
  onInputCommentTextArea: PropTypes.func.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onFullScoreChange: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickSend: PropTypes.func.isRequired,
  updateScoreStatus: PropTypes.func.isRequired,
  modalWarningExIdList: PropTypes.array.isRequired,
  rowId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  gradingList: state.recruitment.gradingList,
  gradingId: state.recruitment.gradingId,
  currentActiveModalPage: state.recruitment.currentActiveModalPage,
  activeModalCategory: state.recruitment.activeModalCategory,
  modalCategoryList: state.recruitment.modalCategoryList,
  modalWarningExIdList: state.recruitment.modalWarningExIdList,
  rowId: state.recruitment.rowId,
});

export default connect(mapStateToProps)(GradingForm);
