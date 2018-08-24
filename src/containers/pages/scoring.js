import React, { Component } from 'react';
import './css/Form_G_I.css';

class Scoring1 extends Component {
  constructor(props) {
    super(props);


    this.state = {
      cur_score:[],
      total:'',
      content:[
        {topic:'ความรู้ในงานและการพัฒนาตัวเอง (Knowledge and Improvement)',weight:''},
        {topic:'คุณภาพงาน (Quality of Work)',weight:''},
        {topic:'ปริมาณงาน (Quantity of Work)',weight:''},
        {topic:'การทำงานร่วมกับผู้อื่น (Co-operation with Colleagues)',weight:''},
        {topic:'การปฏิบัติตามระเบียบบริษัทฯ จรรยาบรรณและความซื่อสัตย์ (Compliance Ehics and Integrity)',weight:''}
      ],
      perf:{
            level2:[20.0,15.0,15.0,20.0,15.0,15.0],
            level3:[15.0,15.0,15.0,15.0,15.0,15.0,10.0],
            nonlevel:[20.0,20.0,20.0,20.0,20.0]
          },
          pro:{
                level2:[20.0,15.0,15.0,20.0,10.0,20.0],
                level3:[15.0,10.0,10.0,15.0,10.0,20.0,20.0],
                nonlevel:[20.0,20.0,20.0,20.0,20.0]
              },
        weight:{}

    }
    this.changeF = this.changeF.bind(this);
    this.changeS = this.changeS.bind(this);
  }
  componentWillMount(){
    if(this.props.type=='pro'){
      this.state.weight = this.state.pro;
    }else this.state.weight = this.state.perf;
    if(this.props.level>=2){
      this.state.content.push ({topic:"ความสามารถทางด้านภาษาอังกฤษ (TOEIC)",weight:''});
      if(this.props.level>=3){
        this.state.content.push({topic:'ประกาศนียบัตรตามสายงาน (Certificate)',weight:''});
        for(var i=0;i<this.state.content.length;i++){
          this.state.content[i].weight = this.state.weight.level3[i];
        }
      }else{
        for(var i=0;i<this.state.content.length;i++){
          this.state.content[i].weight = this.state.weight.level2[i];
        }
      }
    }else{
      for(var i=0;i<this.state.content.length;i++){
        this.state.content[i].weight = this.state.weight.nonlevel[i];
      }
    }
  }
  componentDidMount() {

      var x = document.getElementsByName('p');
      var y = document.getElementsByName('q');
      for (var i = 0; i < x.length; i++) {
        x[i].value = this.props.score[i];
        if(!this.props.editable){
          x[i].disabled = true;
          y[i].disabled = true;
        }
      }
      if(!this.props.editable)document.getElementById('submit-but').disabled = true;
      this.changeF();
      this.changeS();
      console.log('did score')
  }

  incFloatAnimation(a, b) {
    var int = setInterval(toDo, 0.1);
    function toDo() {
      if (parseFloat(b.innerHTML) == a) {
        clearInterval(int);
      }
      else {
        if (parseFloat(b.innerHTML) > a) {
          b.innerHTML = (parseFloat(b.innerHTML) - 0.1).toFixed(1) + '%';
        } else {
          b.innerHTML = (parseFloat(b.innerHTML) + 0.1).toFixed(1) + '%';
        }
      }
    }
  }
  incIntAnimation(a, b) {
    var int = setInterval(toDo, 35);
    function toDo() {
      if (parseInt(b.innerHTML) == a) {
        clearInterval(int);
      }
      else {
        if (parseInt(b.innerHTML) > a) {
          b.innerHTML = (parseFloat(b.innerHTML) - 1);
        } else {
          b.innerHTML = (parseFloat(b.innerHTML) + 1);
        }
      }
    }
  }
  changeF() {
    var total = 0;
    var x = document.getElementsByName('q');
    var w = document.getElementsByName('q_w');
    for (var i = 0; i < x.length; i++) {
      total += parseInt(x[i].value);
    }
    this.incIntAnimation(total, document.getElementById('ftotal'));
  }
  changeS() {
    console.log('begin');
    console.log(this.state.cur_score);
    var total = 0;
    var tmp = [];
    var x = document.getElementsByName('p');
    var w = document.getElementsByName('q_w');
    for (var i = 0; i < 7; i++) {
      if(i<x.length){
        tmp.push(x[i].value)
        this.incFloatAnimation((parseInt(x[i].value) / 5 * parseInt((this.state.content[i].weight))).toFixed(1), document.getElementsByName('sum')[i]);
        total += parseInt(x[i].value);
      }else tmp.push(0);
    }
    var a = ((total / (x.length*5)) * 100).toFixed(1);
    this.setState({total: a});
    var b = (document.getElementById('f_total'));
    this.incFloatAnimation(a, b);
    this.incIntAnimation(total, document.getElementById('stotal'));

    this.props.setMain(tmp);
    console.log('end');
  }
  // handle_submit() {
  //   if (this.state.total >= 60) {
  //     document.getElementsByName('main_option')[0].checked = 'true'
  //     this.props.setMain(true,this.state.cur_score);
  //     document.getElementById('main1_option').style.height = '3.1em';
  //
  //   }
  //   else {
  //     document.getElementsByName('main_option')[1].checked = 'true'
  //     this.props.setMain(false,this.state.cur_score);
  //     document.getElementById('main2_option').style.height = '6em';
  //
  //     console.log(document.getElementsByName('main_option').length)
  //     document.getElementById('date_input_pass').style.display='none';
  //
  //   }
  //   var x = document.getElementsByName('p');
  //   var y = document.getElementsByName('q');
  //   for (var i = 0; i < x.length; i++) {
  //     x[i].disabled = true;
  //     y[i].disabled = true;
  //   }
  //   //this.update_db();
  //   console.log(this.state.mainOption);
  //   document.getElementById('result').style.display = 'block';
  //   this.props.scrollAnimation();
  //   document.getElementById('submit-but').disabled = true;
  //   document.getElementById('sup-but').disabled = true;
  //   document.getElementById('mag-but').disabled = true;
  // }
  render() {
    var x=1;
    return (
      <div>
        <table className="table_main" id="table_main">
          <tbody>
            <tr>
              <th colSpan="12" className="table_header"><div className="lll"><span className="blue">Performance Appraisal Portion</span></div></th>
            </tr>
            <tr>
              <th>No.</th>
              <th colSpan="7">Appraisal Criteria</th>
              <th>Score</th>
              <th>Total Average</th>
              <th>Weight</th>
              <th>Total Point</th>
            </tr>
            {this.state.content.map( item =>
              <tr>
                <td className="No">{x++}</td>
                <td className="topic" colSpan="7">{item.topic}</td>
                <td className="Weight" >
                  <select name='q' onChange={this.changeF} >
                    <option value="1">1</option>
                    <option value="2" >2</option>
                    <option value="3" selected="selected">3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                  </select>
                </td>
                <td className="Weight" >
                  <select name='p' onChange={this.changeS}>
                    <option value="1">1</option>
                    <option value="2" >2</option>
                    <option value="3" selected="selected">3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                  </select>
                </td>
                <td className="Weight" name='q_w' >{item.weight+'%'}</td>
                <td className="Weight"><span name='sum'>0</span></td>
              </tr>
            )}

            <tr>
              <th colSpan="8">Total Performance Score</th>
              <th><span className="total" id="ftotal">0</span></th>
              <th><span className="total" id="stotal">0</span></th>
              <th className="Weight">100.0%</th>
              <th className="th_total"><span id='f_total' className="blue">48</span></th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Scoring1;
