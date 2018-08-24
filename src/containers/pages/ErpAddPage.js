import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { addRow, deleteRow, changeDropdown, fileUpload, deleteUpload } from '../../actions/addrow';
import { createErpRequest } from '../../actions/erp';
import * as add from '../../constants/actionTypes';
import ErpAdd from '../../components/ErpAdd';
// import history from '../history';

const erpAdd = ({ handleSubmit, handleDeleteRow, addrow, img, arraddrow, handleDropdown, handleCreate, handlerFileChanged, handleDeleteUpload }) => (
  <div>
    <ErpAdd
      addrow={addrow}
      arraddrow={arraddrow}
      img={img}
      handleDropdown={handleDropdown}
      handleSubmit={handleSubmit}
      handleDeleteRow={handleDeleteRow}
      handleDeleteUpload={handleDeleteUpload}
      handleCreate={handleCreate}
      handlerFileChanged={handlerFileChanged}
    />
  </div>
);

erpAdd.defaultProps = {
  addrow: [],
  img: [],
  arraddrow: [],
};

erpAdd.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteRow: PropTypes.func.isRequired,
  addrow: PropTypes.array,
  img: PropTypes.array,
  arraddrow: PropTypes.array,
  handleDropdown: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleDeleteUpload: PropTypes.func.isRequired,
  handlerFileChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  addrow: [...state.addrow.props],
  img: [...state.addrow.img],
  arraddrow: [[state.addrow.select], [...state.addrow.props], [...state.addrow.img]],
});


const mapDispatchToProps = dispatch => ({
  handleSubmit: value => dispatch(addRow(add.ERPADD_ADD_ROW, value)),
  handleDeleteRow: index => dispatch(deleteRow(index)),
  handleDropdown: (key, value) => dispatch(changeDropdown(key, value)),
  handleCreate: arraddrow => dispatch(createErpRequest(arraddrow)),
  handlerFileChanged: e => dispatch(fileUpload(e)),
  handleDeleteUpload: index => dispatch(deleteUpload(index))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      //   const { fetchErp } = this.props;
      //   fetchErp();
    }
  })
);
export default enhance(erpAdd);
