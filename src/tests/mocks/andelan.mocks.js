export const userData = {
  id: 'mock-id',
  name: 'mock-name',
  first_name: 'mock-first-name',
  last_name: 'mock-last-name',
  cohort: 'mock-cohort',
  email: 'mock-email',
  github: 'mock-github',
  location: 'mock-location',
  level: 'mock-level',
  roles: 'mock-roles',
  phone_number: 'mock-phone',
  placement: {
    status: 'mock-placement-status',
    client: 'mock-placement-partner',
    start_date: 'mock-placement-startDate',
  },
  bio: 'mock-bio',
};

export const userSkills = {
  apprenticeship_stack: 'mock-apprenticeshipStack',
  pluralsight: 'mock-pluralsight',
  partner_experience: 'mock-partnerExperience',
  partner_staffing: 'mock-partnerStaffing',
  staff_assessed: 'mock-staffAssessed',
  self_assessed: 'mock-selfAssessed',
  simulation_stack: 'mock-simulationStack',
};

export const bioData = { bio: userData.bio, name: userData.name };

export const profileData = (() => {
  const {
    cohort, email, github, location, level, roles, phone_number: phoneNumber, name, id,
  } = userData;
  return {
    cohort, email, github, location, level, roles, phoneNumber, name, id,
  };
})();

export const placementData = (() => {
  const {
    name,
    placement: {
      status, client: partner, start_date: startDate,
    },
  } = userData;
  return {
    name, status, partner, startDate,
  };
})();

export const skillsData = (() => {
  const {
    apprenticeship_stack: apprenticeshipStack,
    pluralsight,
    partner_experience: partnerExperience,
    partner_staffing: partnerStaffing,
    staff_assessed: staffAssessed,
    self_assessed: selfAssessed,
    simulation_stack: simulationStack,
  } = userSkills;
  return {
    name: userData.name,
    apprenticeshipStack,
    pluralsight,
    partnerExperience,
    partnerStaffing,
    staffAssessed,
    selfAssessed,
    simulationStack,
  };
})();
