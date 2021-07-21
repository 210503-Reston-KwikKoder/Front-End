// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import authSettings from '../../auth_config.json' ;

export const environment = {
  production: false,
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

