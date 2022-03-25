import { UpsertProblemForm } from 'components/Problem'
import SidePage from 'components/SidePage'
import { useDomain, usePageHeader } from 'models'
import type React from 'react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const Index: React.FC = () => {
	const { t } = useTranslation()
	const { domainUrl } = useParams<{ domainUrl: string }>()
	const { domain } = useDomain()
	const { setHeader } = usePageHeader()

	if (!domainUrl) {
		// Shall be unreachable under normal conditions
		throw new Error('No domainUrl found')
	}

	const breads = useMemo(
		() => [
			{
				path: `domain/${domainUrl}`,
				breadcrumbName: domain?.name ?? 'unknown'
			},
			{
				path: 'create-problem'
			}
		],
		[domainUrl, domain?.name]
	)

	useEffect(() => {
		setHeader({
			routes: breads,
			title: t('CreateProblem.title')
		})
	}, [breads, setHeader, t])

	return (
		<SidePage extra={<h1>Side</h1>}>
			<UpsertProblemForm
				domainUrl={domainUrl}
				initialValues={{ hidden: true }}
			/>
		</SidePage>
	)
}

export default Index
