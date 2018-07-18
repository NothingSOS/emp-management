import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import App from '../components/App';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated ? (
        <App>
          <Component {...props} />
        </App>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      ))
    }
  />
);

PrivateRoute.defaultProps = {
  location: null
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username
});

export default connect(mapStateToProps)(PrivateRoute);
