import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import PageHeader from './PageHeader';
import GeneralProfileBox from '../containers/recruitmentProfileBox/GeneralProfile';
import ExamProfileBox from '../containers/recruitmentProfileBox/ExamProfile';
import SignProfileBox from '../containers/recruitmentProfileBox/SignProfile';


const RecruitmentProfile = ({ recruitmentProfile }) => (
  <div>
    <PageHeader icon="user" text="Applicant" />
    <Grid centered>
      <Grid.Column computer={12} mobile={16}>
        <GeneralProfileBox generalProfile={recruitmentProfile.profile} files={recruitmentProfile.file} />
        <ExamProfileBox examProfile={recruitmentProfile.profile} />
        <SignProfileBox signProfile={recruitmentProfile.profile} />
      </Grid.Column>
    </Grid>
  </div>
);

RecruitmentProfile.propTypes = {
  recruitmentProfile: PropTypes.object.isRequired
};

export default RecruitmentProfile;


// import React from 'react';
// import PropTypes from 'prop-types';
// import { Grid } from 'semantic-ui-react';
// import PageHeader from './PageHeader';
// import image from '../images/cat.jpg';
// import GeneralProfileBox from '../containers/GeneralProfileBox';
// import WorkProfileBox from '../containers/WorkProfileBox';
// import EducationProfileBox from '../containers/EducationProfileBox';
// import CertificateProfilxBox from '../containers/CertificateProfileBox';
// import AssetProfileBox from '../containers/AssetProfileBox';

// const Profile = ({ profile }) => (
//   <div>
//     <PageHeader icon="user" text="Profile" />
//     <Grid centered>
//       <Grid.Column computer={12} mobile={16}>
//         <GeneralProfileBox image={image} generalProfile={profile.general} />
//         <WorkProfileBox workProfile={profile.work} />
//         <EducationProfileBox educationsProfile={profile.educations} />
//         <CertificateProfilxBox certificatesProfile={profile.certificates} />
//         <AssetProfileBox assetsProfile={profile.assets} />
//       </Grid.Column>
//     </Grid>
//   </div>
// );

// Profile.propTypes = {
//   profile: PropTypes.object.isRequired
// };

// export default Profile;
