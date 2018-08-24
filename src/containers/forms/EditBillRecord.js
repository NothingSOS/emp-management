/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { createErpDetailRequest, fetchErpDetailRequest, deleteRow, addRow, deleteImage, addImage, deleteImageUpdate } from '../../actions/erpdetail';
import Loader from '../../components/Loader';
import ERPDETAIL from '../../components/DetailErp';
import * as action from '../../constants/actionTypes';

const ErpDetailPage = ({ isFetching, erpdetail, deleteRow, handleSubmit, createErpDetail, handleDeleteImage, handleImageChange, handleDeleteImageUpdate }) => (
  <div>
    {isFetching ? <Loader /> : <ERPDETAIL erpdetail={erpdetail} deleteRow={deleteRow} handleSubmit={handleSubmit} createErpDetail={createErpDetail} handleDeleteImage={handleDeleteImage} handleImageChange={handleImageChange} handleDeleteImageUpdate={handleDeleteImageUpdate} />}
  </div>
);

ErpDetailPage.defaultProps = {
  isFetching: true,
  fetchDetail: {}
};

ErpDetailPage.propTypes = {
  isFetching: PropTypes.bool,
  erpdetail: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
  createErpDetail: PropTypes.func.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
  handleDeleteImageUpdate: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.erpdetail.isFetching,
  erpdetail: state.erpdetail
});

const mapDispatchToProps = dispatch => ({
  fetchErpDetail: id => dispatch(fetchErpDetailRequest(id)),
  deleteRow: index => dispatch(deleteRow(index)),
  handleSubmit: value => dispatch(addRow(action.ERPDETAIL_ADD_ROW, value)),
  handleDeleteImage: index => dispatch(deleteImage(index)),
  createErpDetail: value => dispatch(createErpDetailRequest(value)),
  handleImageChange: e => dispatch(addImage(e)),
  handleDeleteImageUpdate: index => dispatch(deleteImageUpdate(index))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchErpDetail, match: { params } } = this.props;
      fetchErpDetail(params.id);
      console.log(params.id);
    }
  })
);

export default enhance(ErpDetailPage);
