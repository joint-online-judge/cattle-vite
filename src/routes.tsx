import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Login = lazy(async () => import('pages/Login'))
const OAuthRegister = lazy(async () => import('pages/OAuthRegister'))
const Logout = lazy(async () => import('pages/Logout'))

const MainLayout = lazy(async () => import('layouts/index'))
const DomainLayout = lazy(async () => import('layouts/DomainLayout'))

const DomainList = lazy(async () => import('pages/DomainList'))
const UserSettings = lazy(async () => import('pages/UserSettings'))
const UserSettingsGeneral = lazy(
	async () => import('pages/UserSettings/General')
)
const UserSettingsAccount = lazy(
	async () => import('pages/UserSettings/Account')
)
const DomainHome = lazy(async () => import('pages/DomainHome'))
const CreateProblemSet = lazy(async () => import('pages/CreateProblemSet'))
const CreateProblem = lazy(async () => import('pages/CreateProblem'))
const JoinDomain = lazy(async () => import('pages/JoinDomain'))
const DomainSettings = lazy(async () => import('pages/DomainSettings'))
const DomainSettingsProfile = lazy(
	async () => import('pages/DomainSettings/Profile')
)
const DomainSettingsMember = lazy(
	async () => import('pages/DomainSettings/Member')
)
const DomainSettingsInvitation = lazy(
	async () => import('pages/DomainSettings/Invitation')
)
const DomainSettingsPermissionConfig = lazy(
	async () => import('pages/DomainSettings/Permission/Config')
)
const DomainSettingsPermissionRole = lazy(
	async () => import('pages/DomainSettings/Permission/Role')
)
const ProblemSetList = lazy(async () => import('pages/ProblemSetList'))
const ProblemSetDetail = lazy(async () => import('pages/ProblemSetDetail'))

const NotFound = lazy(async () => import('pages/NotFound'))

const children: RouteObject[] = [
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/oauth-register',
		element: <OAuthRegister />
	},
	{
		path: '/logout',
		element: <Logout />
	},
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ index: true, element: <DomainList /> },

			{
				path: 'settings',
				element: <UserSettings />,
				children: [
					{
						index: true,
						element: <Navigate to='general' replace />
					},
					{
						path: 'general',
						element: <UserSettingsGeneral />
					},
					{
						path: 'account',
						element: <UserSettingsAccount />
					},
					{
						path: 'domains',
						element: <UserSettingsGeneral />
					}
				]
			},

			{
				path: 'domain',
				children: [
					{
						index: true,
						element: <DomainList />
					},
					{
						path: ':domainUrl',
						element: <DomainLayout />,
						children: [
							{
								index: true,
								element: <DomainHome />
							},
							{
								path: 'create-problem-set',
								element: <CreateProblemSet />
							},
							{
								path: 'create-problem',
								element: <CreateProblem />
							},
							{
								path: 'join',
								element: <JoinDomain />
							},
							{
								path: 'settings',
								element: <DomainSettings />,
								children: [
									{
										index: true,
										element: <Navigate to='profile' replace />
									},
									{
										path: 'profile',
										element: <DomainSettingsProfile />
									},
									{
										path: 'invitation',
										element: <DomainSettingsInvitation />
									},
									{
										path: 'member',
										element: <DomainSettingsMember />
									},
									{
										path: 'permission',
										children: [
											{
												index: true,
												element: <Navigate to='config' replace />
											},
											{
												path: 'config',
												element: <DomainSettingsPermissionConfig />
											},
											{
												path: 'role',
												element: <DomainSettingsPermissionRole />
											}
										]
									}
								]
							},
							{
								path: 'problem-set',
								children: [
									{
										index: true,
										element: <ProblemSetList />
									},
									{
										path: ':problemSetId',
										element: <ProblemSetDetail />,
										children: [
											{
												index: true,
												element: <Navigate to='detail' replace />
											},
											{
												path: 'scoreboard',
												element: '@/pages/ProblemSetDetail/Scoreboard'
											},
											{
												path: 'system-test',
												element: '@/pages/ProblemSetDetail/SystemTest'
											},
											{
												path: 'settings',
												element: '@/pages/ProblemSetDetail/Settings'
											},
											{
												path: 'edit',
												element: '@/pages/ProblemSetDetail/EditDetail'
											},
											{
												path: 'detail',
												element: '@/pages/ProblemSetDetail/ViewDetail'
											}
										]
									}
								]
							},
							{
								path: 'problem',
								children: [
									{
										index: true,
										element: '@/pages/ProblemList'
									},
									{
										path: ':problemId',
										children: [
											{
												index: true,
												element: <Navigate to='detail' replace />
											},
											{
												path: 'detail',
												element: '@/pages/ProblemDetail/Detail'
											},
											{
												path: 'submit',
												element: '@/pages/ProblemDetail/Submit'
											},
											{
												path: 'edit',
												element: '@/pages/ProblemDetail/Edit'
											},
											{
												path: 'settings',
												element: '@/pages/ProblemDetail/Settings'
											}
										]
									}
								]
							}
						]
					}
					// 		{
					// 			path: '/domain/:domainUrl/problem-set/:problemSetId/p/:problemId',
					// 			element: '@/pages/ProblemDetail'
					// 		},
				]
			},
			{
				path: 'user/:username',
				element: '@/pages/Profile'
			},
			{
				path: 'admin',
				element: '@/pages/SiteAdmin',
				children: [
					{
						index: true,
						element: <Navigate to='/admin/domain' />
					},
					{
						path: 'domain',
						element: '@/pages/SiteAdmin/CreateDomain'
					}
				]
			},
			{
				path: 'records',
				element: '@/pages/RecordList'
			}
		]
	},
	{ path: '*', element: <NotFound /> }
]

export default children
