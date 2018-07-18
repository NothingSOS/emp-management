import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions/auth';
import NavBar from '../components/NavBar';

const mapStateToProps = state => ({
  username: state.auth.username
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
