import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchProfileRequest } from '../../actions/profile';
import { fetchMasterTableRequest } from '../../actions/masterTable';
import Profile from '../../components/Profile';
import Loader from '../../components/Loader';

const ProfilePage = ({ profile }) => (
  <div>
    {profile.isFetching ? <Loader /> : <Profile profile={profile} />}
  </div>
);

ProfilePage.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  id: state.auth.id,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: id => dispatch(fetchProfileRequest(id)),
  fetchMasterTable: () => dispatch(fetchMasterTableRequest())
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { id, fetchProfile, fetchMasterTable, match: { params } } = this.props;
      fetchProfile(params.id || id);
      fetchMasterTable();
    }
  })
);

export default enhance(ProfilePage);
