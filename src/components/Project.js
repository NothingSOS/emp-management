import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Input, Table, Menu, Button, Icon } from 'semantic-ui-react';
import history from '../history';

const Project = ({ projects, onAddClick, onSearchChange, sortKey, direction, handleSort }) => (
  <Segment.Group raised>
    <Segment>
      <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
      <Button icon floated="right" onClick={onAddClick}>
        <Icon name="add" />
      </Button>
    </Segment>
    <Segment>
      <Table fixed striped sortable selectable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={sortKey === 'id' ? direction : null} onClick={() => handleSort('id')}>Proj No.</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'name' ? direction : null} onClick={() => handleSort('name')}>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'customer' ? direction : null} onClick={() => handleSort('customer')}>Customer</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'quotationId' ? direction : null} onClick={() => handleSort('quotationId')}>Quo No.</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'startDate' ? direction : null} onClick={() => handleSort('startDate')}>From</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'endDate' ? direction : null} onClick={() => handleSort('endDate')}>To</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'status' ? direction : null} onClick={() => handleSort('status')}>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {projects.map(project => (
            <Table.Row key={project.id} style={{ cursor: 'pointer' }} onClick={() => history.push(`/project/${project.id}`)}>
              <Table.Cell>{project.id}</Table.Cell>
              <Table.Cell>{project.name}</Table.Cell>
              <Table.Cell>{project.customer}</Table.Cell>
              <Table.Cell>{project.quotationId}</Table.Cell>
              <Table.Cell>{project.startDate}</Table.Cell>
              <Table.Cell>{project.endDate}</Table.Cell>
              <Table.Cell>{project.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  </Segment.Group>
);

Project.propTypes = {
  projects: PropTypes.array.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired
};

export default Project;
