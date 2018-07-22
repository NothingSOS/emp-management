import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import ModalContainer from '../containers/ModalContainer';

const ExamApp = ({ children }) => (
  <div style={{ backgroundColor: '#5c97b5' }}>
    <Container style={{ backgroundColor: 'white', height: '100%' }}>
      {children}
    </Container>
    <ModalContainer />
  </div>
);

ExamApp.propTypes = {
  children: PropTypes.element.isRequired
};

export default ExamApp;
