import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as modalNames from '../constants/modalNames';
import EditGeneralProfileModal from './modals/EditGeneralProfileModal';
import EditWorkProfileModal from './modals/EditWorkProfileModal';
import EditEducationProfileModal from './modals/EditEducationProfileModal';
import AddEmployeeModal from './modals/AddEmployeeModal';
import AddEducationProfileModal from './modals/AddEducationProfileModal';
import AddCertificateProfileModal from './modals/AddCertificateProfileModal';
import AddAssetProfileModal from './modals/AddAssetProfileModal';
import AddProjectModal from './modals/AddProjectModal';
import CreateLeaveRequestModal from './modals/CreateLeaveRequestModal';
import ConfirmModal from './modals/ConfirmModal';
import ProfilePictureModal from './modals/ProfilePictureModal';
import EditRecruitmentModal from './modals/EditRecruitmentModal';
import AddExamModal from './modals/AddExamModal';
import EditExamModal from './modals/EditExamModal';
import ExamFullViewModal from './modals/ExamFullViewModal';
import ActiveExamUserModal from './modals/ActiveExamUserModal';
import GradingExamsModal from './modals/GradingExamsModal';
import EditProfilePictureModal from './modals/EditProfilePictureModal';
import EditProjectModal from './modals/EditProjectModal';
import AddMemberModal from './modals/AddMemberModal';
import AddTimesheetModal from './modals/AddTimesheetModal';
import EditTimesheetModal from './modals/EditTimesheetModal';
import AddWorkExperienceProfileModal from './modals/AddWorkExperienceProfileModal';
import AddProbation from './modals/AddProbation';
import AddPerformance from './modals/AddPerformance';
import AddSelfAssessment from './modals/AddSelfAssessment';
import ApproveRejectModal from './modals/ApproveRejectModal';
// import CreateErpRequestModal from './modals/CreateErpRequestModal';
import AddHolidayModal from './modals/AddHolidayModal';
import ViewResultModal from './modals/ViewResultModal';
import AddToeicProfileModal from './modals/AddToeicProfileModal';
import AddAssetTypeModal from './modals/AddAssetTypeModal';
import AddAssetModal from './modals/AddAssetModal';
import AddCertificateModal from './modals/AddCertificateModal';
import AddContractModal from './modals/AddContractModal';
import AddDegreeModal from './modals/AddDegreeModal';
import AddDepartmentModal from './modals/AddDepartmentModal';
import AddFacultyModal from './modals/AddFacultyModal';
import AddLevelModal from './modals/AddLevelModal';
import AddMajorModal from './modals/AddMajorModal';
import AddPositionModal from './modals/AddPositionModal';
import AddUniversityModal from './modals/AddUniversityModal';

const renderModal = ({ name, props }) => {
  switch (name) {
    case modalNames.EDIT_GENERAL_PROFILE:
      return <EditGeneralProfileModal {...props} />;
    case modalNames.EDIT_WORK_PROFILE:
      return <EditWorkProfileModal {...props} />;
    case modalNames.EDIT_EDUCATION_PROFILE:
      return <EditEducationProfileModal {...props} />;
    case modalNames.EDIT_RECRUITMENT:
      return <EditRecruitmentModal {...props} />;
    case modalNames.ADD_EDUCATION_PROFILE:
      return <AddEducationProfileModal {...props} />;
    case modalNames.ADD_CERTIFICATE_PROFILE:
      return <AddCertificateProfileModal />;
    case modalNames.ADD_ASSET_PROFILE:
      return <AddAssetProfileModal />;
    case modalNames.ADD_EMPLOYEE:
      return <AddEmployeeModal {...props} />;
    case modalNames.ADD_PROJECT:
      return <AddProjectModal {...props} />;
    case modalNames.EDIT_PROJECT:
      return <EditProjectModal />;
    case modalNames.ADD_MEMBER:
      return <AddMemberModal />;
    case modalNames.CREATE_LEAVE_REQUEST:
      return <CreateLeaveRequestModal {...props} />;
    case modalNames.CONFIRM:
      return <ConfirmModal {...props} />;
    case modalNames.PROFILE_PICTURE:
      return <ProfilePictureModal {...props} />;
    case modalNames.ACTIVE_EXAM_USER:
      return <ActiveExamUserModal {...props} />;
    case modalNames.ADD_NEW_EXAM:
      return <AddExamModal {...props} />;
    case modalNames.EDIT_EXAM:
      return <EditExamModal {...props} />;
    case modalNames.VIEW_EXAM:
      return <ExamFullViewModal {...props} />;
    case modalNames.GRADING_EXAM:
      return <GradingExamsModal {...props} />;
    case modalNames.VIEW_PROFILE_PICTURE:
      return <ProfilePictureModal {...props} />;
    case modalNames.EDIT_ASSET_PROFILE:
      return <EditEducationProfileModal {...props} />;
    case modalNames.EDIT_PROFILE_PICTURE:
      return <EditProfilePictureModal {...props} />;
    case modalNames.ADD_TIMESHEET:
      return <AddTimesheetModal {...props} />;
    case modalNames.EDIT_TIMESHEET:
      return <EditTimesheetModal {...props} />;
    case modalNames.ADD_WORK_EXPERIENCE_PROFILE:
      return <AddWorkExperienceProfileModal />;
    case modalNames.ADD_PROBATION:
      return <AddProbation {...props} />;
    case modalNames.ADD_PERFORMANCE:
      return <AddPerformance {...props} />;
    case modalNames.ADD_SELFASSESSMENT:
      return <AddSelfAssessment {...props} />;
    case modalNames.ERPAPPROVE_REJECT:
      return <ApproveRejectModal {...props} />;
    // case modalNames.CREATE_ERP_REQUEST:
    //   return <CreateErpRequestModal {...props} />;
    case modalNames.ADD_HOLIDAY:
      return <AddHolidayModal />;
    case modalNames.VIEW_RESULT:
      return <ViewResultModal {...props} />;
    case modalNames.ADD_TOEIC_PROFILE:
      return <AddToeicProfileModal {...props} />;
    case modalNames.ADD_ASSET_TYPE:
      return <AddAssetTypeModal />;
    case modalNames.ADD_ASSET:
      return <AddAssetModal />;
    case modalNames.ADD_CERTIFICATE:
      return <AddCertificateModal />;
    case modalNames.ADD_CONTRACT:
      return <AddContractModal />;
    case modalNames.ADD_DEGREE:
      return <AddDegreeModal />;
    case modalNames.ADD_DEPARTMENT:
      return <AddDepartmentModal />;
    case modalNames.ADD_FACULTY:
      return <AddFacultyModal />;
    case modalNames.ADD_LEVEL:
      return <AddLevelModal />;
    case modalNames.ADD_MAJOR:
      return <AddMajorModal />;
    case modalNames.ADD_POSITION:
      return <AddPositionModal />;
    case modalNames.ADD_UNIVERSITY:
      return <AddUniversityModal />;
    default:
      return <div />;
  }
};

const ModalContainer = ({ stack }) => (
  <div>
    {stack.map(s => renderModal(s))}
  </div>
);

ModalContainer.propTypes = {
  stack: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  stack: state.modal.stack
});

export default connect(mapStateToProps)(ModalContainer);
