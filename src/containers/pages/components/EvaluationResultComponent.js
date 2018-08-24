import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Icon } from 'semantic-ui-react';
import './css/EvaluationResultComponent.css';

const validationMessage = {
  passProDateVilidation: 'Pass Probation Date must after Start Date.',
  terminationDateValidation: 'Termination Effective must after End Probation Date.',
  continuedDateValidation: 'Continued probation until must after End Probation Date.',
  salaryValidation: 'Please enter at least one.'
};

class EvaluationResultComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      passPro: this.props.passPro !== null ? this.props.passPro : true,
      notPassPro: this.props.notPassPro !== null ? this.props.notPassPro : false,
      confirmed: this.props.confirmed !== null ? this.props.confirmed : true,
      continued: this.props.continued !== null ? this.props.continued : true,
      passProDate: this.props.endProbationDate,
      terminationDate: this.props.terminationDate || null,
      continuedDate: this.props.continuedDate || null
    };

    this.showProElement1 = this.showProElement1.bind(this);
    this.showProElement2 = this.showProElement2.bind(this);
    this.showProElement3 = this.showProElement3.bind(this);
    this.closeProElement1 = this.closeProElement1.bind(this);
    this.closeProElement2 = this.closeProElement2.bind(this);
    this.closeProElement3 = this.closeProElement3.bind(this);
    this.updateProElements = this.updateProElements.bind(this);
    this.updateParentComponent = this.updateParentComponent.bind(this);
  }

  componentDidMount() {
    this.updateProElements();

    if (this.props.mode !== 'edit') {
      const elements = document.getElementsByTagName('input');

      for (let i = 0; i < elements.length; i += 1) {
        elements[i].disabled = (this.props.mode !== 'edit');
      }
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      passPro: props.passPro,
      notPassPro: props.notPassPro,
      confirmed: props.confirmed,
      continued: props.continued,
      passProDate: props.endProbationDate,
      terminationDate: props.terminationDate,
      continuedDate: props.continuedDate,
      basedSalary: props.basedSalary,
      mobile: props.mobile,
      transporationAllowance: props.transporationAllowance,
      otherAllowance: props.otherAllowance
    });
  }

  componentDidUpdate() {
    this.updateProElements();
  }

  updateParentComponent() {
    if (this.state.basedSalary === '') { this.state.basedSalary = null; }

    if (this.state.mobile === '') { this.state.mobile = null; }

    if (this.state.transporationAllowance === '') { this.state.transporationAllowance = null; }

    if (this.state.otherAllowance === '') { this.state.otherAllowance = null; }

    this.props.onChange(
      this.state.passPro,
      this.state.notPassPro,
      this.state.confirmed,
      this.state.continued,
      this.state.passProDate,
      this.state.terminationDate,
      this.state.continuedDate,
      this.state.basedSalary,
      this.state.mobile,
      this.state.transporationAllowance,
      this.state.otherAllowance
    );
  }

  updateProElements() {
    if (this.state.passPro) {
      this.showProElement1();
      this.closeProElement3();

      if (this.state.confirmed) { this.closeProElement2(); }
      else { this.showProElement2(); }
    }
    else if (this.state.notPassPro) {
      this.showProElement3();
      this.closeProElement1();
      this.closeProElement2();
    }
    else {
      this.closeProElement1();
      this.closeProElement2();
      this.closeProElement3();
    }
  }

  showProElement1() {
    const elements = document.getElementById('pro-element1').getElementsByClassName('slide-show');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].style.height = '1.5em';
    }
  }

  showProElement2() {
    const elements = document.getElementById('pro-element2').getElementsByClassName('slide-show');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].style.height = '4.5em';
    }
  }

  showProElement3() {
    const elements = document.getElementById('pro-element3').getElementsByClassName('slide-show');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].style.height = '5em';
    }
  }

  closeProElement1() {
    const elements = document.getElementById('pro-element1').getElementsByClassName('slide-show');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].style.height = '0';
    }
  }

  closeProElement2() {
    const elements = document.getElementById('pro-element2').getElementsByClassName('slide-show');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].style.height = '0';
    }
  }

  closeProElement3() {
    const elements = document.getElementById('pro-element3').getElementsByClassName('slide-show');
    for (let i = 0; i < elements.length; i += 1) {
      elements[i].style.height = '0';
    }
  }

  render() {
    return (
      <div className="eva-result-container">
        <table className="outer-table">
          <tr>
            <th className="underline">
              <span className="blue-text">The Evaluation Result</span>
            </th>
          </tr>
          <tr>
            <td>
              <table>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="pass-pro"
                      onClick={() => {
                                        this.state = {
                                            ...this.state,
                                            passPro: true,
                                            notPassPro: false,
                                            terminationDate: null,
                                            continuedDate: null
                                        };
                                        this.updateParentComponent();
                                    }}
                      checked={this.state.passPro}
                    />
                                    &nbsp;Pass probationary period.Effective date on
                  </td>
                  <td>
                    {/* <input type='date' value={this.state.passProDate} onChange={(event) => {
                                        if (event.target.value == '' || moment(event.target.value).isBefore(this.state.startDate))
                                            alert(validationMessage.passProDateVilidation);
                                        else {
                                            this.state = {
                                                ...this.state,
                                                passProDate: event.target.value
                                            }

                                            if (this.state.terminationDate && !moment(event.target.value).isBefore(this.state.terminationDate))
                                                this.state = { ...this.state, terminationDate: moment(event.target.value).add(1, 'day').format('YYYY-MM-DD') };

                                            if (this.state.continuedDate && !moment(event.target.value).isBefore(this.state.continuedDate))
                                                this.state = { ...this.state, continuedDate: moment(event.target.value).add(1, 'day').format('YYYY-MM-DD') };

                                            this.updateParentComponent();
                                        }
                                    }} /> */}
                    <DatePicker
                      selected={moment(this.state.passProDate)}
                      onChangeRaw={(event) => {
                                            event.target.value = moment(this.state.passProDate).format('DD/MM/YYYY');
                                        }}
                      onChange={(date) => {
                                            this.state = {
                                                ...this.state,
                                                passProDate: date.format('YYYY-MM-DD')
                                            };
                                            this.updateParentComponent();
                                        }}
                      id="passProDatepicker"
                      disabled={this.props.mode !== 'edit'}
                      dateFormat="DD/MM/YYYY"
                      minDate={moment(this.state.startDate).add(1, 'days')}
                    />
                    {this.props.mode === 'edit' ? <Icon name="calendar outline icon" size="large" onClick={() => { document.getElementById('passProDatepicker').click(); }} /> : ''}
                  </td>
                </tr>
                <tr>
                  <td id="pro-element1" colSpan="2">
                    <div className="slide-show">
                      <table className="inner-table-second">
                        <tr>
                          <td>
                            <input
                              type="radio"
                              name="confirm-con"
                              onClick={() => {
                                                        this.state = {
                                                            ...this.state,
confirmed: true,
                                                            basedSalary: null,
                                                            mobile: null,
                                                            transporationAllowance: null,
                                                            otherAllowance: null
                                                        };
                                                        this.updateParentComponent();
                                                    }}
                              checked={this.state.confirmed}
                            />
                                                    &nbsp;Confirmed By Employment Conditions
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="confirm-con"
                              onClick={() => {
                                                        this.state = { ...this.state, confirmed: false };
                                                        this.updateParentComponent();
                                                    }}
                              checked={!this.state.confirmed}
                            />
                                                    &nbsp;Adjust the Salary and Benefits {this.state.confirmed || this.state.basedSalary ||
                                                        this.state.mobile || this.state.transporationAllowance ||
                                                        this.state.otherAllowance ? '' : <a href>{validationMessage.salaryValidation}</a>}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td id="pro-element2" colSpan="2">
                    <div className="slide-show">
                      <table className="inner-table-second">
                        <tr>
                          <td>
                                                    Based Salary
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={this.state.basedSalary ? this.state.basedSalary : ''}
                              onChange={(event) => {
                                                        if (event.target.value < 0) { event.target.value = 0; }
                                                        this.state = { ...this.state, basedSalary: event.target.value };
                                                        this.updateParentComponent();
                                                    }}
                            />
                          </td>
                          <td>
                                                    Mobile
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={this.state.mobile ? this.state.mobile : ''}
                              onChange={(event) => {
                                                        if (event.target.value < 0) { event.target.value = 0; }
                                                        this.state = { ...this.state, mobile: event.target.value };
                                                        this.updateParentComponent();
                                                    }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                                                    Transportation Allowance
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={this.state.transporationAllowance ? this.state.transporationAllowance : ''}
                              onChange={(event) => {
                                                        if (event.target.value < 0) { event.target.value = 0; }
                                                        this.state = { ...this.state, transporationAllowance: event.target.value };
                                                        this.updateParentComponent();
                                                    }}
                            />
                          </td>
                          <td>
                                                    Others Allowance
                          </td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              value={this.state.otherAllowance ? this.state.otherAllowance : ''}
                              onChange={(event) => {
                                                        if (event.target.value < 0) { event.target.value = 0; }
                                                        this.state = { ...this.state, otherAllowance: event.target.value };
                                                        this.updateParentComponent();
                                                    }}
                            />
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table>
                <tr>
                  <td>
                    <input
                      type="radio"
                      name="pass-pro"
                      onClick={() => {
                                        this.state = {
                                            ...this.state,
                                            passPro: false,
                                            notPassPro: true,
                                            basedSalary: null,
                                            mobile: null,
                                            transporationAllowance: null,
                                            otherAllowance: null
                                        };

                                        if (this.state.continued) {
                                          this.state = {
                                            ...this.state,
                                            continuedDate: moment(this.state.passProDate).add(60, 'day').format('YYYY-MM-DD')
                                          };
                                        }
                                        else {
                                          this.state = {
                                            ...this.state,
                                            terminationDate: moment(this.state.passProDate).add(1, 'day').format('YYYY-MM-DD')
                                          };
                                        }

                                        this.updateParentComponent();
                                      }
                                    }
                      checked={this.state.notPassPro}
                    />
                                    &nbsp;This person does not pass probation period. Action to be taken
                  </td>
                </tr>
                <tr>
                  <td id="pro-element3">
                    <div className="slide-show">
                      <table className="inner-table-second">
                        <tr>
                          <td>
                            <input
                              type="radio"
                              name="terminate"
                              onClick={() => {
                                                        this.state = {
                                                            ...this.state,
                                                            continued: false,
                                                            terminationDate: moment(this.state.passProDate).add(1, 'day').format('YYYY-MM-DD'),
                                                            continuedDate: null
                                                        };
                                                        this.updateParentComponent();
                                                    }}
                              checked={!this.state.continued}
                            />
                                                    &nbsp;Termination Effective
                          </td>
                          <td>
                            {!this.state.continued ?
                                                        // <input type='date' value={this.state.terminationDate ? this.state.terminationDate : ''} onChange={(event) => {
                                                        //     if (moment(event.target.value).isAfter(this.state.passProDate)) {
                                                        //         this.state = {
                                                        //             ...this.state,
                                                        //             terminationDate: event.target.value
                                                        //         };
                                                        //         this.updateParentComponent();
                                                        //     } else
                                                        //         alert(validationMessage.terminationDateValidation);
                                                        // }} disabled={this.state.continued} />
                              <DatePicker
                                selected={this.state.terminationDate ? moment(this.state.terminationDate) : null}
                                onChangeRaw={(event) => {
                                                                event.target.value = moment(this.state.terminationDate).format('DD/MM/YYYY');
                                                            }}
                                onChange={(date) => {
                                                                this.state = {
                                                                    ...this.state,
                                                                    terminationDate: date.format('YYYY-MM-DD')
                                                                };
                                                                this.updateParentComponent();
                                                            }}
                                id="terminateDatepicker"
                                disabled={this.props.mode !== 'edit'}
                                dateFormat="DD/MM/YYYY"
                                minDate={moment(this.state.passProDate).add(1, 'days')}
                              />
                                                        : ''}
                            {!this.state.continued && this.props.mode === 'edit' ? <Icon name="calendar outline icon" size="large" onClick={() => { document.getElementById('terminateDatepicker').click(); }} /> : ''}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <input
                              type="radio"
                              name="terminate"
                              onClick={() => {
                                                        this.state = {
                                                            ...this.state,
                                                            continued: true,
                                                            continuedDate: moment(this.state.passProDate).add(60, 'day').format('YYYY-MM-DD'),
                                                            terminationDate: null
                                                        };
                                                        this.updateParentComponent();
                                                    }}
                              checked={this.state.continued}
                            />
                                                    &nbsp;Continued probation until
                          </td>
                          <td>
                            {this.state.continued ?
                                                        // <input type='date' value={this.state.continuedDate ? this.state.continuedDate : ''} onChange={(event) => {
                                                        //     if (moment(event.target.value).isAfter(this.state.passProDate)) {
                                                        //         this.state = { ...this.state, continuedDate: event.target.value };
                                                        //         this.updateParentComponent();
                                                        //     } else
                                                        //         alert(validationMessage.continuedDateValidation);
                                                        // }} disabled={!this.state.continued} />
                              <DatePicker
                                selected={this.state.continuedDate ? moment(this.state.continuedDate) : null}
                                onChangeRaw={(event) => {
                                                                event.target.value = moment(this.state.continuedDate).format('DD/MM/YYYY');
                                                            }}
                                onChange={(date) => {
                                                                this.state = {
                                                                    ...this.state,
                                                                    continuedDate: date.format('YYYY-MM-DD')
                                                                };
                                                                this.updateParentComponent();
                                                            }}
                                id="continuedDatepicker"
                                disabled={this.props.mode !== 'edit'}
                                dateFormat="DD/MM/YYYY"
                                minDate={moment(this.state.passProDate).add(1, 'days')}
                              />
                                                        : ''}
                            {this.state.continued && this.props.mode === 'edit' ? <Icon name="calendar outline icon" size="large" onClick={() => { document.getElementById('continuedDatepicker').click(); }} /> : ''}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>


      </div >
    );
  }
}

EvaluationResultComponent.defaultProps = {
  terminationDate: null,
  continuedDate: null,
  basedSalary: null,
  mobile: null,
  transporationAllowance: null,
  otherAllowance: null
};

EvaluationResultComponent.propTypes = {
  passPro: PropTypes.bool.isRequired,
  notPassPro: PropTypes.bool.isRequired,
  confirmed: PropTypes.bool.isRequired,
  continued: PropTypes.bool.isRequired,
  endProbationDate: PropTypes.string.isRequired,
  terminationDate: PropTypes.string,
  continuedDate: PropTypes.string,
  mode: PropTypes.string.isRequired,
  basedSalary: PropTypes.number,
  mobile: PropTypes.number,
  transporationAllowance: PropTypes.number,
  otherAllowance: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default EvaluationResultComponent;
