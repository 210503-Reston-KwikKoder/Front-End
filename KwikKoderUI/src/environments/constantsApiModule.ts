import { environment as env } from './environment';
export const HttpInterceptorConst = {
    allowedList:[
      //`${env.dev.serverUrl}api/test/CodeSnippet/Secret`,
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}typetest/api/TypeTest*`,
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}typetest/api/UserStat/tests/all`,
          httpMethod: "GET",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}typetest/api/User/username`,
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // this works currentlly 7/2/21
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}competition/api/Competition`,
          httpMethod: "POST",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.forumApi}comment/*`,
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.forumApi}comment`,
          httpMethod: "POST",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.forumApi}ForumPost/*`,
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.forumApi}ForumPost`,
          httpMethod: "POST",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}typetest/api/UserStat/*`,
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}typetest/api/UserStat`,
          httpMethod: "GET",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}competition/api/CompetitonTests`,
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/*`,
          httpMethod: "PUT",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/*`,
          httpMethod: "DELETE",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        },
        {
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition`,
          httpMethod: "POST",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        }
        ,{
          // Match any request that starts 'https://kwikkoder.us.auth0.com/api/v2/' (note the asterisk)
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCS/*`,
          httpMethod: "PUT",
          tokenOptions: {
            // The attached token should target this audience
            audience: env.auth.audience,
            // The attached token should have these scopes
            scope: 'read:current_user',
            //Authorization: `Bearer ${ this.userToken }`
          }
        }
    ]
  }