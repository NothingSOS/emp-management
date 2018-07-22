import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Redirect } from 'react-router-dom';
import TakeExamAgreement from '../../components/TakeExamAgreement';
import {
  clickCheckbox,
  clickAgree,
} from '../../actions/takeExamAgreement';

const TakeExamAgreementPage = ({ isAgree, onClickCheckbox, id, agreementStatus, onClickAgree, testdate }) => (
  (agreementStatus === 'NotRead')
    ? <TakeExamAgreement
      isAgree={isAgree}
      onClickCheckbox={onClickCheckbox}
      onClickAgree={onClickAgree}
      id={id}
      testdate={testdate}
    />
    : <Redirect
      to={{
        pathname: '/takeexam'
      }}
    />
);

TakeExamAgreementPage.propTypes = {
  isAgree: PropTypes.bool.isRequired,
  onClickCheckbox: PropTypes.func.isRequired,
  onClickAgree: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  agreementStatus: PropTypes.string.isRequired,
  testdate: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAgree: state.takeExamAgreement.isAgree,
  id: state.examAuth.id,
  agreementStatus: state.examAuth.agreementStatus,
  testdate: state.examAuth.testdate,
});

const mapDispatchToProps = dispatch => ({
  onClickCheckbox: value => dispatch(clickCheckbox(value)),
  onClickAgree: (id, testdate) => dispatch(clickAgree(id, testdate)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // edit this, maybe?
      // const { startExam } = this.props;
      // startExam();
    }
  })
);

export default enhance(TakeExamAgreementPage);
