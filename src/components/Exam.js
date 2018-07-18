import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Grid, Dropdown, Input, Table, Pagination } from 'semantic-ui-react';
import { compose, withState } from 'recompose';

const examCategoryOptions = (exams, subjectNoFilter, subjectFilter, subjectList) => {
  exams.forEach((element) => {
    subjectNoFilter.push(element.exCategory);
  });

  subjectFilter = [...new Set(subjectNoFilter)];

  subjectList.push({ text: 'all categories', value: 'all categories' });
  subjectFilter.forEach((element) => {
    subjectList.push({ text: element, value: element });
  });

  return subjectList;
};
examCategoryOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired,
  subjectFilter: PropTypes.array.isRequired,
  subjectList: PropTypes.array.isRequired
};

const examSubCategoryOptions = (exams, examCategory, subjectNoFilter, subjectFilter, subjectList) => {
  exams.forEach((element) => {
    if (element.exCategory.toLowerCase() === examCategory) {
      subjectNoFilter.push(element.exSubcategory);
    }
  });

  subjectFilter = [...new Set(subjectNoFilter)];

  subjectList.push({ text: 'all sub-categories', value: 'all sub-categories' });
  subjectFilter.forEach((element) => {
    subjectList.push({ text: element, value: element });
  });

  return subjectList;
};
examSubCategoryOptions.propTypes = {
  subjectNoFilter: PropTypes.array.isRequired,
  subjectFilter: PropTypes.array.isRequired,
  subjectList: PropTypes.array.isRequired,
  examCategory: PropTypes.string.isRequired
};

const renderQuestion = question => (
  <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: question }} />
);

const showExamsFromPageNumber = (exams, examsFilter, row, onViewClick, onEditClick, onDeleteClick) => (
  <Table.Row verticalAlign="top">
    <Table.Cell>
      {renderQuestion(examsFilter[row].exQuestion)}
    </Table.Cell>
    <Table.Cell>
      <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}>{examsFilter[row].exCategory.charAt(0).toUpperCase().concat(examsFilter[row].exCategory.slice(1))}
      </div>
    </Table.Cell>
    <Table.Cell>
      <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}>{examsFilter[row].exSubcategory.charAt(0).toUpperCase().concat(examsFilter[row].exSubcategory.slice(1))}
      </div>
    </Table.Cell>
    <Table.Cell>
      <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}>{examsFilter[row].exType}
      </div>
    </Table.Cell>
    {examsFilter[row].exType === 'Write-Up' &&
      <Table.Cell><div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}><p>-</p></div></Table.Cell>
    }
    {examsFilter[row].exType === 'Choices' &&
      <Table.Cell>
        <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}>{(examsFilter[row].exChoice).map((choice, i) => (
          <p><strong>{i + 1}.</strong> {choice}</p>
        ))}
        </div>
      </Table.Cell>
    }
    {examsFilter[row].exType === 'Write-Up' &&
      <Table.Cell>
        <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}><p>-</p>
        </div>
      </Table.Cell>
    }
    {examsFilter[row].exType === 'Choices' &&
      <Table.Cell>
        <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}>{(examsFilter[row].exAnswer).map(ans => (
          <p>&#9679;&nbsp;{ans}</p>
        ))}
        </div>
      </Table.Cell>}
    <Table.Cell textAlign="center">
      <div style={{ overflowY: 'auto', height: '200px', wordWrap: 'break-word' }}>
        <Button active circular icon="eye" color="olive" size="big" onClick={() => onViewClick(examsFilter[row])} style={{ cursor: 'pointer' }} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button active circular icon="settings" color="linkedin" size="big" onClick={() => onEditClick(exams, examsFilter[row])} style={{ cursor: 'pointer' }} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button active circular icon="trash" color="google plus" size="big" onClick={() => onDeleteClick(examsFilter[row].exId)} style={{ cursor: 'pointer' }} />
      </div>
    </Table.Cell>
  </Table.Row>
);

const Exam = (({ onAddClick, onDeleteClick, onEditClick, onViewClick, onFilterChange, exams, examsFilter, disabled, setDisabled, category, setCategory, pageNumber, setPageNumber }) => (
  <div>
    <Segment.Group raised>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Dropdown
              fluid
              selection
              options={examCategoryOptions(exams, [], [], [])}
              placeholder="-- Search Category --"
              onChange={(e, { value }) => {
                setDisabled(value === 'all categories' || value === '' || value === undefined);
                setCategory(value);
                onFilterChange('searchCategory', value);
              }}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Dropdown
              fluid
              selection
              placeholder="-- Search Sub-Category --"
              options={examSubCategoryOptions(exams, category, [], [], [])}
              disabled={disabled}
              onChange={(e, { value }) => {
                onFilterChange('searchSubCategory', value);
              }}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <Input icon="search" placeholder="Search question ..." onChange={(e, { value }) => onFilterChange('searchText', value)} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Button icon labelPosition="left" floated="right" color="blue" onClick={onAddClick}>
              <Icon name="add" />
              Add new question
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Table striped selectable celled compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={6}>Question</Table.HeaderCell>
              <Table.HeaderCell width={2}>Category</Table.HeaderCell>
              <Table.HeaderCell width={2}>Sub-Category</Table.HeaderCell>
              <Table.HeaderCell width={2}>Type</Table.HeaderCell>
              <Table.HeaderCell width={2}>Choice</Table.HeaderCell>
              <Table.HeaderCell width={2}>Answer</Table.HeaderCell>
              <Table.HeaderCell >&nbsp;</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {((pageNumber * 3) - 3 < examsFilter.length) && showExamsFromPageNumber(exams, examsFilter, (pageNumber * 3) - 3, onViewClick, onEditClick, onDeleteClick)}
            {((pageNumber * 3) - 2 < examsFilter.length) && showExamsFromPageNumber(exams, examsFilter, (pageNumber * 3) - 2, onViewClick, onEditClick, onDeleteClick)}
            {((pageNumber * 3) - 1 < examsFilter.length) && showExamsFromPageNumber(exams, examsFilter, (pageNumber * 3) - 1, onViewClick, onEditClick, onDeleteClick)}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Pagination
                  floated="right"
                  defaultActivePage={1}
                  showFirstAndLastNav="true"
                  showPreviousAndNextNav="true"
                  showEllipsis="false"
                  ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                  firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                  lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                  prevItem={{ content: <Icon name="angle left" />, icon: true }}
                  nextItem={{ content: <Icon name="angle right" />, icon: true }}
                  totalPages={parseInt(examsFilter.length / 3, 10) + ((examsFilter.length % 3 !== 0) ? 1 : 0)}
                  onPageChange={(e, { activePage }) => { setPageNumber(activePage); }}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
    </Segment.Group>
  </div>
));

Exam.propTypes = {
  onAddClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onViewClick: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  exams: PropTypes.array.isRequired,
  examsFilter: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  setDisabled: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  pageNumber: PropTypes.number.isRequired,
  setPageNumber: PropTypes.func.isRequired
};

const enhance = compose(withState('disabled', 'setDisabled', true), withState('category', 'setCategory', ''), withState('pageNumber', 'setPageNumber', 1));

export default enhance(Exam);
