import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import NavBarContainer from '../containers/NavBarContainer';
import ModalContainer from '../containers/ModalContainer';

const App = ({ children }) => (
  <div>
    <NavBarContainer />
    <br />
    <Container>
      {children}
    </Container>
    <ModalContainer />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
