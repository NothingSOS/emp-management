import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, List, Dropdown } from 'semantic-ui-react';

const ProfileBox = ({ lists, onEditClick, onDeleteClick }) => (
  <Segment raised padded size="large">
    <Grid>
      <Grid.Column computer={15} mobile={14}>
        <Grid columns={2}>
          <Grid.Column computer={4} >
            <List>
              {lists.map(l => (
                <List.Item key={l.key}>
                  <List.Header>
                    {l.title}
                  </List.Header>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <List>
              {lists.map(l => (
                <List.Item key={l.key}>{l.value || '-'}</List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid>
      </Grid.Column>
      <Grid.Column floated="right" computer={1} mobile={2}>
        <Dropdown icon="ellipsis horizontal" direction="left">
          <Dropdown.Menu>
            {onEditClick && <Dropdown.Item text="Edit" icon="pencil alternate" onClick={onEditClick} />}
            {onDeleteClick && <Dropdown.Item text="Delete" icon="trash alternate" onClick={onDeleteClick} />}
          </Dropdown.Menu>
        </Dropdown>
      </Grid.Column>
    </Grid>
  </Segment>
);

ProfileBox.defaultProps = {
  onEditClick: undefined,
  onDeleteClick: undefined
};

ProfileBox.propTypes = {
  lists: PropTypes.array.isRequired,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default ProfileBox;
