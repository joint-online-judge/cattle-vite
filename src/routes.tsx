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
const ProblemSetDetailView = lazy(
	async () => import('pages/ProblemSetDetail/ViewDetail')
)
const ProblemSetDetailScoreboard = lazy(
	async () => import('pages/ProblemSetDetail/Scoreboard')
)
const ProblemSetDetailSystemTest = lazy(
	async () => import('pages/ProblemSetDetail/SystemTest')
)
const ProblemSetDetailEditDetail = lazy(
	async () => import('pages/ProblemSetDetail/EditDetail')
)
const ProblemSetDetailSettings = lazy(
	async () => import('pages/ProblemSetDetail/Settings')
)

const ProblemList = lazy(async () => import('pages/ProblemList'))
const ProblemDetail = {
	Index: lazy(async () => import('pages/ProblemDetail')),
	Detail: lazy(async () => import('pages/ProblemDetail/Detail')),
	Submit: lazy(async () => import('pages/ProblemDetail/Submit')),
	Edit: lazy(async () => import('pages/ProblemDetail/Edit')),
	Settings: lazy(async () => import('pages/ProblemDetail/Settings'))
}

const Profile = lazy(async () => import('pages/Profile'))

const SiteAdmin = {
	Index: lazy(async () => import('pages/SiteAdmin')),
	CreateDomain: lazy(async () => import('pages/SiteAdmin/CreateDomain'))
}

const RecordList = lazy(async () => import('pages/RecordList'))

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
												element: <ProblemSetDetailScoreboard />
											},
											{
												path: 'system-test',
												element: <ProblemSetDetailSystemTest />
											},
											{
												path: 'settings',
												element: <ProblemSetDetailSettings />
											},
											{
												path: 'edit',
												element: <ProblemSetDetailEditDetail />
											},
											{
												path: 'detail',
												element: <ProblemSetDetailView />
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
										element: <ProblemList />
									},
									{
										path: ':problemId',
										element: <ProblemDetail.Index />,
										children: [
											{
												index: true,
												element: <Navigate to='detail' replace />
											},
											{
												path: 'detail',
												element: <ProblemDetail.Detail />
											},
											{
												path: 'submit',
												element: <ProblemDetail.Submit />
											},
											{
												path: 'edit',
												element: <ProblemDetail.Edit />
											},
											{
												path: 'settings',
												element: <ProblemDetail.Settings />
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
				element: <Profile />
			},
			{
				path: 'admin',
				element: <SiteAdmin.Index />,
				children: [
					{
						index: true,
						element: <Navigate to='/admin/domain' />
					},
					{
						path: 'domain',
						element: <SiteAdmin.CreateDomain />
					}
				]
			},
			{
				path: 'records',
				element: <RecordList />
			}
		]
	},
	{ path: '*', element: <NotFound /> }
]

export default children
