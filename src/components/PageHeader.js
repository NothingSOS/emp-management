import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Divider } from 'semantic-ui-react';

const PageHeader = ({ text, icon }) => (
  <div>
    <Header as="h1">
      <Icon name={icon} />
      {text}
    </Header>
    <Divider />
  </div>
);

PageHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default PageHeader;
