export const getEducationProfile = (state, id) => (
  state.profile.educations.find(e => e.id === id)
);

export const getCertificateProfile = (state, id) => (
  state.profile.certificates.find(c => c.id === id)
);

export const getAssetProfile = (state, id) => (
  state.profile.asssets.find(a => a.id === id)
);
