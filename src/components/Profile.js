import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PageHeader from './PageHeader';
import GeneralProfileBox from '../containers/GeneralProfileBox';
import WorkProfileBox from '../containers/WorkProfileBox';
import WorkExperienceProfileBox from '../containers/WorkExperienceProfileBox';
import EducationProfileBox from '../containers/EducationProfileBox';
import CertificateProfileBox from '../containers/CertificateProfileBox';
import ToeicProfileBox from '../containers/ToeicProfileBox';
import AssetProfileBox from '../containers/AssetProfileBox';
import EvaProfileBox from '../containers/EvaProfileBox';
import Can from '../containers/Can';

const Profile = ({ profile, id, profileId, can }) => (
  <div>
    <PageHeader icon="user" text="Profile" />
    <Grid centered>
      <Grid.Column computer={12} mobile={16}>
        <GeneralProfileBox generalProfile={profile.general} />
        <Can activity="evaViewOwn" conditions={[id === profileId || can.evaViewAll]}>
          <EvaProfileBox evaProfile={profile.eva} performanceProfile={profile.perf} selfProfile={profile.self} />
        </Can>
        <WorkProfileBox workProfile={profile.work} />
        <Can activity="workExperienceView">
          <WorkExperienceProfileBox workExperienceProfile={profile.workExperiences} />
        </Can>
        <Can activity="educateView">
          <EducationProfileBox educationsProfile={profile.educations} />
        </Can>
        <CertificateProfileBox certificatesProfile={profile.certificates} />
        <Can activity="toeicView">
          <ToeicProfileBox toeicsProfile={profile.toeics} />
        </Can>
        <AssetProfileBox assetsProfile={profile.assets} />
      </Grid.Column>
    </Grid>
  </div>
);

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  profileId: PropTypes.number.isRequired,
  can: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profileId: state.profile.userId,
  id: state.auth.id,
  can: state.accessControl.can
});

export default connect(mapStateToProps)(Profile);
