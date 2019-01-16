import moxios from 'moxios';
import dotenv from 'dotenv';
import sinon from 'sinon';
import Andelan from '../../lib/andelan';
import * as attachments from '../../lib/attachments';
import * as mockData from '../mocks/andelan.mocks';

dotenv.config();

let andelan = null;

describe('Andelan Class', () => {
  describe('Static methods', () => {
    describe('getUserWithEmail', () => {
      it('class Andelan should have static method "getUserWithEmail"', () => {
        expect(typeof Andelan.getUserWithEmail).toBe('function');
      });
      it('should make API request to fetch user data with email', async (done) => {
        await moxios.install();
        const axiosResponse = { values: ['This is the user data'] };
        moxios.stubRequest(`${process.env.API_BASE_URL}/api/v1/users?email=test@gmail.com`, {
          status: 200,
          response: axiosResponse,
        });
        const result = await Andelan.getUserWithEmail('test@gmail.com');
        moxios.wait(() => {
          expect(result).toEqual(axiosResponse.values[0]);
          moxios.uninstall();
          done();
        });
      });
    });
    describe('getSkillsWithId', () => {
      it('class Andelan should have static method "getSkillsWithId"', () => {
        expect(typeof Andelan.getSkillsWithId).toBe('function');
      });
      it('should make API request to fetch user skill with userId', async (done) => {
        await moxios.install();
        const axiosResponse = { skills: ['This is the user skills'] };
        const userId = '-UTG55677';
        moxios.stubRequest(`${process.env.API_BASE_URL}/api/v1/skills/tech/developerskills/${userId}`, {
          status: 200,
          response: axiosResponse,
        });
        const result = await Andelan.getSkillsWithId(userId);
        moxios.wait(() => {
          expect(result).toEqual(axiosResponse.skills);
          moxios.uninstall();
          done();
        });
      });
    });
  });
  describe('Class methods', () => {
    andelan = new Andelan(mockData.userData, mockData.userSkills);
    it('should instantiate without error', () => {
      expect(typeof andelan).toBe('object');
    });
    it('should return Andelan profile', () => {
      const profileTemplate = sinon.stub(attachments, 'profileTemplate');
      void andelan.profile; // eslint-disable-line no-void
      expect(profileTemplate.calledOnceWith(mockData.profileData)).toBeTruthy();
    });
    it('should return Andelan bio', () => {
      const bioTemplate = sinon.stub(attachments, 'bioTemplate');
      void andelan.bio; // eslint-disable-line no-void
      expect(bioTemplate.calledOnceWith(mockData.bioData)).toBeTruthy();
    });
    it('should return Andelan placement', () => {
      const placementTemplate = sinon.stub(attachments, 'placementTemplate');
      void andelan.placement; // eslint-disable-line no-void
      expect(placementTemplate.calledOnceWith(mockData.placementData)).toBeTruthy();
    });
    it('should return Andelan skills', () => {
      const skillsTemplate = sinon.stub(attachments, 'skillsTemplate');
      void andelan.skills; // eslint-disable-line no-void
      expect(skillsTemplate.calledOnceWith(mockData.skillsData)).toBeTruthy();
    });
  });
});
