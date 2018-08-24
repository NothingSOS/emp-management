import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Icon } from 'semantic-ui-react';
import './css/EmployeeInfoComponent.css';

const validationMessage = {
  endProbationDateValidation: 'Probation End Date must not before Probation Start Date.'
};

class EmployeeInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      startDate: moment(this.props.startDate),
      endProbationDate: this.props.endProbationDate || moment(this.props.startDate).add(120, 'day').format('YYYY-MM-DD'),
      showEndProDate: props.showEndProDate && true
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ endProbationDate: props.endProbationDate });
  }

  render() {
    return (
      <div className="info-container" >
        {this.props.addSelf && this.props.mode === 'edit' ?
          <table>
            <tr>
              <td colSpan="4" className="underline">
                <span className="blue-text">Information</span>
              </td>
            </tr>
            <tr>
              <td>Supervisor:</td>
              <td>{this.state.supervisor}</td>
              <td>{this.state.showEndProDate ? 'Probatoin ' : ''} Start Date</td>
              <td>{this.state.startDate.format('DD/MM/YYYY')}</td>
            </tr>
          </table>
                    :
          <table>
            <tr>
              <td colSpan="4" className="underline">
                <span className="blue-text">Information</span>
              </td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{this.state.name}</td>
              <td>Department:</td>
              <td>{this.state.department}</td>
            </tr>
            <tr>
              <td>Position:</td>
              <td>{this.state.position}</td>
              <td>EmployeeID:</td>
              <td>{this.state.employeeID}</td>
            </tr>
            <tr>
              <td>Level:</td>
              <td>{this.state.level}</td>
              <td>{this.state.showEndProDate ? 'Probatoin ' : ''} Start Date</td>
              <td>{this.state.startDate.format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td>Supervisor:</td>
              <td>{this.state.supervisor}</td>
              <td>{this.state.showEndProDate ? 'Probation End Date:' : ''}</td>
              <td>{this.state.showEndProDate ?
                <DatePicker
                  selected={moment(this.state.endProbationDate)}
                  onChangeRaw={(event) => {
                                        event.target.value = moment(this.state.endProbationDate).format('DD/MM/YYYY');
                                    }}
                  onChange={(date) => {
                                        if (date == null) {
                                            this.props.onChange(null);
                                        }
 else this.props.onChange(date.format('YYYY-MM-DD'));
                                    }}
                  id="probationEndDatepicker"
                  disabled={this.props.mode !== 'edit'}
                  dateFormat="DD/MM/YYYY"
                  className="sds"
                  minDate={moment(this.state.startDate).add(1, 'days')}
                /> : ''}
                {this.state.showEndProDate && this.props.mode === 'edit' ? <Icon name="calendar outline icon" size="large" onClick={() => { document.getElementById('probationEndDatepicker').click(); }} /> : ''}
              </td>
            </tr>
          </table>
                }
      </div>
    );
  }
}

EmployeeInfo.defaultProps = {
  showEndProDate: null,
  addSelf: false,
  onChange: null,
  endProbationDate: null
};

EmployeeInfo.propTypes = {
  startDate: PropTypes.string.isRequired,
  endProbationDate: PropTypes.string,
  showEndProDate: PropTypes.string,
  addSelf: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default EmployeeInfo;
