import {
	CheckOutlined,
	CodeOutlined,
	EditOutlined,
	ReadOutlined,
	SettingOutlined
} from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Descriptions, Menu, message } from 'antd'
import Gravatar from 'components/Gravatar'
import ShadowCard from 'components/ShadowCard'
import SideMenuPage from 'components/SideMenuPage'
import type React from 'react'
import { useEffect, useMemo } from 'react'
import type { IRouteComponentProps } from 'umi'
import { useIntl, useModel, useParams } from 'umi'
import Horse, { ErrorCode } from 'utils/service'
import ProblemContext from './context'

const Index: React.FC<IRouteComponentProps> = ({ route, children }) => {
	const intl = useIntl()
	const { domain } = useModel('domain')
	const { setHeader } = useModel('pageHeader')
	const { domainUrl, problemId } =
		useParams<{ domainUrl: string; problemId: string }>()

	const {
		data: problemResp,
		refresh,
		loading: fetchingProblem
	} = useRequest(
		async () => {
			const res = await Horse.problem.v1GetProblem(domainUrl, problemId)
			return res.data
		},
		{
			refreshDeps: [domainUrl, problemId],
			onSuccess: res => {
				if (res.errorCode !== ErrorCode.Success) {
					message.error('get problem fail')
				}
			},
			onError: () => {
				message.error('get problem fail')
			}
		}
	)

	const { data: owner } = useRequest(
		async () => {
			const res = await Horse.user.v1GetUser(problemResp?.data?.ownerId ?? '')
			return res.data.data
		},
		{
			ready: Boolean(problemResp?.data?.ownerId),
			onError: () => {
				message.error('get owner failed')
			}
		}
	)

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? 'unknown'
			},
			{
				path: 'problem',
				breadcrumbI18nKey: 'problem.problems'
			},
			{
				path: 'null'
			}
		],
		[domainUrl, domain]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			title: problemResp?.data?.title
		})
	}, [breads, setHeader, problemResp])

	return (
		<ProblemContext.Provider
			value={{
				problem: problemResp?.data,
				loading: fetchingProblem,
				refresh
			}}
		>
			<SideMenuPage
				defaultTab='detail'
				route={route}
				shadowCard={false}
				menu={
					<Menu mode='inline'>
						<Menu.Item key='detail' icon={<ReadOutlined />}>
							{intl.formatMessage({ id: 'PROBLEM.HOME' })}
						</Menu.Item>
						<Menu.Item key='submit' icon={<CodeOutlined />}>
							{intl.formatMessage({ id: 'PROBLEM.SUBMIT_CODE' })}
						</Menu.Item>
						<Menu.Divider />
						<Menu.Item key='edit' icon={<EditOutlined />}>
							{intl.formatMessage({ id: 'PROBLEM.EDIT' })}
						</Menu.Item>
						<Menu.Item key='settings' icon={<SettingOutlined />}>
							{intl.formatMessage({ id: 'PROBLEM.SETTINGS' })}
						</Menu.Item>
					</Menu>
				}
				extra={
					<ShadowCard>
						<Descriptions column={1}>
							<Descriptions.Item
								label={intl.formatMessage({ id: 'PROBLEM.STATUS' })}
							>
								{/* todo: make status component */}
								<CheckOutlined /> Accepted
							</Descriptions.Item>
							<Descriptions.Item
								label={intl.formatMessage({ id: 'PROBLEM.PROBLEM_GROUP' })}
							>
								不知道
							</Descriptions.Item>
							<Descriptions.Item
								label={intl.formatMessage({ id: 'PROBLEM.OWNER' })}
							>
								<Gravatar size={20} gravatar={owner?.gravatar} />
								{owner?.realName ?? owner?.username}
							</Descriptions.Item>
						</Descriptions>
					</ShadowCard>
				}
			>
				{children}
			</SideMenuPage>
		</ProblemContext.Provider>
	)
}

export default Index
