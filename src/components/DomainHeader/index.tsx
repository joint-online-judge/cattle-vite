import {
	BarsOutlined,
	FormOutlined,
	HomeOutlined,
	SettingOutlined
} from '@ant-design/icons'
import { Col, Menu, Row, Skeleton } from 'antd'
import Gravatar from 'components/Gravatar'
import ShadowCard from 'components/ShadowCard'
import { MAIN_CONTENT_GRID } from 'constant'
import { useAccess, useDomain } from 'models'
import type React from 'react'
import type { ReactElement } from 'react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath } from 'react-router'
import type { Location } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import style from './style.module.less'

const matchMenuKey = (location: Location): string => {
	if (matchPath(location.pathname, { path: '/domain/:domainUrl/settings' })) {
		return 'domain_manage'
	}

	if (matchPath(location.pathname, { path: '/domain/:domainUrl/problem' })) {
		return 'problem_list'
	}

	if (matchPath(location.pathname, { path: '/domain' })) {
		return 'domain'
	}

	return 'home'
}

const Index: React.FC = () => {
	const location = useLocation()
	const [current, setCurrent] = useState(matchMenuKey(location))
	const { domain, loading, domainUrl } = useDomain()
	const { t } = useTranslation()
	const access = useAccess()

	const domainInfo: ReactElement | null = useMemo(() => {
		if (loading) {
			return <Skeleton paragraph={{ rows: 1 }} active />
		}

		if (domain) {
			return (
				<Row justify='start' className='mt-10 mb-6' align='middle'>
					<Col>
						<Gravatar gravatar={domain.gravatar} size={60} />
					</Col>
					<Col>
						<Link to={`/domain/${domain.url ?? ''}`}>
							<h1 className='ml-8 text-4xl font-medium text-black'>
								{domain.name}
							</h1>
						</Link>
					</Col>
				</Row>
			)
		}

		return null
	}, [domain, loading])

	const domainMenu: ReactElement | null = useMemo(() => {
		if (domainUrl === undefined) {
			return null
		}

		return (
			<Menu
				mode='horizontal'
				selectedKeys={[current]}
				onClick={(e): void => {
					setCurrent(e.key)
				}}
			>
				<>
					<Menu.Item key='domain' icon={<HomeOutlined />}>
						<Link to={`/domain/${domainUrl}`}>
							{t('DomainHeader.menu.overview')}
						</Link>
					</Menu.Item>
					<Menu.Item key='problem_set' icon={<FormOutlined />}>
						<Link to={`/domain/${domainUrl}`}>
							{t('DomainHeader.menu.problemSet')}
						</Link>
					</Menu.Item>
					<Menu.Item key='problem_list' icon={<BarsOutlined />}>
						<Link to={`/domain/${domainUrl}/problem`}>
							{t('DomainHeader.menu.problem')}
						</Link>
					</Menu.Item>
					{
						// Note: do not use <Access> of umi -- antd menu cannot regonize wrapped component.
						access.isRoot ? (
							<Menu.Item key='domain_manage' icon={<SettingOutlined />}>
								<Link to={`/domain/${domainUrl}/settings/profile`}>
									{t('DomainHeader.menu.domainManage')}
								</Link>
							</Menu.Item>
						) : undefined
					}
				</>
			</Menu>
		)
	}, [domainUrl, current, access.isRoot, t])

	return (
		<ShadowCard bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}>
			<Row
				align='bottom'
				justify='center'
				className={style.domainHeaderContainer}
			>
				<Col {...MAIN_CONTENT_GRID}>
					{domainInfo}
					{domainMenu}
				</Col>
			</Row>
		</ShadowCard>
	)
}

export default Index
