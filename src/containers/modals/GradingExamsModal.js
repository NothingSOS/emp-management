import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as SUIModal } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';
import GradingForm from '../forms/GradingForm';
import {
  modalPageChange,
  modalCategoryChange,
  onInputModalComment,
  onScoreModalChange,
  onFullScoreModalChange,
  saveGradingListRequest,
  sendGradingListRequest,
  scoreStatusHandle,
} from '../../actions/recruitment';

const GradingExamsModal = ({
  isModalFetching,
  gradingId,
  onClose,
  onPageChange,
  onClickModalCategory,
  onInputCommentTextArea,
  onScoreChange,
  onFullScoreChange,
  onClickSave,
  onClickSend,
  updateScoreStatus,
  modalWarningExIdList,
}) => (
  <SUIModal
    dimmer="blurring"
    size="fullscreen"
    open
    header={'Grading Exams :'.concat(gradingId)}
    onClose={onClose}
    gradingId={gradingId}
  >
    <SUIModal.Content>
      <GradingForm
        isFetching={isModalFetching}
        gradingId={gradingId}
        onPageChange={onPageChange}
        onClickModalCategory={onClickModalCategory}
        onInputCommentTextArea={onInputCommentTextArea}
        onScoreChange={onScoreChange}
        onFullScoreChange={onFullScoreChange}
        onClickSave={onClickSave}
        onClickSend={onClickSend}
        updateScoreStatus={updateScoreStatus}
        modalWarningExIdList={modalWarningExIdList}
      />
    </SUIModal.Content>
  </SUIModal>
);

GradingExamsModal.propTypes = {
  isModalFetching: PropTypes.bool.isRequired,
  gradingId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onClickModalCategory: PropTypes.func.isRequired,
  onInputCommentTextArea: PropTypes.func.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  onFullScoreChange: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickSend: PropTypes.func.isRequired,
  updateScoreStatus: PropTypes.func.isRequired,
  modalWarningExIdList: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  isModalFetching: state.recruitment.isModalFetching,
  gradingId: state.recruitment.gradingId,
});

const mapDispatchToProps = dispatch => ({
  // edit save button function!
  onPageChange: value => dispatch(modalPageChange(value)),
  onClickModalCategory: (category) => {
    dispatch(modalCategoryChange(category));
    dispatch(modalPageChange(1));
  },
  onInputCommentTextArea: (text, exId) => dispatch(onInputModalComment(text, exId)),
  onScoreChange: (e, exId) => dispatch(onScoreModalChange(e.target.value, exId)),
  onFullScoreChange: (e, exId) => dispatch(onFullScoreModalChange(e.target.value, exId)),
  onClose: () => dispatch(closeModal()),
  onClickSave: (gradingList, modalWarningExIdList) => dispatch(saveGradingListRequest(gradingList, modalWarningExIdList)),
  onClickSend: (gradingList, modalWarningExIdList) => dispatch(sendGradingListRequest(gradingList, modalWarningExIdList)),
  updateScoreStatus: (scoreStatus, exId, gradingList, modalWarningExIdList) => dispatch(scoreStatusHandle(scoreStatus, exId, gradingList, modalWarningExIdList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GradingExamsModal);
