import React from 'react';
import PropTypes from 'prop-types';
import './css/ScoreTableManager.css';

const DropDown = (props) => {
  const elements = [];
  for (let i = 1; i <= (props.numOfElements ? props.numOfElements : 5); i += 1) { elements.push(<option value={i}>{i}</option>); }

  return <select id={props.id} value={props.value || 3} onChange={props.onChange} disabled={props.mode !== 'edit'}>{elements}</select>;
};

class ScoreTableManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      questions: props.questions,
      expectedScore: props.expectedScore || [3, 3, 3, 3, 3, 3, 3],
      score: props.score || [3, 3, 3, 3, 3, 3, 3],
      weight: props.weight || [15, 10, 10, 15, 10, 20, 20],
      numOfQuestion: props.numOfQuestion || 7,
      numOfElements: props.numOfElements || 5,
      totalPoint: [0, 0, 0, 0, 0, 0, 0],
      sumTotalPoint: 0,
      sumTotalPointForShow: 30
    };

    this.createTable = this.createTable.bind(this);
    this.updateExpectedScore = this.updateExpectedScore.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.arraySum = this.arraySum.bind(this);
    this.updateTotalPoint = this.updateTotalPoint.bind(this);
    this.totalPointAnimationManager = this.totalPointAnimationManager.bind(this);
    this.calculateSumTotalPoint = this.calculateSumTotalPoint.bind(this);
  }

  componentDidMount() {
    this.updateTotalPoint();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.score !== nextState.score ||
            this.state.expectedScore !== nextState.expectedScore ||
            this.state.totalPoint !== nextState.totalPoint ||
            this.state.sumTotalPoint !== nextState.sumTotalPoint ||
            this.state.sumTotalPointForShow !== nextState.sumTotalPointForShow);
  }

  componentDidUpdate() {
    this.props.onChange(this.state.score, this.state.expectedScore, this.state.sumTotalPoint);
  }

  totalPointAnimationManager() {
    let temp = this.state.sumTotalPointForShow;
    if (this.state.sumTotalPointForShow < this.state.sumTotalPoint) { temp += 1; }
    else if (this.state.sumTotalPointForShow > this.state.sumTotalPoint) { temp -= 1; }
    else { clearInterval(this.sumTotalPointAnimatorInterval); }

    this.setState({ sumTotalPointForShow: temp });
  }

  calculateSumTotalPoint() {
    this.state.sumTotalPoint = this.arraySum(this.state.totalPoint);
    this.sumTotalPointAnimatorInterval = setInterval(this.totalPointAnimationManager, 50);
  }

  updateExpectedScore() {
    const values = [];
    for (let i = 0; i < this.state.numOfQuestion; i += 1) {
      const temp = document.getElementById(`expectScore${i}`);
      values.push(parseInt(temp.value, 10));
    }
    this.setState({ expectedScore: values });
  }

  updateScore() {
    const values = [];
    for (let i = 0; i < this.state.numOfQuestion; i += 1) {
      const temp = document.getElementById(`score${i}`);
      values.push(parseInt(temp.value, 10));
    }
    this.setState({ score: values }, this.updateTotalPoint);
  }

  updateTotalPoint() {
    const total = [];
    for (let i = 0; i < this.state.numOfQuestion; i += 1) {
      total.push((this.state.score[i] / this.state.numOfElements * this.state.weight[i]));
    }
    this.setState({ totalPoint: total }, this.calculateSumTotalPoint);
  }

  arraySum(array) {
    let sum = 0;
    for (let i = 0; i < this.state.numOfQuestion; i += 1) {
      sum += parseInt(array[i], 10);
    }
    return sum;
  }

  createTable() {
    const table = [];
    for (let i = 0; i < this.state.numOfQuestion; i += 1) {
      table.push(
        <tr>
          <td>{i + 1}</td>
          <td colSpan="7">{this.state.questions[i]}</td>
          <td>
            {this.props.mode === 'edit' ?
              <DropDown id={`expectScore${i}`} value={this.state.expectedScore[i]} onChange={this.updateExpectedScore} numOfElements={this.state.numOfElements} mode={this.props.mode} />
                        : this.state.expectedScore[i]}
          </td>
          <td>
            {this.props.mode === 'edit' ?
              <DropDown id={`score${i}`} value={this.state.score[i]} onChange={this.updateScore} numOfElements={this.state.numOfElements} mode={this.props.mode} />
                        : this.state.score[i]}
          </td>
          <td>{this.state.weight[i]}%</td>
          <td>{(this.state.totalPoint ? this.state.totalPoint[i] : 'N/A')}{(this.state.totalPoint ? '%' : '')}</td>
        </tr>);
    }
    return (
      <div className="eva-container">
        <table>
          <tr>
            <th colSpan="12" className="underline">
              <span className="blue-text">Performance Appraisal Portion</span>
            </th>
          </tr>
          <tr>
            <th>No.</th>
            <th colSpan="7">Appraisal Criteria</th>
            <th>Score</th>
            <th>Total Average</th>
            <th>Weight</th>
            <th>Total Point</th>
          </tr>
          {table}
          <tr>
            <th colSpan="8">Total Performance Score</th>
            <th />
            <th>{this.arraySum(this.state.score)}</th>
            <th>{this.arraySum(this.state.weight)}%</th>
            <th className="blue-text">{this.state.sumTotalPointForShow}%</th>
          </tr>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    );
  }
}

ScoreTableManager.defaultProps = {
  numOfElements: 5,
  expectedScore: [3, 3, 3, 3, 3, 3, 3],
  score: [3, 3, 3, 3, 3, 3, 3]
};

ScoreTableManager.propTypes = {
  numOfElements: PropTypes.number,
  questions: PropTypes.array.isRequired,
  mode: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  expectedScore: PropTypes.array,
  score: PropTypes.array,
  weight: PropTypes.array.isRequired,
  numOfQuestion: PropTypes.number.isRequired
};

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  numOfElements: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired
};

export default ScoreTableManager;
