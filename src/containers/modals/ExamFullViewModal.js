import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal as SUIModal, Table, TextArea, Radio, Checkbox } from 'semantic-ui-react';
import { closeModal } from '../../actions/modal';

const ExamFullViewModal = ({ onClose, thisExam }) => (
  <SUIModal
    dimmer="blurring"
    size="fullscreen"
    closeIcon
    open
    onClose={onClose}
  >
    <SUIModal.Content>
      <Table style={{ height: '300px' }}>
        <Table.Row verticalAlign="top">
          <Table.Cell width={9}>
            <div dangerouslySetInnerHTML={{ __html: thisExam.exQuestion }} />
          </Table.Cell>
          <Table.Cell width={7}>
            {thisExam.exType === 'Write-Up' &&
              <TextArea value="Answer . . ." disabled style={{ width: '100%', height: '100%' }} />
            }
            {thisExam.exType === 'Choices' && thisExam.exAnswer.length === 1 &&
              thisExam.exChoice.map(choice => (
                <p>
                  <Radio label={choice} value={choice} checked={thisExam.exAnswer.includes(choice)} readOnly />
                </p>
              ))
            }
            {thisExam.exType === 'Choices' && thisExam.exAnswer.length > 1 &&
              thisExam.exChoice.map(choice => (
                <p>
                  <Checkbox label={choice} value={choice} checked={thisExam.exAnswer.includes(choice)} readOnly />
                </p>
              ))
            }
          </Table.Cell>
        </Table.Row>
      </Table>
    </SUIModal.Content>
  </SUIModal>
);

ExamFullViewModal.propTypes = {
  thisExam: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(closeModal())
});

export default connect(null, mapDispatchToProps)(ExamFullViewModal);
