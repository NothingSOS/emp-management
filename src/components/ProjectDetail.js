import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Header, Icon, Table, Button } from 'semantic-ui-react';

const membersDetail = memberDetail => (
  <Table.Row>
    <Table.Cell>{memberDetail.userId || '-'}</Table.Cell>
    <Table.Cell>{memberDetail.firstName || '-'}{memberDetail.lastName || '-'}</Table.Cell>
    <Table.Cell>{memberDetail.name || '-'}</Table.Cell>
    <Table.Cell>{memberDetail.role || '-'}</Table.Cell>
    <Table.Cell>
      <Button animated="fade" style={{ borderStyle: 'solid', borderColor: '#FF0000', backgroundColor: 'white', borderWidth: '1px' }} >
        <Button.Content visible><font color="#FF0000" >Delete</font></Button.Content>
        <Button.Content hidden > <Icon color="red" name="user delete" /> </Button.Content>
      </Button>
    </Table.Cell>
  </Table.Row>
);

const ProjectDetail = ({ projectDetail }) => (
  <Segment.Group raised size="large" >
    <Segment>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width="5">
            <Header as="h2">
              <Icon name="file alternate" />
              <Header.Content>
                Project Detail
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column floated="right" >
            <Icon name="edit" size="large" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Grid Columns={2} padded>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} mobile={16} tablet={4}><font size="4"><b>Project Number :</b></font></Grid.Column>
        <Grid.Column computer={11} mobile={16} tablet={11}>{projectDetail.id || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} mobile={16} tablet={4} ><font size="4"><b>Project Name :</b></font></Grid.Column>
        <Grid.Column computer={11} mobile={16} tablet={11} >{projectDetail.name || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Customer :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.customer || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Quotation Number :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.quotationId || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Form :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.startDate || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>To :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.endDate || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Description :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.description || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Status :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.status || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>File :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>Requirment</Grid.Column>
      </Grid>
    </Segment>
    <Segment>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width="5">
            <Header as="h2">
              <Icon name="users" />
              <Header.Content>
                Project Members
              </Header.Content>
            </Header>
          </Grid.Column>
          <Grid.Column floated="right" >
            <Icon name="add user" size="large" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Emp.No.</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projectDetail.members.map(memberDetail => membersDetail(memberDetail))}
        </Table.Body>
      </Table>
    </Segment>
  </Segment.Group>
);

ProjectDetail.propTypes = {
  projectDetail: PropTypes.object.isRequired,
};

export default ProjectDetail;
