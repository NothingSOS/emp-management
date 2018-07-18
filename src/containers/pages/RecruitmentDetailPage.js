import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchRecruitmentProfileRequest } from '../../actions/recruitmentProfile';
import RecruitmentProfile from '../../components/RecruitmentProfile';
import Loader from '../../components/Loader';

const RecruitmentDetailPage = ({ recruitmentProfile }) => (
  <div>
    {recruitmentProfile.isFetching ? <Loader /> : <RecruitmentProfile recruitmentProfile={recruitmentProfile.data} />}
  </div>
);

RecruitmentDetailPage.propTypes = {
  recruitmentProfile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  recruitmentProfile: state.recruitmentProfile,
});

const mapDispatchToProps = dispatch => ({
  fetchRecruitmentProfile: id => dispatch(fetchRecruitmentProfileRequest(id)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchRecruitmentProfile, match: { params } } = this.props;
      fetchRecruitmentProfile(params.id);
    }
  })
);

export default enhance(RecruitmentDetailPage);
