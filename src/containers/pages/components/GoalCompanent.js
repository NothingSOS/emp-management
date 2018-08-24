import React from 'react';
import PropTypes from 'prop-types';
import './css/GoalComponent.css';

const requiredMessage = <a href style={{ color: 'red' }}>(Please enter your answer.)</a>;

class GoalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: props.goal || ['', '', '', '', '']
    };
    this.updateParentState = this.updateParentState.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      goal: props.goal
    });
  }

  updateParentState() {
    this.props.onChange(this.state.goal);
  }

  render() {
    return (
      <div>
        <table className="goal-table">
          <tr>
            <th colSpan="2">
              <span className="blue-text">{this.props.header}</span>
            </th>
          </tr>
          <tr> <th style={{ paddingTop: '30px' }} /></tr>
          <tr>
            <td>Description: What is the goal? {this.props.require && !this.state.goal[0] ? requiredMessage : ''}</td>
            <td>
              <textarea
                tabIndex="-1"
                disabled={this.props.mode === 'view'}
                onChange={(event) => {
                            const newGoal = this.state.goal.slice();
                            newGoal[0] = event.target.value;
                            this.props.onChange(newGoal);
                        }}
              >{this.state.goal[0]}
              </textarea>
            </td>
          </tr>
          <tr>
            <td>First Step Plan: What is the first step towards achieving this goal? {this.props.require && !this.state.goal[1] ? requiredMessage : ''}</td>
            <td>
              <textarea
                tabIndex="-1"
                disabled={this.props.mode === 'view'}
                onChange={(event) => {
                          const newGoal = this.state.goal.slice();
                          newGoal[1] = event.target.value;
                          this.props.onChange(newGoal);
                        }}
              >{this.state.goal[1]}
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Evaluation: How will we know if the goal is achieved? What will happen or change? {this.props.require && !this.state.goal[2] ? requiredMessage : ''}</td>
            <td>
              <textarea
                tabIndex="-1"
                disabled={this.props.mode === 'view'}
                onChange={(event) => {
                          const newGoal = this.state.goal.slice();
                          newGoal[2] = event.target.value;
                          this.props.onChange(newGoal);
                        }}
              >{this.state.goal[2]}
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Support: What training or experience, or other support, could help? {this.props.require && !this.state.goal[3] ? requiredMessage : ''}</td>
            <td>
              <textarea
                tabIndex="-1"
                disabled={this.props.mode === 'view'}
                onChange={(event) => {
                          const newGoal = this.state.goal.slice();
                          newGoal[3] = event.target.value;
                          this.props.onChange(newGoal);
                        }}
              >{this.state.goal[3]}
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Timing: When will the goal be achieved? {this.props.require && !this.state.goal[4] ? requiredMessage : ''}</td>
            <td>
              <textarea
                tabIndex="-1"
                disabled={this.props.mode === 'view'}
                onChange={(event) => {
                          const newGoal = this.state.goal.slice();
                          newGoal[4] = event.target.value;
                          this.props.onChange(newGoal);
                        }}
              >{this.state.goal[4]}
              </textarea>
            </td>
          </tr>
        </table>
      </div >
    );
  }
}

GoalComponent.defaultProps = {
  require: false
};

GoalComponent.propTypes = {
  goal: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  require: PropTypes.bool
};

export default GoalComponent;
