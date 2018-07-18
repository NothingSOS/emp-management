import React from 'react';
import { Icon, Table, Label, Grid, Progress, Button, Modal } from 'semantic-ui-react';

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // dayOfMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // style={{ backgroundColor: 'white' }}
      holidaycolor: 'rgb(221, 225, 230)',
      // editButtonBluecolor: 'rgb(33,133,208)',
      ButtonRedcolor: '#FF0000',
      textWorkcolor: '#2185CD',
      textHolidaycolor: '#999999',
      textAnotherMonthcolor: 'rgb(221, 225, 230)',
      iconRedcolor: 'red',
      iconBluecolor: 'blue'
    };
    this.anotherMonthCell = this.anotherMonthCell.bind(this);
    this.holidayCell = this.holidayCell.bind(this);
    this.workdayCell = this.workdayCell.bind(this);
  }
  editButtonWorkday(hour) {
    let color = '';
    let iconcolor = '';
    if (hour < 8) { color = this.state.ButtonRedcolor; iconcolor = this.state.iconRedcolor; }
    else { color = this.state.textWorkcolor; iconcolor = this.state.iconBluecolor; }
    return (
      <Grid.Row textAlign="center">
        <Button animated="fade" style={{ borderStyle: 'solid', borderColor: color, backgroundColor: 'white', borderWidth: '1px' }} >
          <Button.Content visible><font color={color} >{hour} Hour</font></Button.Content>
          <Button.Content hidden > <Icon color={iconcolor} name="pencil alternate" /> </Button.Content>
        </Button>
      </Grid.Row>
    );
  }
  anotherMonthCell() {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font color={this.state.textHolidaycolor} size="3" ><b>31</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '7.5em' }} />
        </Grid.Column>
      </Table.Cell>
    );
  }
  holidayCell() {
    return (
      <Table.Cell style={{ backgroundColor: this.state.holidaycolor }} >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font color={this.state.textAnotherMonthcolor} size="3" ><b>31</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '5em' }} />
          <Grid.Row textAlign="center">
            <Button animated="fade" style={{ borderStyle: 'solid', borderColor: this.state.textWorkcolor, backgroundColor: 'white', borderWidth: '1px' }} >
              <Button.Content visible><font color={this.state.textWorkcolor}>0 Hour</font></Button.Content>
              <Button.Content hidden > <Icon color="blue" name="pencil alternate" /> </Button.Content>
            </Button>
          </Grid.Row>
        </Grid.Column>
      </Table.Cell>
    );
  }
  workdayCell(hour) {
    return (
      <Table.Cell >
        <Grid.Column>
          <Grid.Row textAlign="right" >
            <font size="3" ><b>31</b></font>
          </Grid.Row>
          <Grid.Row style={{ height: '5em' }} />
          {this.editButtonWorkday(hour)}
        </Grid.Column>
      </Table.Cell>
    );
  }

  render() {
    const progressBar = percentWork => <div> <Progress percent={percentWork} active color="blue" progress /> </div>;

    return (
      <div>
        {progressBar(20)}
        <Table celled structured fixed>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell colSpan="7"><font size="3">{this.state.month[6]}</font> 2018</Table.HeaderCell>
            </Table.Row>
            <Table.Row textAlign="center">
              {this.state.days.map(day => <Table.HeaderCell>{day}</Table.HeaderCell>)}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              {this.anotherMonthCell()}
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    <font color="blue">1</font>
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Button animated="fade" style={{ borderStyle: 'solid', borderColor: this.state.textWorkcolor, backgroundColor: 'white', borderWidth: '1px' }} >
                      <Button.Content visible><font color={this.state.textWorkcolor}>8 Hour</font></Button.Content>
                      <Button.Content hidden><Icon color="blue" name="pencil alternate" /></Button.Content>
                    </Button>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              {this.workdayCell(7)}
              {this.workdayCell(8)}
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    <font color="blue">1</font>
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Button animated="fade" style={{ borderStyle: 'solid', borderColor: '#2185CD', backgroundColor: 'white', borderWidth: '1px' }} >
                      <Button.Content visible><font color="#2185CD">8 Hour</font></Button.Content>
                      <Button.Content hidden > <Icon color="blue" name="pencil alternate" /> </Button.Content>
                    </Button>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    <font color="blue">1</font>
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Button basic animated="fade" color="blue">
                      <Button.Content visible>8 Hour</Button.Content>
                      <Button.Content hidden > <Icon color="white" name="pencil alternate" /> </Button.Content>
                    </Button>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: this.state.holidaycolor }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    <font color="blue">1</font>
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Button basic animated="fade" color="blue">
                      <Button.Content visible>8 Hour</Button.Content>
                      <Button.Content hidden > <Icon color="white" name="pencil alternate" /> </Button.Content>
                    </Button>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              {this.holidayCell()}
              {this.holidayCell()}
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: this.state.holidaycolor }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              <Table.Cell style={{ backgroundColor: this.state.holidaycolor }} >
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: this.state.holidaycolor }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
            <Table.Row style={{ height: '10em', maxWidth: '10em' }} >
              <Table.Cell style={{ backgroundColor: this.state.holidaycolor }} >
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
              <Table.Cell style={{ backgroundColor: this.state.holidaycolor }}>
                <Grid.Column>
                  <Grid.Row textAlign="right">
                    1
                  </Grid.Row>
                  <Grid.Row style={{ height: '5em' }} />
                  <Grid.Row textAlign="center">
                    <Label as="a" basic color="blue" size="medium" >
                      <Icon name="pencil alternate" /><font size="2">8  Hour</font>
                    </Label>
                  </Grid.Row>
                </Grid.Column>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Modal trigger={<Button>New Task</Button>} />
      </div>
    );
  }
}

export default Timesheet;
