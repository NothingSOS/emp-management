import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import App from '../components/App';
import Can from './Can';

const PrivateRoute = ({ component: Component, isAuthenticated, can, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (isAuthenticated ? (
        <App>
          <Can activity={can} page>
            <Component {...props} />
          </Can>
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
  location: null,
  can: 'view'
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object,
  can: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username
});

export default connect(mapStateToProps)(PrivateRoute);
