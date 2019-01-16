import * as attachments from '../../lib/attachments';
import * as mockData from '../mocks/attachments.mocks';

describe('Attachment Functions', () => {
  it('should return profile attachment', () => {
    const template = attachments.profileTemplate(mockData.fakeProfileData);
    expect(template).toEqual(mockData.expectedProfileAttachment);
  });
  it('should return bio attachment', () => {
    const template = attachments.bioTemplate(mockData.fakeBioData);
    expect(template).toEqual(mockData.expectedBioAttachment);
  });
  it('should set default bio text as "n/a" in bio attachment when bio text is empty', () => {
    const fakeBioData = { ...mockData.fakeBioData };
    const expectedBioAttachment = { ...mockData.expectedBioAttachment };
    fakeBioData.bio = '';
    expectedBioAttachment.text = 'n/a';
    const template = attachments.bioTemplate(fakeBioData);
    expect(template).toEqual(expectedBioAttachment);
  });
  it('should return placement attachment', () => {
    const template = attachments.placementTemplate(mockData.fakePlacementData);
    expect(template).toEqual(mockData.expectedPlacementAttachment);
  });
  it('should set default partner as "Andela" in placement attachment when partner field is empty', () => {
    const fakePlacementData = { ...mockData.fakePlacementData };
    const expectedPlacementAttachment = { ...mockData.expectedPlacementAttachment };
    fakePlacementData.partner = '';
    expectedPlacementAttachment.fields[0].value = 'Andela';
    const template = attachments.placementTemplate(fakePlacementData);
    expect(template).toEqual(expectedPlacementAttachment);
  });
  it('should return skill attachment', () => {
    const template = attachments.skillsTemplate(mockData.fakeSkillData);
    expect(template).toEqual(mockData.expectedSkillAttachment);
  });
});
