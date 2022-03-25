import { UpsertProblemSetForm } from 'components/ProblemSet'
import ShadowCard from 'components/ShadowCard'
import type React from 'react'
import { useModel, useParams } from 'umi'

const ProblemSetEditDetail: React.FC = () => {
	const { problemSet, refresh, loading } = useModel('problemSet')
	const { domainUrl } = useParams<{ domainUrl: string }>()

	return (
		<ShadowCard loading={loading}>
			<UpsertProblemSetForm
				domainUrl={domainUrl}
				initialValues={problemSet}
				onUpdateSuccess={refresh}
			/>
		</ShadowCard>
	)
}

export default ProblemSetEditDetail