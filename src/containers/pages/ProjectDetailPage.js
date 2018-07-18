import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { fetchProjectDetailRequest } from '../../actions/projectDetail';
import Loader from '../../components/Loader';
import ProjectDetail from '../../components/ProjectDetail';

const ProjectDetailPage = ({ isFetching, projectDetail }) => (
  <div>
    {isFetching ? <Loader /> : <ProjectDetail projectDetail={projectDetail} />}
  </div>
);

ProjectDetailPage.defaultProps = {
  isFetching: true,
  projectDetail: {}
};

ProjectDetailPage.propTypes = {
  isFetching: PropTypes.bool,
  projectDetail: PropTypes.object
};

const mapStateToProps = state => ({
  isFetching: state.projectDetail.isFetching,
  projectDetail: state.projectDetail
});

const mapDispatchToProps = dispatch => ({
  fetchProjectDetail: projectId => dispatch(fetchProjectDetailRequest(projectId))
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchProjectDetail, match: { params } } = this.props;
      fetchProjectDetail(params.id);
    }
  })
);

export default enhance(ProjectDetailPage);
