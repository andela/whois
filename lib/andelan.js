import axios from 'axios';
import * as attachments from './attachments';
import dotenv from 'dotenv';

dotenv.config();

const apiToken = process.env.API_TOKEN;
const apiBaseUrl = process.env.API_BASE_URL;

export default class Andelan {
  constructor(userData, userSkills) {
    this.userData = userData;
    this.userSkills = userSkills;
  }

  get profile() {
    const {
      cohort, email, github, location, level, roles, phone_number: phoneNumber, name
    } = this.userData;
    const profile = {
      cohort, email, github, location, level, roles, phoneNumber, name
    }
    return attachments.profileTemplate(profile);
  }

  get bio() {
    const { bio, name } = this.userData;
    return attachments.bioTemplate({ bio, name });
  }

  get placement() {
    const { name, placement: {
      status, client: partner, start_date: startDate
    } } = this.userData;
    return attachments.placementTemplate({ name, status, partner, startDate });
  }

  get skills() {
    const {
      apprenticeship_stack: apprenticeshipStack,
      pluralsight,
      partner_experience: partnerExperience,
      partner_staffing: partnerStaffing,
      staff_assessed: staffAssessed,
      self_assessed: selfAssessed,
      simulation_stack: simulationStack,
    } = this.userSkills;
    const { name } = this.userData;
    const skills = {
      name,
      apprenticeshipStack, pluralsight, partnerExperience,
      partnerStaffing, staffAssessed, selfAssessed, simulationStack
    };
    return attachments.skillsTemplate(skills);
  }

  static getUserWithEmail(email) {
    return axios
      .get(`${apiBaseUrl}/api/v1/users?email=${email}`, { headers: { Authorization: `Bearer ${apiToken}` } })
      .then(response => response.data.values[0]);
  }

  static getSkillsWithId(id) {
    return axios
      .get(`${apiBaseUrl}/api/v1/skills/tech/developerskills/${id}`, { headers: { Authorization: `Bearer ${apiToken}` } })
      .then(response => response.data.skills);
  }
};
