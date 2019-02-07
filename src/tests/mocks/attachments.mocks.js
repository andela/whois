export const fakeProfileData = {
  cohort: { name: 'test-cohort' },
  email: 'test@gmail.com',
  github: 'test-github',
  location: { name: 'test-location' },
  level: { name: 'test-level' },
  roles: [{ name: 'role-A' }, { name: 'role-B' }, { name: 'role-C' }],
  phoneNumber: 'test-number',
  name: 'Test',
};

export const expectedProfileAttachment = {
  fallback: 'Test Profile from AIS',
  pretext: 'Profile',
  color: '#3359df',
  fields: [
    {
      title: 'Cohort',
      value: 'test-cohort',
      short: true,
    },
    {
      title: 'Email',
      value: 'test@gmail.com',
      short: true,
    },
    {
      title: 'Github Handle',
      value: 'https://github.com/test-github',
      short: true,
    },
    {
      title: 'Location',
      value: 'test-location',
      short: true,
    },
    {
      title: 'D-Level',
      value: 'test-level',
      short: true,
    },
    {
      title: 'Phone Number',
      value: 'test-number',
      short: true,
    },
    {
      title: 'Role',
      value: 'Role-A, Role-B, Role-C',
      short: true,
    },
  ],
};

export const fakeBioData = {
  bio: '<b>This is just a mock bio</b>',
  name: 'test-name',
};

export const expectedBioAttachment = {
  fallback: `${fakeBioData.name} Bio from AIS`,
  color: '#3359df',
  pretext: 'Bio',
  text: '*This is just a mock bio*',
  fields: [],
};

export const fakePlacementData = {
  name: 'test-name',
  status: 'test-status',
  partner: '   test-partner',
  startDate: '2019-01-07T19:33:41.199Z',
};

export const expectedPlacementAttachment = {
  fallback: `${fakePlacementData.name} placement details from AIS`,
  color: '#3359df',
  pretext: 'Current Placement',
  fields: [
    {
      title: 'Partner',
      value: fakePlacementData.partner.trim(),
      short: true,
    },
    {
      title: 'Start Date',
      value: `${new Date(fakePlacementData.startDate).toDateString()}`,
      short: true,
    },
    {
      title: 'Status',
      value: fakePlacementData.status,
      short: false,
    },
  ],
};

export const fakeSkillData = {
  name: 'test-name',
  apprenticeshipStack: [
    {
      name: 'javascript',
      proficiency: 'proficient',
    },
  ],
  pluralsight: [
    {
      name: 'Javascript',
      proficiency: 'Expert',
    },
    {
      name: 'ReactJS',
      proficiency: 'proficient',
    },
    {
      name: 'node-js',
      proficiency: 'Novice',
    },
  ],
  partnerExperience: [
    {
      name: 'javascript',
      proficiency: 'proficient',
    },
  ],
  staffAssessed: [
    {
      name: 'javascript',
      proficiency: 'proficient',
    },
    {
      name: 'ReactJS',
      proficiency: 'proficient',
    },
  ],
  selfAssessed: [
    {
      name: 'javascript',
      proficiency: 'proficient',
    },
  ],
  simulationStack: [
    {
      name: 'javascript',
      proficiency: 'proficient',
    },
  ],
};

export const expectedSkillAttachment = {
  fallback: `${fakeSkillData.name} skills from AIS`,
  color: '#3359df',
  pretext: 'Skills',
  fields: [
    {
      title: 'Apprenticeship Stack',
      value: 'Javascript',
      short: false,
    },
    {
      title: 'Simulation Stack',
      value: 'Javascript',
      short: false,
    },
    {
      title: 'Staff Assessed',
      value: 'Javascript, ReactJS',
      short: false,
    },
    {
      title: 'Self Assessed',
      value: 'Javascript',
      short: false,
    },
    {
      title: 'Partner Experience',
      value: 'Javascript',
      short: false,
    },
    {
      title: 'Pluralsight Expert',
      value: 'Javascript',
      short: false,
    },
    {
      title: 'Pluralsight Profficient',
      value: 'ReactJS',
      short: false,
    },
    {
      title: 'Pluralsight Novice',
      value: 'Node-js',
      short: false,
    },
  ],
};
