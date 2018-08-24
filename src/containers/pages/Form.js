import React, { Component } from 'react';
import * as Scroll from 'react-scroll';
import moment from 'moment';
import Calendar from 'react-calendar';
import './css/Form_G_I.css';
import logo from './pic/logo.png'
import cmark from './pic/mark.png'
import Scoring from './Scoring'
import logo2 from './pic/logo2.png'
import save_icon from './pic/save.png'
let scroll = Scroll.animateScroll;
let Element = Scroll.Element;
let scroller = Scroll.scroller;

class Form extends Component {

  constructor(props) {
    super(props);
    this.wantChange = '';
    this.state = {
      name: '',
      eid: '',
      dep: '',
      level: '',
      pos: '',
      sup: '',
      pstart: '',
      pend: '',
      continuedDate:'',
      terminatedDate:'',
      score: [3,3,3,3,3,3,3],
      passPro: null,
      option1: null,
      option2: null,
      emp:null,
      sup:null,
      mag:null,
      basedSalary:null,
      mobile:null,
      transporationAllowance:null,
      otherAllowance:null,
    }
    this.handle_accept1 = this.handle_accept1.bind(this);
    this.handle_accept2 = this.handle_accept2.bind(this);
    this.handle_accept3 = this.handle_accept3.bind(this);
    this.handle_radio_1 = this.handle_radio_1.bind(this);
    this.handle_radio_2 = this.handle_radio_2.bind(this);
    this.toggle_calendar = this.toggle_calendar.bind(this);
    this.handle_main_radio_1 = this.handle_main_radio_1.bind(this);
    this.handle_main_radio_2 = this.handle_main_radio_2.bind(this);
  }
  shouldComponentUpdate(nextProps,nextState){
    return (nextState.score!=this.state.score ||
    nextState.passPro!=this.state.passPro ||
    nextState.option1!=this.state.option1 ||
    nextState.option2!=this.state.option2 ||
    nextState.basedSalary != this.state.basedSalary ||
    nextState.mobile != this.state.mobile ||
    nextState.transporationAllowance != this.state.transporationAllowance ||
    nextState.otherAllowance != this.state.otherAllowance ||
    nextState.pend != this.state.pend
    )

  }
  componentDidUpdate(){
    this.props.test(this.state);
  }
  componentWillMount() {
    this.setState({
      name: this.props.profile.general.firstName + ' ' + this.props.profile.general.lastName,
      eid: this.props.profile.id,
      dep: this.props.profile.work.departmentName,
      level: this.props.profile.work.levelId,
      pos: this.props.profile.work.positionName,
      pstart: this.props.profile.work.startDate,
    })
    if(this.props.profile.eva!=null) this.setState({
      score: this.props.profile.eva.score,
      passPro: this.props.profile.eva.passPro,
      option1: this.props.profile.eva.confirmedByEmployment,
      option2: this.props.profile.eva.continued,
      basedSalary:this.props.profile.eva.basedSalary,
      mobile:this.props.profile.eva.mobile,
      transporationAllowance:this.props.profile.eva.transporationAllowance,
      otherAllowance:this.props.profile.eva.otherAllowance,
      pend: this.props.profile.eva.passProDate
    })
  }
  componentDidMount() {
    if(this.props.profile.eva != null){
      document.getElementById('result').style.display = 'block';
      // if (this.state.passPro == true) {
      //   document.getElementById('main1').checked = 'checked';
      // } else document.getElementById('main2').checked = 'checked';
      if(this.state.passPro){
        this.handle_main_radio_1();
        if(this.state.option1){
          this.handle_radio_1();
        }else this.handle_radio_2()
      }else this.handle_main_radio_2();

      console.log('did form '+this.state.passPro);
    }
  }

