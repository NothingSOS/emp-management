import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Segment, Grid, Header, Icon, Table, Button, List } from 'semantic-ui-react';
import UploadFile from '../components/UploadFile';
import Can from '../containers/Can';

const membersDetail = (memberDetail, projectId, onDeleteClick) => (
  <Table.Row key={memberDetail.userId}>
    <Table.Cell>{memberDetail.userId || '-'}</Table.Cell>
    <Table.Cell>{memberDetail.firstName || '-'}{' '}{memberDetail.lastName || '-'}</Table.Cell>
    <Table.Cell>{memberDetail.name || '-'}</Table.Cell>
    <Table.Cell>{memberDetail.role || '-'}</Table.Cell>
    <Table.Cell>{memberDetail.startDate ? moment(memberDetail.startDate).format('DD/MM/YYYY') : '-'}</Table.Cell>
    <Table.Cell>{memberDetail.endDate ? moment(memberDetail.endDate).format('DD/MM/YYYY') : '-'}</Table.Cell>
    <Table.Cell>
      <Can activity="hasProjectDelete">
        <Button animated="fade" style={{ borderStyle: 'solid', borderColor: '#FF0000', backgroundColor: 'white', borderWidth: '1px' }} onClick={() => onDeleteClick(memberDetail.userId, projectId)}>
          <Button.Content visible><font color="#FF0000" >Delete</font></Button.Content>
          <Button.Content hidden > <Icon color="red" name="user delete" /> </Button.Content>
        </Button>
      </Can>
    </Table.Cell>
  </Table.Row>
);

const ProjectDetail = ({ projectDetail, onEditClick, onAddMemberClick, onDeleteMemberClick, handleDownloadFile, handleUploadFile, handleDeleteFile }) => (
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
          <Can activity="projectEdit">
            <Grid.Column floated="right" >
              <Icon link name="edit" size="large" onClick={onEditClick} />
            </Grid.Column>
          </Can>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Grid columns={2} padded>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} mobile={16} tablet={4}><font size="4"><b>Project No. :</b></font></Grid.Column>
        <Grid.Column computer={11} mobile={16} tablet={11}>{projectDetail.id || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} mobile={16} tablet={4} ><font size="4"><b>Project Name :</b></font></Grid.Column>
        <Grid.Column computer={11} mobile={16} tablet={11} >{projectDetail.name || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Quotation No. :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.quotationId || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Customer :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.customer || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Purchased Order :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.purchasedOrder || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>Amount :</b></font></Grid.Column>
        <Grid.Column computer={11} tablet={11} mobile={16}>{projectDetail.amount || '-'}</Grid.Column>
        <Grid.Column width={1} only="large screen" />
        <Grid.Column computer={4} tablet={4} mobile={16} ><font size="4"><b>From :</b></font></Grid.Column>
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
        <Grid.Column computer={11} tablet={11} mobile={16}>
          <List>
            {projectDetail.files.map(file => (
              <List.Item key={file.id}>
                <a href onClick={() => handleDownloadFile(file.id, file.name)}>{`${file.name} `}</a>
                <Can activity="projectEdit">
                  <a href onClick={() => handleDeleteFile(file.id)}>[delete]</a>
                </Can>
              </List.Item>
            ))}
          </List>
          <Can activity="projectEdit">
            <UploadFile onUploadSubmit={handleUploadFile} args={[projectDetail.projectId]} />
          </Can>
        </Grid.Column>
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
          <Can activity="hasProjectDelete">
            <Grid.Column floated="right" >
              <Icon link name="add user" size="large" onClick={onAddMemberClick} />
            </Grid.Column>
          </Can>
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
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projectDetail.members.map(memberDetail => membersDetail(memberDetail, projectDetail.id, onDeleteMemberClick))}
        </Table.Body>
      </Table>
    </Segment>
  </Segment.Group>
);

ProjectDetail.propTypes = {
  projectDetail: PropTypes.object.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onAddMemberClick: PropTypes.func.isRequired,
  onDeleteMemberClick: PropTypes.func.isRequired,
  handleDownloadFile: PropTypes.func.isRequired,
  handleUploadFile: PropTypes.func.isRequired,
  handleDeleteFile: PropTypes.func.isRequired
};

export default ProjectDetail;
