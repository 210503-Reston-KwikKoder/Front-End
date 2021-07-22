import { environment as env } from './environment';

const ConstTokenOptions = {
  // The attached token should target this audience
  audience: env.auth.audience,
  // The attached token should have these scopes
  scope: 'read:current_user',
  //Authorization: `Bearer ${ this.userToken }`
}
export const HttpInterceptorConst = {
    allowedList:[
        {
          uri: `${env.dev.serverUrl}typetest/api/TypeTest*`,
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}typetest/api/UserStat/tests/all`,
          httpMethod: "GET",
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}typetest/api/User/username`,
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}competition/api/Competition`,
          httpMethod: "POST",
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.forumApi}comment/*`,
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.forumApi}comment`,
          httpMethod: "POST",
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.forumApi}ForumPost/*`,
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.forumApi}ForumPost`,
          httpMethod: "POST",
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}typetest/api/UserStat/*`,
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}typetest/api/UserStat`,
          httpMethod: "GET",
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}competition/api/CompetitonTests`,
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/*`,
          httpMethod: "PUT",
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCQ/*`,
          httpMethod: "DELETE",
          tokenOptions: ConstTokenOptions
        },
        {
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition`,
          httpMethod: "POST",
          tokenOptions: ConstTokenOptions
        }
        ,{
          uri: `${env.dev.serverUrl}competition/api/LiveCompetition/LCS/*`,
          httpMethod: "PUT",
          tokenOptions: ConstTokenOptions
        }
    ]
  }