  handle_radio_1() {
    this.setState({option1: true});
    document.getElementById('option1_1').checked = true;
    document.getElementById('option1_2').checked = false;
    document.getElementById('salary_option').style.height = '0';
  }
  handle_radio_2() {
    this.setState({option1: false});
    document.getElementById('option1_1').checked = false;
    document.getElementById('option1_2').checked = true;
    document.getElementById('salary_option').style.height = '5.5em';
  }
  handle_main_radio_1() {
    this.setState({passPro: true});
    document.getElementById('main1_option').style.height = '3.1em';
    document.getElementById('main2_option').style.height = '0';
    document.getElementById('main2_option').style.overflow = 'hidden';
    document.getElementById('option2_1').checked = false;
    document.getElementById('option2_2').checked = false;
    document.getElementById('date_input_pass').style.display='block';
    document.getElementById('input1').style.display = 'none';
    document.getElementById('input2').value = '';
    document.getElementById('input2').style.display = 'none';
    document.getElementById('input1').value = '';
  }
  handle_main_radio_2() {
    this.setState({passPro: false});
    document.getElementById('main1_option').style.height = '0';
    document.getElementById('main2_option').style.height = '6em';
    setTimeout(function(){document.getElementById('main2_option').style.overflow = 'visible'; }, 190);
    document.getElementById('salary_option').style.height = '0';
    document.getElementById('date_input_pass').style.display='none';
    document.getElementById('date_input_pass').value='';
    document.getElementById('option1_1').checked = false;
    document.getElementById('option1_2').checked = false;
  }
  setMain(y){
    this.setState({
      score: y
    });
  }
  onInputChange(input){
    this.setState({
      input: document.getElementById()
    })
  }
  handle_accept1() {
    if(this.state.emp==null){
      var date = (new Date()).toString().substr(0, 24);
      this.setState({emp: date})
      document.getElementById('emp').innerHTML = date;
      if(this.props.state==2){
        this.accept_db(1,date);
      }
    }

    document.getElementById('mark1').style.width = '2em';
    document.getElementById('sup-but').disabled = false;
    document.getElementById('emp-but').disabled = true;
  }
  handle_accept2() {
    if(this.state.sup==null){
      var date = (new Date()).toString().substr(0, 24);
      this.setState({sup: date})
      if(this.props.state==2){
        this.accept_db(2,date);
      }
      document.getElementById('sup').innerHTML = date;
    }
    document.getElementById('mark2').style.width = '2em';
    document.getElementById('mag-but').disabled = false;
    document.getElementById('sup-but').disabled = true;
  }
  handle_accept3() {
    if(this.state.mag==null){
      var date = (new Date()).toString().substr(0, 24);
      this.setState({mag: date})
      if(this.props.state==2){
        this.accept_db(3,date);
      }
      document.getElementById('mag').innerHTML = date;
    }
    document.getElementById('mark3').style.width = '2em';
    document.getElementById('mag-but').disabled = true;
  }
  handle_input_dis1() {
    document.getElementById('input2').style.display = 'none';
    document.getElementById('input1').style.display = 'block';
    document.getElementById('input2').value = '';
  }
  handle_input_dis2() {
    document.getElementById('input2').style.display = 'block';
    document.getElementById('input1').style.display = 'none';
    document.getElementById('input1').value = '';
  }
  handle_save(){
    console.log(this.state.option1)
  }
  toggle_calendar(event){
    if(document.getElementById('date_input').contains(event.target)){
      document.getElementById('calendar').style.height = '265px';
      this.wantChange = document.getElementById('date_input');
    }else if(document.getElementById('date_input_pass').contains(event.target)){
      document.getElementById('calendar1').style.height = '265px';
      this.setState({wantChange: document.getElementById('date_input_pass')});
    }else if(document.getElementById('input1').contains(event.target)){
      document.getElementById('calendar2').style.height = '265px';
      this.setState({wantChange: document.getElementById('input1')});
    }else if(document.getElementById('input2').contains(event.target)){
      document.getElementById('calendar3').style.height = '265px';
      this.setState({wantChange: document.getElementById('input2')});
    }else if(!document.getElementById('calendar').contains(event.target)){
      document.getElementById('calendar').style.height = '0';
      document.getElementById('calendar1').style.height = '0';
      document.getElementById('calendar2').style.height = '0';
      document.getElementById('calendar3').style.height = '0';
    }
  }

