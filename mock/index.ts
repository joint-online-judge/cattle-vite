import { MockMethod } from 'vite-plugin-mock'
import {
	AuthTokensResp,
	DomainDetailResp,
	DomainListResp,
	DomainUserPermissionResp,
	ErrorCode,
	ProblemSetListResp
} from '../src/client'

export default [
	{
		url: '/api/v1/auth/token',
		method: 'get',
		response: (): AuthTokensResp => {
			return {
				errorCode: ErrorCode.Success,
				errorMsg: null,
				data: {
					accessToken:
						'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MGZjOThkOS02OWU3LTRhMWEtYTA2OC0zZmIzZjZjYjQwMzAiLCJpYXQiOjE2NDgyMTMxODUsIm5iZiI6MTY0ODIxMzE4NSwianRpIjoiM2M4NTU4ZDMtOGRkNy00ZGNiLWExMWQtMmI1NjU2NzMzZDE1IiwiZXhwIjoxNjQ5NDIyNzg1LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOnRydWUsImNhdGVnb3J5IjoidXNlciIsInVzZXJuYW1lIjoibmljaHVqaWUiLCJlbWFpbCI6Im5jajE5OTkxMjEzQDEyNi5jb20iLCJncmF2YXRhciI6IiIsInN0dWRlbnRJZCI6IiIsInJlYWxOYW1lIjoiIiwicm9sZSI6InJvb3QiLCJvYXV0aE5hbWUiOiJnaXRodWIiLCJpc0FjdGl2ZSI6dHJ1ZX0.ZVOl9REgbzt7K_UGiS8lrQzZTVWVqZRoasnWmqiMz7U',
					refreshToken:
						'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0MGZjOThkOS02OWU3LTRhMWEtYTA2OC0zZmIzZjZjYjQwMzAiLCJpYXQiOjE2NDgyMTMxODUsIm5iZiI6MTY0ODIxMzE4NSwianRpIjoiMjU1ODhmNzktNmIxNy00ZWU2LWIyZDYtNjBmMDM2ZjZhNTRkIiwiZXhwIjoxNjUwODA1MTg1LCJ0eXBlIjoicmVmcmVzaCIsIm9hdXRoTmFtZSI6ImdpdGh1YiJ9.gCSHTlPNO2z62AsMXd3Ob_hnqzeESj3fdulX4nDppu8',
					tokenType: 'bearer'
				}
			}
		}
	},
	{
		url: '/api/v1/domains',
		method: 'get',
		response: (): DomainListResp => {
			return {
				errorCode: ErrorCode.Success,
				errorMsg: '',
				data: {
					count: 1,
					results: [
						{
							id: '1',
							url: 'test',
							name: 'Test Domain'
						}
					]
				}
			}
		}
	},
	{
		url: '/api/v1/domains/:domainUrl',
		method: 'get',
		response: ({ query }): DomainDetailResp => {
			return {
				errorCode: ErrorCode.Success,
				errorMsg: '',
				data: {
					id: '1',
					url: query.domainUrl,
					name: `${query.domainUrl} Domain`
				}
			}
		}
	},
	{
		url: '/api/v1/domains/:domainUrl/users/:userId/permission',
		method: 'get',
		response: (): DomainUserPermissionResp => {
			return {
				errorCode: ErrorCode.Success,
				errorMsg: '',
				data: {
					domainId: '1',
					userId: '1',
					role: 'root',
					permission: {
						general: {
							view: true,
							editPermission: true,
							viewModBadge: true,
							edit: true,
							unlimitedQuota: true
						},
						problem: {
							create: true,
							view: true,
							viewHidden: true,
							submit: true,
							edit: true,
							viewConfig: true
						},
						problemSet: {
							create: true,
							view: true,
							viewHidden: true,
							claim: true,
							scoreboard: true,
							manage: true,
							edit: true,
							viewConfig: true
						},
						record: {
							view: true,
							detail: true,
							code: true,
							judge: true,
							rejudge: true
						}
					}
				}
			}
		}
	},
	{
		url: '/api/v1/domains/:domainUrl/problem_sets',
		method: 'get',
		response: ({ query }): ProblemSetListResp => {
			return {
				errorCode: ErrorCode.Success,
				errorMsg: '',
				data: {
					count: 1,
					results: [
						{
							id: 'e45e222b-4320-4b91-a8b9-db6db697d197',
							domainId: 'b7de6f41-cad7-4d82-94b2-7ce069a973ce',
							url: 'e45e222b-4320-4b91-a8b9-db6db697d197',
							title: 'latest',
							content: '',
							hidden: true,
							scoreboardHidden: true,
							dueAt: '2022-02-28T14:32:46.617000+00:00',
							lockAt: '2022-02-28T14:32:50.350000+00:00',
							unlockAt: '2022-02-08T14:32:43.359000+00:00',
							numSubmit: 0,
							numAccept: 0,
							ownerId: '40fc98d9-69e7-4a1a-a068-3fb3f6cb4030'
						}
					]
				}
			}
		}
	}
	// {
	// 	url: '/api/post',
	// 	method: 'post',
	// 	timeout: 2000,
	// 	response: {
	// 		code: 0,
	// 		data: {
	// 			name: 'vben'
	// 		}
	// 	}
	// },
	// {
	// 	url: '/api/text',
	// 	method: 'post',
	// 	rawResponse: async (req, res) => {
	// 		let reqbody = ''
	// 		await new Promise(resolve => {
	// 			req.on('data', chunk => {
	// 				reqbody += chunk
	// 			})
	// 			req.on('end', () => resolve(undefined))
	// 		})
	// 		res.setHeader('Content-Type', 'text/plain')
	// 		res.statusCode = 200
	// 		res.end(`hello, ${reqbody}`)
	// 	}
	// }
] as MockMethod[]
