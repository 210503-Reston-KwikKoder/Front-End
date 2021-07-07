import authSettings from '../../auth_config.json' ;
export const environment = {
  production: true,
  auth: {
    domain: authSettings.domain,
    clientId: authSettings.clientId,   
    redirectUri: window.location.origin,
    audience: authSettings.audience
  },
  dev: {
    serverUrl: authSettings.serverUrl,
    forumApi: authSettings.forumApi
  }
  
};