  handle_calendar(date){
    var tmp = date.getFullYear() + "-" + (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate();
    this.wantChange.value=tmp;
    this.setState({pend: tmp});
    console.log(this.state.pend);
    //this.props.s.value = date;
  };
  // zzz(){
  //   var int = setInterval(toDo, 500);
  //   function toDo() {
  //     var a = window.innerHeight+window.pageYOffset;
  //     var b = document.getElementById('kkk');
  //     if(a>b.offsetTop+200) {
  //       document.getElementById('mark1').style.width='2em';
  //       console.log(a + ' ' + b.offsetTop);
  //       clearInterval(int);
  //
  //     }
  //     else {
  //       console.log(window.innerHeight);
  //     }
  //   }
  // }
  render() {
    return (
      <div className="Body" onClick={this.toggle_calendar} onMouseMove={this.zzz}>
        <img className="logo_back" src={logo2} />
        <div className="profile">
          <div className="div_logo" align="center"><img className="logo" src={logo} /></div>
          <div>
            <table className="profile_table">
              <tbody>
                <tr>
                  <th colSpan="4" className="table_header"><div className="lll"><span className="blue">Information</span></div> </th>
                </tr>
                <tr>
                  <td className="topic_1">Name:</td>
                  <td className="show_1"><span>{this.state.name}</span></td>
                  <td className="topic_2">Department:</td>
                  <td className="show_2">{this.state.dep}</td>
                </tr>
                <tr>
                  <td className="topic_1">EmployeeID:</td>
                  <td className="show_1"><span>{this.state.eid}</span></td>
                  <td className="topic_2">Position:</td>
                  <td className="show_2"><span>{this.state.pos}</span></td>

                </tr>
                <tr>
                  <td className="topic_1">Level:</td>
                  <td className="show_1"><span>{this.state.level}</span></td>
                  <td className="topic_2">Probation Start Date:</td>
                  <td className="show_2">{this.state.pstart}</td>

                </tr>
                <tr>
                  <td className="topic_1">Supervisor:</td>
                  <td className="show_1"><span>{this.state.sup}</span></td>
                  <td className="topic_2">Probation End Date :</td>
                  <td className="show_2"><div className="div_ca"><input className="date_input" id="date_input" type="date" value={this.state.pend}></input><div className="calendar" id="calendar"><Calendar onChange={this.handle_calendar.bind(this)}/></div></div></td>
                </tr>
              </tbody>
            </table>

          </div>

          <Scoring ref="child" scrollAnimation={this.scrollanimation} score={this.state.score} state='2' setMain={this.setMain.bind(this)} setMainCheck1={this.handle_main_radio_1} setMainCheck2={this.handle_main_radio_2} level='1' type='per' editable={true}/>

          <Element name="result">
          <div className="result" id="result">
            <div className="result-table">
              <table className="grid-res">
                <tbody>
                  <tr>
                    <th colSpan="10"><div className="lll"><span className="blue">The Evaluation Result</span></div></th>
                  </tr>
                  <tr>
                    <td colSpan="1"></td>
                    <td colSpan="5"><input id="main1" type="radio" name='main_option' onClick={this.handle_main_radio_1} checked={this.state.passPro}></input>Pass probationary period. Effective date on</td>
                    <td colSpan="1">  </td>
                    <td colSpan="3"><div className="div_ca"><input className="date_input" id="date_input_pass" ></input><div className="calendar" id="calendar1"><Calendar onChange={this.handle_calendar.bind(this)}/></div></div></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="result-table-hidden" id="main1_option">
              <table className="grid-res">
                <tbody>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="3"><input type="radio" name="option1" id="option1_1" onClick={this.handle_radio_1} ></input>Confirmed By Employment Conditions</td>
                    <td></td>
                    <td colSpan="4"> <input type="radio" name="option1" id="option1_2" onClick={this.handle_radio_2}></input>Adjust the Salary and Benefits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="result-table-hidden" id="salary_option">
              <table className="grid-res">
                <tbody>
                  <tr className="option1_row" id="option1_row">
                    <td colSpan="2"></td>
                    <td colSpan="2" >Based Salary</td>
                    <td><input id="base_salary"type='number' onChange={(event)=> this.setState({basedSalary: event.target.value})} value={this.state.basedSalary}></input></td>
                    <td colSpan="2">Mobile</td>
                    <td colSpan="1"><input id="mobile"  onChange={(event)=> this.setState({mobile: event.target.value})} value={this.state.mobile}></input></td>
                    <td></td>
                  </tr>
                  <tr className="option1_row" id="option1_row">
                    <td colSpan="2"></td>
                    <td colSpan="2">Transporation Allowance</td>
                    <td><input id="transporation" type='number' onChange={(event)=> this.setState({transporationAllowance: event.target.value})} value={this.state.transporationAllowance}></input></td>
                    <td colSpan="2">Others Allowance</td>
                    <td colSpan="1"><input id="other" type='number' onChange={(event)=> this.setState({otherAllowance: event.target.value})} value={this.state.otherAllowance}></input></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="result-table">
              <table className="grid-res">
                <tbody>
                  <tr>
                    <td colSpan="1"></td>
                    <td colSpan="5"><input id="main2" type='radio' name="main_option" onClick={this.handle_main_radio_2} checked={!this.state.passPro}></input>This person does not pass probation period. Action to be taken </td>
                    <td colSpan="4">  </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="result-table-hidden" id="main2_option">
              <table className="grid-res">
                <tbody>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="3"><input type="radio" name="option2" id="option2_1" onClick={this.handle_input_dis1}></input>Termination Effective</td>
                    <td colSpan="2"><div className="div_ca"><input id='input1' className="date_input1"></input><div className="calendar" id="calendar2"><Calendar onChange={this.handle_calendar.bind(this)}/></div></div></td>
                    <td colSpan="3"></td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="3"><input type="radio" name="option2" id="option2_2" onClick={this.handle_input_dis2}></input>Continued probation untill</td>
                    <td colSpan="2" ><div className="div_ca"><input id='input2' className="date_input2"></input><div className="calendar" id="calendar3"><Calendar onChange={this.handle_calendar.bind(this)}/></div></div></td>
                    <td colSpan="3"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <div>Summary Comments by Supervisors:</div>
              <textarea className="comment"></textarea>
            </div>

            <div>
              <div>Employee has read this appraisal and discussed the contents with direct supervisor. Signatures identify that employee has been advised on their performance by direct supervisor.</div>
            </div>

            <div id='kkk'>
              <table className="grid">
                <tbody>
                  <tr>
                    <th>Employee signature:</th>
                    <th>Supervisor signature:</th>
                    <th>Managing Director signature:</th>
                  </tr>
                  <tr>
                    <th><div className='div_mark' ><button className="Accept-button" id='emp-but' onClick={this.handle_accept1}>Accept</button><div className="div_mark1" id="mark1"><img src={cmark} className="mark"></img></div></div></th>
                    <th><div className='div_mark' ><button className="Accept-button" id='sup-but' onClick={this.handle_accept2}>Accept</button><div className="div_mark2" id="mark2"><img src={cmark} className="mark"></img></div></div></th>
                    <th><div className='div_mark' ><button className="Accept-button" id='mag-but' onClick={this.handle_accept3}>Accept</button><div className="div_mark3" id="mark3"><img src={cmark} className="mark"></img></div></div></th>
                  </tr>
                  <tr>
                    <th>Date: <span id="emp" className="date">{this.state.emp}</span></th>
                    <th>Date: <span id="sup" className="date">{this.state.sup}</span></th>
                    <th>Date: <span id="mag" className="date">{this.state.mag}</span></th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </Element>
        </div>

      </div>
    );
  }
}

export default Form;
