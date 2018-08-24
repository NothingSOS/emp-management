import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import {
  fetchMasterTableRequest,
  deleteAssetTypeRequest,
  deleteAssetRequest,
  deleteCertificateRequest,
  deleteContractRequest
} from '../../actions/masterTable';
import Loader from '../../components/Loader';
import MasterTable from '../../components/MasterTable';
import { openModal } from '../../actions/modal';
import * as modalNames from '../../constants/modalNames';

const MasterTablePage = ({ isFetching,
  masterTable,
  onAddAssetTypeClick,
  onDeleteAssetTypeClick,
  onAddAssetClick,
  onDeleteAssetClick,
  onAddCertificateClick,
  onDeleteCertificateClick,
  onAddContractClick,
  onDeleteContractClick,
  onAddDegreeClick,
  onAddDepartmentClick,
  onAddFacultyClick,
  onAddLevelClick,
  onAddMajorClick,
  onAddPositionClick,
  onAddUniversityClick }) => (
    <div>
      {isFetching ? <Loader /> : <MasterTable
        masterTable={masterTable}
        onAddAssetTypeClick={onAddAssetTypeClick}
        onDeleteAssetTypeClick={onDeleteAssetTypeClick}
        onAddAssetClick={onAddAssetClick}
        onDeleteAssetClick={onDeleteAssetClick}
        onAddCertificateClick={onAddCertificateClick}
        onDeleteCertificateClick={onDeleteCertificateClick}
        onAddContractClick={onAddContractClick}
        onDeleteContractClick={onDeleteContractClick}
        onAddDegreeClick={onAddDegreeClick}
        onAddDepartmentClick={onAddDepartmentClick}
        onAddFacultyClick={onAddFacultyClick}
        onAddLevelClick={onAddLevelClick}
        onAddMajorClick={onAddMajorClick}
        onAddPositionClick={onAddPositionClick}
        onAddUniversityClick={onAddUniversityClick}
      />}
    </div>
);

MasterTablePage.defaultProps = {
  isFetching: true
};

MasterTablePage.propTypes = {
  isFetching: PropTypes.bool,
  masterTable: PropTypes.object.isRequired,
  onAddAssetTypeClick: PropTypes.func.isRequired,
  onDeleteAssetTypeClick: PropTypes.func.isRequired,
  onAddAssetClick: PropTypes.func.isRequired,
  onDeleteAssetClick: PropTypes.func.isRequired,
  onAddCertificateClick: PropTypes.func.isRequired,
  onDeleteCertificateClick: PropTypes.func.isRequired,
  onAddContractClick: PropTypes.func.isRequired,
  onDeleteContractClick: PropTypes.func.isRequired,
  onAddDegreeClick: PropTypes.func.isRequired,
  onAddDepartmentClick: PropTypes.func.isRequired,
  onAddFacultyClick: PropTypes.func.isRequired,
  onAddLevelClick: PropTypes.func.isRequired,
  onAddMajorClick: PropTypes.func.isRequired,
  onAddPositionClick: PropTypes.func.isRequired,
  onAddUniversityClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isFetching: state.masterTable.isFetching,
  masterTable: state.masterTable
});

const mapDispatchToProps = dispatch => ({
  fetchMasterTable: () => dispatch(fetchMasterTableRequest()),
  onAddAssetTypeClick: () => dispatch(openModal(modalNames.ADD_ASSET_TYPE, { })),
  onDeleteAssetTypeClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this asset type?',
    onConfirm: () => dispatch(deleteAssetTypeRequest(id))
  })),
  onAddAssetClick: () => dispatch(openModal(modalNames.ADD_ASSET, { })),
  onDeleteAssetClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this asset?',
    onConfirm: () => dispatch(deleteAssetRequest(id))
  })),
  onAddCertificateClick: () => dispatch(openModal(modalNames.ADD_CERTIFICATE, { })),
  onDeleteCertificateClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'Delete Confirmation',
    description: 'Are you sure to delete this certificate?',
    onConfirm: () => dispatch(deleteCertificateRequest(id))
  })),
  onAddContractClick: () => dispatch(openModal(modalNames.ADD_CONTRACT, { })),
  onDeleteContractClick: id => dispatch(openModal(modalNames.CONFIRM, {
    header: 'DELETE Confirmation',
    description: 'Are you sure to delete this contract?',
    onConfirm: () => dispatch(deleteContractRequest(id))
  })),
  onAddDegreeClick: () => dispatch(openModal(modalNames.ADD_DEGREE, { })),
  onAddDepartmentClick: () => dispatch(openModal(modalNames.ADD_DEPARTMENT, { })),
  onAddFacultyClick: () => dispatch(openModal(modalNames.ADD_FACULTY, { })),
  onAddLevelClick: () => dispatch(openModal(modalNames.ADD_LEVEL, { })),
  onAddMajorClick: () => dispatch(openModal(modalNames.ADD_MAJOR, { })),
  onAddPositionClick: () => dispatch(openModal(modalNames.ADD_POSITION, { })),
  onAddUniversityClick: () => dispatch(openModal(modalNames.ADD_UNIVERSITY, { }))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchMasterTable } = this.props;
      fetchMasterTable();
    }
  })
);

export default enhance(MasterTablePage);
