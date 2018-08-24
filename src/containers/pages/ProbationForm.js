import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './css/ProbationForm.css';
import ScoreTableManager from './components/ScoreTableManager';
import EmployeeInfo from './components/EmployeeInfoComponent';
import SignatureComponent from './components/SignatureComponent';
import EvaluationResultComponent from './components/EvaluationResultComponent';
import SupervisorCommentComponent from './components/SupervisorCommentComponent';
import logoBack from './pic/logo2.png';
import logo from './pic/logo.png';

const questions = ['ความรู้ในงานและการพัฒนาตัวเอง (Knowledge and Improvement)',
  'คุณภาพงาน (Quality of Work)',
  'ปริมาณงาน (Quantity of Work)',
  'การทำงานร่วมกับผู้อื่น (Co-operation with Colleagues)',
  'การปฏิบัติตาม Playtorium Culture',
  'ความสามารถทางด้านภาษาอังกฤษ (TOEIC)',
  'ประกาศนียบัตรตามสายงาน (Certificate)'];

const weightType = {
  engLv2: [20, 15, 15, 20, 10, 20],
  engLv3orMore: [15, 10, 10, 15, 10, 20, 20],
  noEng: [20, 20, 20, 20, 20]
};

class ProbationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: `${this.props.profile.general.firstName} ${this.props.profile.general.lastName}`,
      department: this.props.profile.work.departmentName || '-',
      position: this.props.profile.work.positionName || '-',
      employeeID: this.props.profile.work.userId || '-',
      level: this.props.profile.work.levelId || '-',
      startDate: this.props.profile.work.startDate || '-',
      supervisor: this.props.profile.work.bossName || '-',
      expectedScore: null,
      score: null,
      endProbationDate: this.props.profile.evaInfo == null && this.props.profile.eva.length !== 0 ? this.props.profile.eva[0].continuedDate : this.props.profile.work.probationDate,
      passPro: true,
      notPassPro: false,
      confirmed: true,
      continued: false,
      basedSalary: null,
      mobile: null,
      transporationAllowance: null,
      otherAllowance: null,
      supervisorComment: '',
      terminationDate: null,
      continuedDate: null,
      employeeSignDate: null,
      supervisorSignDate: null,
      MDSignDate: null,
      employeeSignName: null,
      supervisorSignName: null,
      MDSignName: null,
    };

    this.employeeStateHandler = this.employeeStateHandler.bind(this);
    this.scoreTableStateHandler = this.scoreTableStateHandler.bind(this);
    this.supervisorCommentHandler = this.supervisorCommentHandler.bind(this);
    this.evaluationResultHandler = this.evaluationResultHandler.bind(this);
    this.signatureHandler = this.signatureHandler.bind(this);
  }

  componentWillMount() {
    if (this.props.profile.evaInfo != null) {
      this.setState({
        expectedScore: this.props.profile.evaInfo.expectedScore,
        score: this.props.profile.evaInfo.score,
        passPro: this.props.profile.evaInfo.passPro,
        notPassPro: !this.props.profile.evaInfo.passPro,
        confirmed: this.props.profile.evaInfo.confirmedByEmployment,
        continued: this.props.profile.evaInfo.continued,
        basedSalary: this.props.profile.evaInfo.basedSalary,
        mobile: this.props.profile.evaInfo.mobile,
        transporationAllowance: this.props.profile.evaInfo.transporationAllowance,
        otherAllowance: this.props.profile.evaInfo.otherAllowance,
        supervisorComment: this.props.profile.evaInfo.supComment,
        terminationDate: this.props.profile.evaInfo.terminatedDate,
        continuedDate: this.props.profile.evaInfo.continuedDate,
        employeeSignDate: this.props.profile.evaInfo.emSignDate,
        supervisorSignDate: this.props.profile.evaInfo.supSignDate,
        MDSignDate: this.props.profile.evaInfo.mdSignDate,
        endProbationDate: this.props.profile.evaInfo.passProDate,
        level: this.props.profile.evaInfo.levelId,
        proId: this.props.profile.evaInfo.id,
        employeeSignName: this.props.profile.evaInfo.emSignName,
        supervisorSignName: this.props.profile.evaInfo.supSignName,
        MDSignName: this.props.profile.evaInfo.mdSignName,
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.score !== this.state.score ||
            nextState.passPro !== this.state.passPro ||
            nextState.confirmed !== this.state.confirmed ||
            nextState.continued !== this.state.continued ||
            nextState.basedSalary !== this.state.basedSalary ||
            nextState.mobile !== this.state.mobile ||
            nextState.transporationAllowance !== this.state.transporationAllowance ||
            nextState.otherAllowance !== this.state.otherAllowance ||
            nextState.endProbationDate !== this.state.endProbationDate ||
            nextState.expectedScore !== this.state.expectedScore ||
            nextState.terminationDate !== this.state.terminationDate ||
            nextState.continuedDate !== this.state.continuedDate ||
            nextState.employeeSignDate !== this.state.employeeSignDate ||
            nextState.supervisorSignDate !== this.state.supervisorSignDate ||
            nextState.MDSignDate !== this.state.MDSignDate ||
            nextState.employeeSignName !== this.state.employeeSignName ||
            nextState.supervisorSignName !== this.state.supervisorSignName ||
            nextState.MDSignName !== this.state.MDSignName ||
            nextState.supervisorComment !== this.state.supervisorComment
    );
  }

  componentDidUpdate() {
    this.props.test(this.state);
  }

  employeeStateHandler(newEndProbationDate) {
    this.setState({ endProbationDate: newEndProbationDate });
  }

  scoreTableStateHandler(newScore, newExpectedScore, percentTotal) {
    this.setState({
      score: newScore,
      expectedScore: newExpectedScore
    });

    if (this.props.profile.evaInfo != null) { return; }

    if (percentTotal >= 60) {
      this.setState({
        passPro: true,
        notPassPro: false,
      });
    }
    else {
      this.setState({
        passPro: false,
        notPassPro: false
      });
    }

    this.setState({
      terminationDate: null,
      continuedDate: null,
      basedSalary: null,
      mobile: null,
      transporationAllowance: null,
      otherAllowance: null
    });
  }

  supervisorCommentHandler(newComment) {
    this.setState({ supervisorComment: newComment });
  }

  evaluationResultHandler(
    newPassPro, newNotPassPro, newConfirmed, newContinued, newEndProbationDate,
    newTerminationDate, newContinuedDate, newBasedSalary, newMoblie,
    newTransporationAllowance, newOtherAllowance
  ) {
    this.setState({
      passPro: newPassPro,
      notPassPro: newNotPassPro,
      confirmed: newConfirmed,
      continued: newContinued,
      endProbationDate: newEndProbationDate,
      terminationDate: newTerminationDate,
      continuedDate: newContinuedDate,
      basedSalary: newBasedSalary,
      mobile: newMoblie,
      transporationAllowance: newTransporationAllowance,
      otherAllowance: newOtherAllowance
    });

    this.forceUpdate();
  }

  signatureHandler(
    newEmployeeSignName, newEmployeeSignDate,
    newSupervisorSignName, newSupervisorSignDate,
    newMDSignName, newMDSignDate
  ) {
    this.setState({
      employeeSignName: newEmployeeSignName,
      supervisorSignName: newSupervisorSignName,
      MDSignName: newMDSignName,
      employeeSignDate: newEmployeeSignDate,
      supervisorSignDate: newSupervisorSignDate,
      MDSignDate: newMDSignDate
    });
  }

  render() {
    return (
      <div className="main-container">
        <img className="logo_back" src={logoBack} alt="logoBack" />
        <div className="profile">
          <img className="logo" src={logo} alt="logo" />
          <h1>Employee Probation Form</h1>
        </div>
        <EmployeeInfo {...this.state} showEndProDate="true" onChange={this.employeeStateHandler} mode={this.props.mode} />
        <div>
          <ScoreTableManager
            {...this.state}
            questions={questions}
            numOfQuestion={this.props.profile.work.engineer ? this.state.level >= 3 ? 7 : 6 : 5}
            weight={this.props.profile.work.engineer ? this.state.level >= 3 ? weightType.engLv3orMore : weightType.engLv2 : weightType.noEng}
            score={this.state.score}
            onChange={this.scoreTableStateHandler}
            mode={this.props.mode}
          />
        </div>
        <EvaluationResultComponent {...this.state} onChange={this.evaluationResultHandler} mode={this.props.mode} />
        <SupervisorCommentComponent {...this.state} onChange={this.supervisorCommentHandler} mode={this.props.mode} />
        <SignatureComponent {...this.state} role={this.props.role} onChange={this.signatureHandler} authName={this.props.name} />
      </div>
    );
  }
}

ProbationForm.propTypes = {
  profile: PropTypes.object.isRequired,
  test: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  role: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};

export default ProbationForm;
