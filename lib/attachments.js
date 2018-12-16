import slackifyHtml from 'slackify-html';

const removeEmptyFields = fields => fields.filter((field) => field.value.trim() && field.value.toLowerCase() !== 'n/a');

const capitalize = word => `${word[0].toUpperCase()}${word.substr(1)}`;

export const profileTemplate = (profile) => {
  const { 
    cohort, email, github, location, 
    level, roles, phoneNumber, name
  } = profile;
  return ({
    fallback: `${name} Profile from AIS`,
    pretext: "Profile",
    color: "#3359df",
    fields: removeEmptyFields([
      {
        title: "Cohort",
        value: `${cohort.name}`,
        short: true
      },
      {
        title: "Email",
        value: `${email}`,
        short: true
      },
      {
        title: "Github Handle",
        value: github && `https://github.com/${github}`,
        short: true,
      },
      {
        title: "Location",
        value: `${location.name}`,
        short: true,
      },
      {
        title: "D-Level",
        value: `${level.name}`,
        short: true,
      },
      {
        title: "Phone Number",
        value: `${phoneNumber}`,
        short: true,
      },
      {
        title: "Role",
        value: `${roles.map(role => capitalize(role.name)).join(', ')}`,
        short: roles.length > 3 ? false : true,
      }
    ]),
  });
};

export const bioTemplate = ({ bio, name }) => ({
  "fallback": `${name} Bio from AIS`,
  "color": "#3359df",
  "pretext": "Bio",
  "text": `${slackifyHtml(bio) || 'n/a'}`
});

export const placementTemplate = ({ name, status, partner, startDate }) => ({
  fallback: `${name} placement details from AIS`,
  color: "#3359df",
  pretext: "Current Placement",
  fields: removeEmptyFields([
    {
      title: "Partner",
      value: `${partner.trim() || 'Andela'}`,
      short: true
    },
    {
      title: "Start Date",
      value: `${new Date(startDate).toDateString()}`,
      short: true
    },
    {
      title: "Status",
      value: `${status}`,
      short: false
    }
  ]),
});

export const skillsTemplate = (skills) => {
  const {
    apprenticeshipStack, name, pluralsight, 
    partnerExperience, partnerStaffing, 
    staffAssessed, selfAssessed, simulationStack
  } = skills;  
  const pluralsightSkillsByLevel = { expert: [], proficient: [], novice: []}
  pluralsight.forEach(skill => pluralsightSkillsByLevel[skill.proficiency.toLowerCase()].push(capitalize(skill.name)));
  return ({
    fallback: `${name} skills from AIS`,
    color: "#3359df",
    pretext: "Skills",
    fields: removeEmptyFields([
      {
        title: "Apprenticeship Stack",
        value: `${apprenticeshipStack.map(skill => capitalize(skill.name)).join(', ')}`,
        short: false
      },
      {
        title: "Simulation Stack",
        value: `${simulationStack.map(skill => capitalize(skill.name)).join(', ')}`,
        short: false
      },
      {
        title: "Staff Assessed",
        value: `${staffAssessed.map(skill => capitalize(skill.name)).join(', ')}`,
        short: false
      },
      {
        title: "Self Assessed",
        value: `${selfAssessed.map(skill => capitalize(skill.name)).join(', ')}`,
        short: false
      },
      {
        title: "Partner Experience",
        value: `${partnerExperience.map(skill => capitalize(skill.name)).join(', ')}`,
        short: false
      },
      {
        title: "Pluralsight Expert",
        value: `${pluralsightSkillsByLevel.expert.join(', ')}`,
        short: false
      },
      {
        title: "Pluralsight Profficient",
        value: `${pluralsightSkillsByLevel.proficient.join(', ')}`,
        short: false
      },
      {
        title: "Pluralsight Novice",
        value: `${pluralsightSkillsByLevel.novice.join(', ')}`,
        short: false
      }
    ]),
  });
};
