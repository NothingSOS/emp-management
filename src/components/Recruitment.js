import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Menu, Button } from 'semantic-ui-react';
import AllTable from './RecruitmentTable/AllTable';
import ApplyTable from './RecruitmentTable/ApplyTable';
import ApproveTable from './RecruitmentTable/ApproveTable';
import InProgressTable from './RecruitmentTable/InProgessTable';
import RejectTable from './RecruitmentTable/RejectTable';
import PassTable from './RecruitmentTable/PassTable';
import SignContractTable from './RecruitmentTable/SignContractTable';
import CompleteTable from './RecruitmentTable/CompleteTable';
import CancelTable from './RecruitmentTable/CancelTable';
import BlacklistTable from './RecruitmentTable/BlacklistTable';
import { getFilterRecruitment, getFilterRecruitmentTwoParam } from '../selectors/recruitment';

const getActiveTable = (
  activeItem,
  data,
  onSearchChange,
  sortKey,
  direction,
  handleSort,
  onConfirm,
  checkStatus,
  changeStatus,
  clearStatus,
  onClickGrade,
  modalWarningExIdList,
  onRefreshRecruitment
) => {
  let filteredData = [];
  switch (activeItem) {
    case 'All':
      return (<AllTable
        data={data}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Apply':
      filteredData = getFilterRecruitment(data, 'Apply');
      return (<ApplyTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        reject
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Approve':
      filteredData = getFilterRecruitment(data, 'Approve');
      return (<ApproveTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        reject
        changeStatus={changeStatus}
        clearStatus={clearStatus}
        onClickGrade={onClickGrade}
        modalWarningExIdList={modalWarningExIdList}
      />);
    case 'In Progress':
      filteredData = getFilterRecruitment(data, 'In Progress');
      return (<InProgressTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        reject
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Reject':
      filteredData = getFilterRecruitmentTwoParam(data, 'Reject', 'Fail');
      return (<RejectTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Pass':
      filteredData = getFilterRecruitment(data, 'Pass');
      return (<PassTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Sign Contract':
      filteredData = getFilterRecruitment(data, 'Sign Contract');
      console.log(filteredData);
      return (<SignContractTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        reject
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Cancel':
      filteredData = getFilterRecruitment(data, 'Cancel');
      return (<CancelTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Complete':
      filteredData = getFilterRecruitment(data, 'Complete');
      return (<CompleteTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
        onConfirm={onConfirm}
        checkStatus={checkStatus}
        changeStatus={changeStatus}
        clearStatus={clearStatus}
      />);
    case 'Blacklist':
      filteredData = getFilterRecruitment(data, 'Blacklist');
      return (<BlacklistTable
        data={filteredData}
        onSearchChange={onSearchChange}
        sortKey={sortKey}
        direction={direction}
        handleSort={handleSort}
      />);
    default:
      return ('ขออภัยในความไม่สะดวก');
  }
};

const Recruitment = ({
  activeItem,
  changeActiveItem,
  data,
  onSearchChange,
  sortKey,
  direction,
  handleSort,
  onConfirm,
  checkStatus,
  changeStatus,
  clearStatus,
  onClickGrade,
  modalWarningExIdList,
  onRefreshRecruitment }) => (
    <Segment raised>
      <Button onClick={onRefreshRecruitment}>
        Refresh
      </Button>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Menu color="blue" inverted fluid compact stackable >
              <Menu.Item name="All" active={activeItem === 'All'} onClick={() => changeActiveItem('All')} />
              <Menu.Item name="New" active={activeItem === 'Apply'} onClick={() => changeActiveItem('Apply')} />
              <Menu.Item name="Interview and Exam" active={activeItem === 'Approve'} onClick={() => changeActiveItem('Approve')} />
              <Menu.Item name="In Progress" active={activeItem === 'In Progress'} onClick={() => changeActiveItem('In Progress')} />
              <Menu.Item name="Reject or Fail" active={activeItem === 'Reject'} onClick={() => changeActiveItem('Reject')} />
              <Menu.Item name="Pass" active={activeItem === 'Pass'} onClick={() => changeActiveItem('Pass')} />
              <Menu.Item name="Sign Contract" active={activeItem === 'Sign Contract'} onClick={() => changeActiveItem('Sign Contract')} />
              <Menu.Item name="Cancel" active={activeItem === 'Cancel'} onClick={() => changeActiveItem('Cancel')} />
              <Menu.Item name="Complete" active={activeItem === 'Complete'} onClick={() => changeActiveItem('Complete')} />
              <Menu.Item name="Blacklist" active={activeItem === 'Blacklist'} onClick={() => changeActiveItem('Blacklist')} />
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column stretched width={16}>
            {getActiveTable(
              activeItem,
              data,
              onSearchChange,
              sortKey,
              direction,
              handleSort,
              onConfirm,
              checkStatus,
              changeStatus,
              clearStatus,
              onClickGrade,
              modalWarningExIdList,
              onRefreshRecruitment
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
);

Recruitment.propTypes = {
  changeActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
  onClickGrade: PropTypes.func.isRequired,
  modalWarningExIdList: PropTypes.array.isRequired,
  onRefreshRecruitment: PropTypes.func.isRequired
};

export default Recruitment;
