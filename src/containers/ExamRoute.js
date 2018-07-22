import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
// change this to the new one page
import ExamApp from '../components/ExamApp';

const ExamRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated ? (
        <ExamApp>
          <Component {...props} />
        </ExamApp>
      ) : (
        <Redirect
          to={{
            pathname: '/examlogin',
            state: { from: props.location }
          }}
        />
      ))
    }
  />
);

ExamRoute.defaultProps = {
  location: null,
};

ExamRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.examAuth.isAuthenticated,
  id: state.examAuth.id,
});

export default connect(mapStateToProps)(ExamRoute);
