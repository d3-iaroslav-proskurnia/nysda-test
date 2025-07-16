export const testConfig = {
  local: {
    appUrl: process.env.LOCAL_URL || '',
    identityApiUrl: process.env.LOCAL_IDENTITY_API_URL || '',
    cmsApiUrl: process.env.LOCAL_CMS_API_URL || '',
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD || '',
  },
  dev: {
    appUrl: process.env.DEV_URL || '',
    identityApiUrl: process.env.DEV_IDENTITY_API_URL || '',
    cmsApiUrl: process.env.DEV_CMS_API_URL || '',
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD || '',
  },
  qa: {
    appUrl: process.env.QA_URL || '',
    identityApiUrl: process.env.QA_IDENTITY_API_URL || '',
    cmsApiUrl: process.env.QA_CMS_API_URL || '',
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD || '',
  },
  stg: {
    appUrl: process.env.STG_URL || '',
    identityApiUrl: process.env.STG_IDENTITY_API_URL || '',
    cmsApiUrl: process.env.STG_CMS_API_URL || '',
    username: process.env.TEST_USERNAME || '',
    password: process.env.TEST_PASSWORD || '',
  },
};
