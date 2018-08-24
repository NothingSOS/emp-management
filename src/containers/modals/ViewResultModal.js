import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal as SUIModal,
  Grid,
  Menu,
  Pagination,
  Icon,
  Form,
  Radio,
  Checkbox,
  TextArea,
  Table,
} from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import { categoryModalChange, pageModalChange } from '../../actions/recruitmentProfile';

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

const filterExam = (list, activeCategory) => {
  const filter = [];
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].exCategory === activeCategory) {
      filter.push(list[i]);
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

const ViewResultModal = ({
  person,
  result,
  currentCategory,
  currentPage,
  onClose,
  changeCategory,
  changePage,
  categoryList,
  overall, }) => (
    <div>
      <SUIModal
        dimmer="blurring"
        size="large"
        closeIcon
        open
        onClose={onClose}
      >
        <SUIModal.Header>
          Exam result of ID: {person.id} (on {person.testDate})
        </SUIModal.Header>
        <SUIModal.Content scrolling>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <Menu vertical size="small" color="teal">
                  <Menu.Item name="overall" active={currentCategory === 'overall'} onClick={() => changeCategory('overall')}>
                    Overall
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Header>Category</Menu.Header>
                    <Menu.Menu>
                      {categoryList && categoryList.map(category => (
                        <Menu.Item
                          name={category[0]}
                          active={currentCategory === category[0]}
                          onClick={() => changeCategory(category[0])}
                        >
                          {category[0].charAt(0).toUpperCase().concat(category[0].slice(1))}
                        </Menu.Item>
                      ))}
                    </Menu.Menu>
                  </Menu.Item>
                </Menu>
              </Grid.Column>
              <Grid.Column width={12}>
                {overall && currentCategory === 'overall' &&
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.Cell width={2}>#</Table.Cell>
                        <Table.Cell>Category</Table.Cell>
                        <Table.Cell>Sub Category</Table.Cell>
                        <Table.Cell>Exam Type</Table.Cell>
                        <Table.Cell>Score</Table.Cell>
                        <Table.Cell>Full Score</Table.Cell>
                        <Table.Cell>Weight</Table.Cell>
                        <Table.Cell>Product</Table.Cell>
                      </Table.Row>
                    </Table.Header>
                    {overall.map((item, i) => (
                      <Table.Row>
                        <Table.Cell>{i + 1}</Table.Cell>
                        <Table.Cell>{item.category}</Table.Cell>
                        <Table.Cell>{item.subcategory}</Table.Cell>
                        <Table.Cell>{item.type}</Table.Cell>
                        <Table.Cell>{item.score}</Table.Cell>
                        <Table.Cell>{item.fullscore}</Table.Cell>
                        <Table.Cell>{item.weight ? item.weight : 'n/a'}</Table.Cell>
                        <Table.Cell>{item.weight ? item.weight * item.score : 'n/a'}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table>
                }
                {
                  result
                  && currentCategory !== 'overall'
                  && filterExam(result, currentCategory).length > 0
                  && filterExam(result, currentCategory).map((row, i) => (
                    i === currentPage - 1 ?
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
                                    placeholder="No Comment.."
                                  />
                                </Grid.Column>
                              </Grid.Row>
                            </Grid>
                          </Form.Field>
                        }
                      </Form> : ''
                  ))}
                {!result && <h1>Fetch fail somewhere!</h1>}
                <br />
                {currentCategory !== 'overall' &&
                  <Pagination
                    floated="right"
                    onPageChange={(e, object) => changePage(object.activePage)}
                    activePage={currentPage}
                    boundaryRange={1}
                    siblingRange={1}
                    ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                    firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                    lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                    prevItem={{ content: <Icon name="angle left" />, icon: true }}
                    nextItem={{ content: <Icon name="angle right" />, icon: true }}
                    totalPages={(result && categoryLengthCalculate(result, currentCategory)) || (!result && 5)}
                  />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </SUIModal.Content>
      </SUIModal>
    </div>
);

ViewResultModal.propTypes = {
  person: PropTypes.object.isRequired,
  result: PropTypes.array.isRequired,
  currentCategory: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  overall: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  person: {
    id: state.recruitmentProfile.data.profile.citizenId,
    testDate: state.recruitmentProfile.data.profile.examDate,
  },
  categoryList: state.recruitmentProfile.categoryList,
  currentCategory: state.recruitmentProfile.currentCategory,
  currentPage: state.recruitmentProfile.currentPage,
  result: state.recruitmentProfile.result,
  overall: state.recruitmentProfile.overall,
});

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal()),
  changeCategory: category => dispatch(categoryModalChange(category)),
  changePage: (page) => {
    console.log(page);
    dispatch(pageModalChange(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewResultModal);
