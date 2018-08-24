import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchErpRequest,
  deleteErpRequest,
  changePagination,
  filterErp,
  generateExcel
} from '../../actions/erp';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';
import Loader from '../../components/Loader';
import Erp from '../../components/Erp';

const ErpPage = ({ isFetching, erps, onDeleteClick, onSearchChange, activePage, handlePaginationChange, searchText, genExcel }) => (
  <div>
    {isFetching ? <Loader /> : <Erp
      erps={erps}
      onDeleteClick={onDeleteClick}
      onSearchChange={onSearchChange}
      activePage={activePage}
      handlePaginationChange={handlePaginationChange}
      searchText={searchText}
      genExcel={genExcel}
    />}
  </div>
);

ErpPage.defaultProps = {
  isFetching: true
};

ErpPage.propTypes = {
  isFetching: PropTypes.bool,
  erps: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
  genExcel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.erp.isFetching,
  erps: [...state.erp.lists],
  activePage: state.erp.activePage,
  searchText: state.erp.searchText
});


const mapDispatchToProps = dispatch => ({
  fetchErp: () => dispatch(fetchErpRequest()),
  onDeleteClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete confirmation',
    description: 'Are you sure to Delete this request ?',
    onConfirm: () => dispatch(deleteErpRequest(id)),
  })),
  handlePaginationChange: (e, { activePage }) => dispatch(changePagination(activePage)),
  onSearchChange: e => dispatch(filterErp(e.target.value)),
  genExcel: (id, name, createDate) => dispatch(generateExcel(id, name, createDate))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchErp } = this.props;
      fetchErp();
    }
  })
);

export default enhance(ErpPage);
